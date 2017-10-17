# postcss-foft-classes

A postcss plugin to automatically add classes for the FOFT font loading strategy. Based on [`netlify/postcss-fout-with-a-class`](https://github.com/netlify/postcss-fout-with-a-class).

## Sample

### Gulp Config

```
.pipe(
	postcss([
		foftLoadedClasses({
			groups: [
				{
					family: "Lato",
					foftFamily: "LatoFoft",
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
	font-family: Lato;
	src: …
}

/* Stage 2 */
@font-face {
	font-family: LatoFoft;
	src: …
	font-weight: 700;
}

@font-face {
	font-family: LatoFoft;
	src: …
	font-style: italic;
}

@font-face {
	font-family: LatoFoft;
	src: …
	font-weight: 700;
	font-style: italic;
}
```

### Input CSS

```
body {
  font-family: LatoFoft, Lato, sans-serif;
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

.fonts-loaded-2 body {
	font-family: LatoFoft, Lato;
}
```