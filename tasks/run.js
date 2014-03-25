'use strict';

exports.config = {
    app: {
        script: 'start.js'
    },
    options: {
        watch: '<%= lint.source.src %>',
        delay: 1000
    }
};
