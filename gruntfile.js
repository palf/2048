module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    grunt.loadTasks('tasks');
    grunt.registerTask('default', [
        'lint', 'test'
    ]);
};
