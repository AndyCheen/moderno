const {src, dest, watch, parallel, series} = require('gulp');

const sass        = require('gulp-sass');
const browserSync = require('browser-sync').create();
const concat      = require('gulp-concat');



function browsersync() {
  browserSync.init({
      server: {
          baseDir: "./app/"
      },
      online: true,
      notify: false
  });
};

function style() {
  return src('./app/scss/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(dest('./app/css/'))
  .pipe(browserSync.stream());
}

function html() {
  return src('./app/*.html')
  .pipe(browserSync.stream());
}

function watching() {
  watch('./app/scss/**/*.scss', style);
  watch('./app/*.html', html);
}


exports.default = parallel(browsersync, style, watching);