const postcss = require("postcss");

const isFamilyMatch = require("./src/isFontFamilyMatch");
const removeFamily = require("./src/removeFontFamily");
const modifySelector = require("./src/modifySelector");

module.exports = (options = {}) =>{
  return {
    postcssPlugin:'foft-classes',
    Once (css) {
      options = options || {};
      options.groups = options.groups || [];

      let insertions = [];

      css.walkRules(rule => {
        rule.walkDecls(decl => {
          if (decl.prop === "font-family") {
            options.groups.forEach(group => {
              var families = group.families || [];
              if( !families.length ) {
                if( group.family ) {
                  families.push( group.family );
                }
                if( group.foftFamily ) {
                  families.push( group.foftFamily );
                }
              }

              if( families.reduce((sum, family) => {
                return isFamilyMatch(decl.value, family) ? 1 : 0
              }, 0) > 0 ) {
                rule.removeChild(decl);
                rule.append({
                  prop: "font-family",
                  value: removeFamily(decl.value, families)
                });

                let insert = {
                  rule: rule,
                  classNames: group.classNames,
                  stages: []
                };

                families.forEach(family => {
                  insert.stages.push( decl.clone({
                    prop: "font-family",
                    value: family
                  }) );
                });

                insertions.push(insert);
              }
            });
          }
        });
      });

      function getRule(rule, className) {
        return postcss.rule({
          selector: modifySelector( rule.selector, className ),
          source: rule.source
        });
      }

      insertions.forEach(({ rule, stages, classNames }) => {
        let lastRule = rule;
        stages.forEach((stage, j) => {
          let newRule = getRule(rule, classNames[j]);
          newRule.append(stage);

          lastRule.parent.insertAfter(lastRule, newRule);
          lastRule = newRule;
        });
      });
    }
  }
};
