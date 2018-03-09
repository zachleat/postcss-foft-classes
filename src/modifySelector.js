function modifySelector(selector, className) {
  return selector.split(",")
    .map(part => {
      return className.split(" ").map(classSplit => {
        if( part.toLowerCase().trim() === "html" ) {
          return `${part}.${classSplit}`;
        }

        return `.${classSplit} ${part}`;
      })
      .join(",");
    })
    .join(",");
}

module.exports = modifySelector;
