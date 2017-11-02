const postcss = require("postcss");
const isFamilyMatch = require("./src/isFontFamilyMatch");
const removeFamily = require("./src/removeFontFamily");

module.exports = postcss.plugin("foft-classes", options => {
  return css => {
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
                insert.stages.push({
                  prop: "font-family",
                  value: family
                });
              });

              insertions.push(insert);
            }
          });
        }
      });
    });

    function getRule(rule, className) {
      return postcss.rule({
        selector: rule.selector
          .split(",")
          .map(
            part =>
              part.toLowerCase().trim() === "html" ? `html.${className}` : `.${className} ${part}`
          )
          .join(",")
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
  };
});
