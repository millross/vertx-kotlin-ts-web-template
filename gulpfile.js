var gulp = require('gulp'),
    replace = require('gulp-replace'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    karma = require('karma').server,
    tsc = require('gulp-typescript'),
    bower = require('main-bower-files');

var TYPESCRIPT_SOURCE = 'src/main/typescript/*.ts',
    WEBAPP_SOURCE_ROOT = 'src/main/resources/webapp',
    HTML_SOURCE = WEBAPP_SOURCE_ROOT + "/*.html",
    CSS_SOURCE = WEBAPP_SOURCE_ROOT + '/css/*.css',
    PARTIALS_SOURCE = WEBAPP_SOURCE_ROOT + '/partials/*.html',
    IMG_SOURCE = WEBAPP_SOURCE_ROOT + '/img/*.*',
    TARGET = 'build/generated-web-resources/webapp',
    JS_TARGET = TARGET + "/js",
    LIB_TARGET = TARGET + "/lib",
    DEVELOP_TARGET = 'webapp',
    DEVELOP_JS_TARGET = DEVELOP_TARGET + "/js",
    DEVELOP_LIB_TARGET = DEVELOP_TARGET + "/lib",
    DEVELOP_CSS_TARGET = DEVELOP_TARGET + '/css',
    DEVELOP_IMG_TARGET = DEVELOP_TARGET + "/img",
    DEVELOP_PARTIALS_TARGET = DEVELOP_TARGET + '/partials';

var postprocessLCOV = function() {
    return gulp.src('target/karma-reports/coverage/lcov.info')
        .pipe(replace('SF:.', 'SF:' + __dirname))
        .pipe(gulp.dest('target/karma-reports/coverage'));
};



gulp.task('default', ['test', 'build']);

gulp.task('test', function () {
    karma.start({
        configFile: __dirname + '/src/test/javascript/conf/karma.conf.ci.js'
    }, postprocessLCOV);
});



gulp.task('build', ['typescript', 'libs']);

gulp.task('develop', ['build', 'develop-js', 'develop-css', 'develop-lib', 'develop-partials', 'develop-html', 'develop-img'], function() {
    gulp.watch(TYPESCRIPT_SOURCE, ['develop-js']);
    gulp.watch(CSS_SOURCE, ['develop-css']);
    gulp.watch(PARTIALS_SOURCE, ['develop-partials']);
    gulp.watch(HTML_SOURCE, ['develop-html']);
    gulp.watch(IMG_SOURCE, ['develop-img']);
});

gulp.task('develop-js', function () {
    return gulp.src(TYPESCRIPT_SOURCE)
        // This will output the non-minified versions
        .pipe(tsc({
            out: "output.js"
        }))
        .pipe(gulp.dest(DEVELOP_JS_TARGET))
        // This will output minified and renamed versions
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(JS_TARGET));});

gulp.task('develop-css', function () {
    return gulp.src(CSS_SOURCE)
        // This will output the non-minified versions
        .pipe(gulp.dest(DEVELOP_CSS_TARGET));
});

gulp.task('develop-lib', function () {
    return gulp.src(bower())
        // This will output the non-minified versions
        .pipe(gulp.dest(DEVELOP_LIB_TARGET));
});

gulp.task('develop-partials', function () {
    return gulp.src(PARTIALS_SOURCE)
        // This will output the non-minified versions
        .pipe(gulp.dest(DEVELOP_PARTIALS_TARGET));
});

gulp.task('develop-img', function () {
    return gulp.src(IMG_SOURCE)
        .pipe(gulp.dest(DEVELOP_IMG_TARGET));
});

gulp.task('develop-html', function() {
    return gulp.src(HTML_SOURCE)
        .pipe(gulp.dest(DEVELOP_TARGET));
});

gulp.task('typescript', function() {
    return gulp.src(TYPESCRIPT_SOURCE)
        // This will output the non-minified versions
        .pipe(gulp.dest(JS_TARGET))
        // This will output the non-minified versions
        .pipe(tsc({
            out: "output.js"
        }))
        // This will output minified and renamed versions
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(JS_TARGET));
});

gulp.task('libs', function() {
    return gulp.src(bower())
        .pipe(gulp.dest(LIB_TARGET));
});