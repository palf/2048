'use strict';

exports.config = {
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
