var gulp        = require('gulp');
var sass        = require('gulp-sass');
var catify      = require('gulp-concat');
var uglyfy      = require('gulp-uglify');
var mincss      = require('gulp-minify-css');
var react       = require('gulp-react');

gulp.task('sass', function() {
   gulp.src('./app/scss/main.scss')
    .pipe(catify('main.css'))
    .pipe(sass())
    .pipe(gulp.dest('./public/css/'))
    .on('error', handleError);
});

gulp.task('css', function() {
   gulp.src('./app/scss/vendor/*.css')
    .pipe(catify('vendor.css'))
    .pipe(mincss({keepSpecialComments: 0}))
    .pipe(gulp.dest('./public/css/'))
    .on('error', handleError);
});

gulp.task('jsx', function() {
  return gulp.src('./app/js/app.jsx')
    .pipe(react())
    .pipe(gulp.dest('./public/js/'))
    .on('error', handleError);
})

gulp.task('migrate', function() {
  // move html //
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./public/'))
    .on('error', handleError);

  // move fonts //
  gulp.src('./app/fonts/*')
    .pipe(gulp.dest('./public/fonts/'))
    .on('error', handleError);

  gulp.src('./app/package.json')
    .pipe(gulp.dest('./public/'))
    .on('error', handleError);
})

gulp.task('vendorjs', function() {
  gulp.src('./app/js/vendor/*.js')
    .pipe(uglyfy())
    .pipe(gulp.dest('./public/js/vendor/'))
    .on('error', handleError);
})

gulp.task('watch', function() {
   gulp.watch('./app/scss/*.scss', ['sass']);
   gulp.watch('./app/js/*.jsx', ['jsx']);
   gulp.watch('./app/js/**/*.jsx', ['jsx']);
   gulp.watch('./app/**/*', ['migrate']);
});

 
gulp.task('default', ['sass', 'jsx', 'vendorjs','css','migrate', 'watch']);

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}
