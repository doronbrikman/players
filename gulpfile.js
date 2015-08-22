var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    ts = require('gulp-typescript');

gulp.task('typescript', function() {
    console.log('Compiling typescript');
    return gulp.src(['server/**/*.ts'])
        .pipe(ts({
            module: 'commonjs'
        })).js.pipe(gulp.dest('./deploy/server'))
});

gulp.task('start', ['typescript'], function() {
    nodemon({
        script: 'deploy/server/app.js',
        ext: 'js'
    });
});

gulp.task('watch', function() {
    gulp.watch('./server/**/*.ts', ['start']);
});

gulp.task('serve', ['typescript'], function() {
    livereload.listen();
    nodemon({
        script: 'deploy/server/app.js',
        ext: 'js',
    }).on('restart', function() {
        setTimeout(function() {
            livereload.changed();
        }, 500);
    });
});