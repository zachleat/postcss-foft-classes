# postcss-foft-classes

A postcss plugin to automatically add classes for various [font loading strategies](https://www.zachleat.com/web/comprehensive-webfonts/). Based heavily on [`netlify/postcss-fout-with-a-class`](https://github.com/netlify/postcss-fout-with-a-class).

Documentation currently only has Gulp config examples but is open to contributions with other build tool configurations! This works anywhere postcss does.

## Installation

`npm install postcss-foft-classes`

## Sample: FOUT, Single Stage

See the [full FOUT with a Class example code](https://github.com/zachleat/web-font-loading-recipes/blob/master/fout-with-class.html), with font faces and the JavaScript code that goes with it.


### Gulp Config

See this working in `./gulp-test/`.

```
.pipe(
  postcss([
    foftLoadedClasses({
      groups: [
        {
          families: ["Lato"],
          classNames: ["fonts-loaded"]
        }
      ]
    })
  ])
)
```

### Input CSS

```
body {
  font-family: Lato, sans-serif;
}
```

### Output CSS

```
body {
  font-family: sans-serif;
}

.fonts-loaded body {
  font-family: Lato;
}
```

## Sample: FOFT, Two Stages

See the [full FOFT example code](https://github.com/zachleat/web-font-loading-recipes/blob/master/foft.html), with font faces and the JavaScript code that goes with it.

### Gulp Config

See this working in `./gulp-test/`.

```
.pipe(
  postcss([
    foftLoadedClasses({
      groups: [
        {
          families: ["LatoInitial", "Lato"],
          classNames: ["fonts-loaded", "fonts-loaded-2"]
        }
      ]
    })
  ])
)
```

### Input CSS

```
body {
  font-family: Lato, sans-serif;
}
```

### Output CSS

```
body {
  font-family: sans-serif;
}

.fonts-loaded body {
  font-family: LatoInitial;
}

.fonts-loaded-2 body {
  font-family: Lato;
}
```
