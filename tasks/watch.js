module.exports = function (grunt) {
    'use strict';

    var config = {
        lint: {
            files: '<%= lint.source.src %>',
            tasks: [ 'lint' ]
        },
        test: {
            files: [ '<%= test.files %>', 'src/**/*.js' ],
            tasks: [ 'test' ]
        }
    };

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', config);
};
