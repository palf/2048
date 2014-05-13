module.exports = function (grunt) {
    'use strict';

    var config = {
        app: {
            script: 'src/main.js'
        },
        options: {
            watch: '<%= lint.source.src %>',
            delay: 1000
        }
    };

    grunt.loadNpmTasks('grunt-nodemon');
    grunt.renameTask('nodemon', 'run');
    grunt.config('run', config);
};
