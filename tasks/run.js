'use strict';

exports.config = {
    app: {
        script: 'src/main.js'
    },
    options: {
        watch: '<%= lint.source.src %>',
        delay: 1000
    }
};
