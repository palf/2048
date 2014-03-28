var GameManager = require('./game_manager');
var Grid = require('./grid_two');
var AIs = require('./ais');
var Views = require('./views');


function startApplication () {
    var grid = new Grid(4);
    var player = AIs.random(grid);
    var view = Views.console();

    var manager = new GameManager(grid, player, view);
    manager.run();
    view.display(grid);
    return manager.won;
}


function benchmark (func) {
    var start = new Date().getTime();
    var result = func();
    var finish = new Date().getTime();
    var duration = (finish - start) / 1000;
    return { result: result, duration: duration };
}


var stats = benchmark(startApplication);
var result = stats.result ? 'won' : 'lost';
console.log(result + ' in ' + stats.duration + ' seconds!');
