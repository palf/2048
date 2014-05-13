# 2048

A clone of the 2048 game, running in node.

The plan is to run the game in a node process and test out various AI ideas. You could embed this in a web page if you wanted to, but why bother with the overhead of a browser?


## Grunt tasks

Every filename in the tasks folder is a target that can be executed.

    grunt lint    // lints all js files
    grunt test    // executes the tests using nodeunit
    grunt run     // run the application in nodemon (change any src to rerun)
    grunt watch   // repeatedly lint and test
