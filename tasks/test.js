module.exports = function (grunt) {
    'use strict';

    var config = {
        files: [
            'test/**/*_spec.js'
        ],
        options: {
            reporter: 'default'
        }
    };

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.renameTask('nodeunit', 'test');
    grunt.config('test', config);
};
