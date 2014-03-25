module.exports = function (grunt) {
    'use strict';

    var config = {
        lint: require('./tasks/lint').config,
        spec: require('./tasks/spec').config,
        watch: require('./tasks/watch').config
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.renameTask('jshint', 'lint');
    grunt.renameTask('nodeunit', 'spec');

    grunt.registerTask('default', ['lint', 'spec']);
};
