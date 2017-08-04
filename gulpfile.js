var gulp = require('gulp'),
    less = require('gulp-less'),
    es = require('event-stream'),
	browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-minify-css'),
    path= require("path");
 
gulp.task('makeCss', function () {
    gulp.src('less/**/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('css'));
});

gulp.task("browserify", function() {
    /*return browserify({entries:'./js/index.js'})
        .bundle()
        .pipe(source("bundle.js"))
        .pipe(gulp.dest("build"));
        */
    //定义多个入口文件
    var entryFiles = [
        './js/index.js',
        './js/foot-clock.js'
    ];

    //遍历映射这些入口文件
    var tasks = entryFiles.map(function(entry){
        return browserify({entries: [entry]})
            .bundle()
            .pipe(source(path.basename(entry)))
            .pipe(gulp.dest('./build'));
    });

    //创建一个合并流
    return es.merge.apply(null, tasks);  
});

gulp.task("uglifyJs", function() {
    gulp.src('build/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'));
});

gulp.task("watch", function() {
    gulp.watch("less/**/*.less", ["makeCss"]);
    gulp.watch("js/**/*.js", ["browserify", "uglifyJs"]);
});