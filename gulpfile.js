var gulp = require('gulp');
var sass = require('gulp-sass');
var catify = require('gulp-concat');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('sass', function () {
    gulp.src('./app/scss/main.scss')
        .pipe(catify('main.css'))
        .pipe(sass())
        .pipe(gulp.dest('./public/css/'))
        .on('error', handleError);
});

gulp.task('css', function () {
    gulp.src('./app/scss/vendor/*.css')
        .pipe(catify('vendor.css'))
        .pipe(gulp.dest('./public/css/'))
        .on('error', handleError);
});

gulp.task('jsx', function () {
    gulp.src('./app/js/lib/*.js')
        .pipe(gulp.dest('./public/js/lib/'))
        .on('error', handleError);

    var b = browserify('./app/js/app.jsx');
        b.transform(reactify);
    return b.bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./public/js/'));


});

gulp.task('migrate', function () {
// move html //
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./public/'))
        .on('error', handleError);

// move fonts //
    gulp.src('./app/fonts/*')
        .pipe(gulp.dest('./public/fonts/'))
        .on('error', handleError);

// move images //
    gulp.src('./app/img/*')
        .pipe(gulp.dest('./public/img/'))
        .on('error', handleError);

    gulp.src('./app/package.json')
        .pipe(gulp.dest('./public/'))
        .on('error', handleError);
});

gulp.task('vendorjs', function () {
    gulp.src('./app/js/vendor/*.js')
        .pipe(gulp.dest('./public/js/vendor/'))
        .on('error', handleError);
});

gulp.task('watch', function () {
    gulp.watch('./app/scss/*.scss', ['sass']);
    gulp.watch('./app/js/**/*.jsx', ['jsx']);
    gulp.watch('./app/**/*', ['migrate']);
});


gulp.task('default', ['sass', 'jsx', 'vendorjs', 'css', 'migrate', 'watch']);

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
