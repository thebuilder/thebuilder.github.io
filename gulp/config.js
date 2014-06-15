var path = require('path');

module.exports = {
    server: {
        root: path.resolve('./'),
        port: '8088',
        log: true,

        //Auto open browser on gulp run?
        openBrowser: true,
        browser: "google chrome"
    },

    //Paths
    src: 'src',
    templates: 'templates',
    dist: './',

    //Content dirs
    jsDir: 'js',
    lessDir: 'less',
    imgDir: 'images',

    //Entry files
    mainLess: 'app.less',
    mainJs: 'app.js',
    jadeFiles: 'views/pages/**/*.jade',

    //Runtime vars. These are used by tasks.
    isReleaseBuild: false
};