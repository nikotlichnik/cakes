var gulp = require('gulp');
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');
var csscomb = require('gulp-csscombx');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var del = require('del');
var runSequence = require('run-sequence');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('sass', function () {
  return gulp.src('scss/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(csscomb())
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: '.'
    }
  })
});

gulp.task('image', function () {
  gulp.src('img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'))
});

gulp.task('fonts', function () {
  return gulp.src('fonts/**/*')
    .pipe(gulp.dest('build/fonts'))
});

gulp.task('useref', function () {
  return gulp.src('*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('build'))
});

gulp.task('clean', function () {
  del('build');
});

gulp.task('clean:build', function () {
  del(['build/**/*', '!build/img', '!build/img/**/*']);
});

gulp.task('watch', function () {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('build', function (cb) {
  runSequence('clean:build', 'sass', ['useref', 'image', 'fonts'], cb)
});

gulp.task('default', function (cb) {
  runSequence(['sass', 'browserSync'], 'watch', cb)
});
