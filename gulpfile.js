var gulp = require("gulp");

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var del = require('del');
var watch = require('gulp-watch');



gulp.task(
	'clean',
	function() {
		return del('./public');
	}
);

gulp.task(
	'html',
	['clean'],
	function() {
		return gulp
			.src([
				'./app/**/*.html',
				'./app/**/*.css'
			])
			.pipe(gulp.dest('./public/'))
	}
);

gulp.task(
	'javascript',
	['clean'],
	function () {
		return browserify('./app/app.js', {debug: true})
			.transform(babelify, {presets: ["react"]})
			.bundle()
			.pipe(source('app.compiled.js'))
			.pipe(gulp.dest('./public/'));
	}
);

gulp.task(
	'default',
	['clean', 'html', 'javascript']
);

gulp.task(
	'watch',
	function () {
		watch('app/**/*', function (events) {
        	gulp.start('default');
    	});
	}
);
