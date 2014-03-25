module.exports = function (grunt) {
    'use strict';

    var config = {
        lint: require('./tasks/lint').config,
        spec: require('./tasks/spec').config,
        run: require('./tasks/run').config,
        watch: require('./tasks/watch').config
    };

    grunt.initConfig(config);

    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.renameTask('jshint', 'lint');
    grunt.renameTask('nodeunit', 'spec');
    grunt.renameTask('nodemon', 'run');

    grunt.registerTask('default', ['lint', 'spec']);
};
