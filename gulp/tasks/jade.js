var gulp         = require('gulp');
var jade         = require('gulp-jade');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var fs           = require('fs');
var config       = require('../config');

gulp.task('jade', function() {
    //Read the site data on run, so it fetches the latest
    var siteDate = JSON.parse(fs.readFileSync(config.src + '/views/data/sitedata.json', 'utf-8'));
    return gulp.src(config.src + '/' + config.jadeFiles)
        .pipe(plumber())
        //.pipe(changed(config.dist, { extension: '.html' })) // Ignore unchanged files
        .pipe(jade({pretty: true, locals:siteDate}))
        .pipe(gulp.dest(config.dist));
});
