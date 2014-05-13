module.exports = function (grunt) {
    var config = {
        options: {
            node: true,
            curly: true,
            eqeqeq: true,
            immed: true,
            latedef: true,
            newcap: true,
            noarg: true,
            sub: true,
            undef: true,
            unused: true,
            boss: true,
            eqnull: true,
            globals: {
                jQuery: true
            }
        },
        source: {
            src: [
                'gruntfile.js',
                'src/**/*.js',
                'test/**/*.js',
                'tasks/**/*.js'
            ]
        }
    };

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.renameTask('jshint', 'lint');
    grunt.config('lint', config);
};
