var gulp         = require('gulp');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var config       = require('../config');
var sitedata       = require('../../src/data/sitedata.json');

gulp.task('jade', function() {
    return gulp.src(config.src + '/' + config.jadeFiles)
        .pipe(plumber())
        //.pipe(changed(config.dist, { extension: '.html' })) // Ignore unchanged files
        .pipe(jade({pretty: true, locals:sitedata}))
        .pipe(gulp.dest(config.dist));
});
