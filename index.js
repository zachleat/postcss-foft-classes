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
            if (
              isFamilyMatch(decl.value, group.family) ||
              isFamilyMatch(decl.value, group.foftFamily)
            ) {
              rule.removeChild(decl);
              rule.append({
                prop: "font-family",
                value: removeFamily(decl.value, [group.family, group.foftFamily])
              });

              insertions.push({
                rule: rule,
                stage1: { prop: "font-family", value: group.family },
                stage2: { prop: "font-family", value: group.foftFamily + ", " + group.family },
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
