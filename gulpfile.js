var gulp				= require('gulp');
var browserSync	= require('browser-sync').create();
var sass				= require('gulp-sass');
var htmlInjector = require('bs-html-injector');



// Static server + watching scss/html files
gulp.task('serve', function() {

	browserSync.use(htmlInjector, {
		files: "app/*.html"
	});

	browserSync.init({
		server: "./app"
	});

	gulp.watch("app/scss/*.scss", gulp.parallel('sass') );
	gulp.watch("app/*.js").on('change', browserSync.reload);
	gulp.watch("app/*.html", htmlInjector );
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("app/scss/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("app/css"))
		.pipe(browserSync.stream());
});

gulp.task('default', gulp.series('sass','serve'));

