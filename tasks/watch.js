'use strict';

exports.config = {
    lint: {
        files: '<%= lint.source.src %>',
        tasks: [ 'lint' ]
    },
    spec: {
        files: '<%= lint.source.src %>',
        tasks: [ 'spec' ]
    }
};
