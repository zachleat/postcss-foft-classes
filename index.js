const postcss = require("postcss");
const isFamilyMatch = require("./src/isFontFamilyMatch");
const removeFamily = require("./src/removeFontFamily");

module.exports = postcss.plugin("foft-classes", options => {
  return css => {
    options = options || {};
    options.groups = options.groups || [];

    const insertions = [];

    css.walkRules(rule => {
      rule.walkDecls(decl => {
        if (decl.prop === "font-family") {
          options.groups.forEach(group => {
            let stage1Family = group.families[0] || group.family;
            let stage2Family = group.families[1] || group.foftFamily;
            if (
              isFamilyMatch(decl.value, stage1Family) ||
              isFamilyMatch(decl.value, stage2Family)
            ) {
              rule.removeChild(decl);
              rule.append({
                prop: "font-family",
                value: removeFamily(decl.value, [stage1Family, stage2Family])
              });

              insertions.push({
                rule: rule,
                stage1: { prop: "font-family", value: stage1Family },
                stage2: { prop: "font-family", value: stage2Family },
                classNames: group.classNames
              });
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

    insertions.forEach(({ rule, stage1, stage2, classNames }) => {
      let newRuleStage1 = getRule(rule, classNames[0]);
      newRuleStage1.append(stage1);

      let newRuleStage2 = getRule(rule, classNames[1]);
      newRuleStage2.append(stage2);

      rule.parent.insertAfter(rule, newRuleStage2);
      rule.parent.insertAfter(rule, newRuleStage1);
    });
  };
});
