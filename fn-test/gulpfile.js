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
							family: "Lato",
							foftFamily: "LatoFoft",
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						},
						{
							family: "Mija",
							foftFamily: "MijaFoft",
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						},
						{
							family: "Elena",
							foftFamily: "ElenaFoft",
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						}
					]
				})
			])
		)
		.pipe(gulp.dest("build/"));
});
