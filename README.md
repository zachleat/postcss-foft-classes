# postcss-foft-classes

A postcss plugin to automatically add classes for the [FOFT font loading strategy](https://www.zachleat.com/web/comprehensive-webfonts/#foft). Based on [`netlify/postcss-fout-with-a-class`](https://github.com/netlify/postcss-fout-with-a-class).

## Sample

### Gulp Config

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

### Sample @font-face

```
/* Stage 1 */
@font-face {
  font-family: LatoInitial;
  src: …
}

/* Stage 2 */
@font-face {
  font-family: Lato;
  src: … /* Same source as Stage 1 LatoInitial */ 
}
@font-face {
  font-family: Lato;
  font-weight: 700;
  src: …
}

@font-face {
  font-family: Lato;
  font-style: italic;
  src: …
}

@font-face {
  font-family: Lato;
  font-weight: 700;
  font-style: italic;
  src: …
}
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