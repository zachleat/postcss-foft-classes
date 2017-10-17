var gulp = require("gulp");
var postcss = require("gulp-postcss");
var foftLoadedClasses = require("../index.js");

gulp.task("default", function() {
	return gulp
		.src("index.css")
		.pipe(
			postcss([
				foftLoadedClasses({
					groups: [
						{
							families: ["LatoInitial", "Lato"],
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						},
						{
							families: ["MijaInitial", "Mija"],
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						},
						{
							families: ["ElenaInitial", "Elena"],
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						}
					]
				})
			])
		)
		.pipe(gulp.dest("build/"));
});
