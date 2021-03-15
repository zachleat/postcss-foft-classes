var gulp = require("gulp");
var postcss = require("gulp-postcss");
var foftLoadedClasses = require("../index.js");

gulp.task("add-font-loading-classes", function() {
	return gulp
		.src("foft.css")
		.pipe(
			postcss([
				foftLoadedClasses({
					groups: [
						{
							families: ["LatoInitial", "Lato"],
							classNames: ["fonts-loaded", "fonts-loaded-2"]
						},
						{
							families: ["Mija"],
							classNames: ["fonts-loaded"]
						},
						{
							families: ["ElenaWhatIsHappening", "ElenaInitial", "Elena"],
							classNames: ["fonts-loaded", "fonts-loaded-2", "fonts-loaded-3"]
						}
					]
				})
			])
		)
		.pipe(gulp.dest("build/"));
});

gulp.task("default", gulp.series('add-font-loading-classes'), function() {

});
