var GameManager = require('./game/game_manager');
var Grid = require('./game/grid');
var AIPlayer = require('./ai/random');
var Views = require('./views/console');


function startApplication () {
    var grid = new Grid(4);
    var player = new AIPlayer(grid);
    var view = Views.console();

    var manager = new GameManager(grid, player, view);
    return manager.run();
}


function benchmark (func) {
    var start = new Date().getTime();
    var result = func();
    var finish = new Date().getTime();
    var duration = (finish - start) / 1000;
    return { result: result, duration: duration };
}


var stats = benchmark(startApplication);
var result = stats.result.won ? 'won!' : 'lost...';
console.log('After ' + stats.result.turns + ' turns, you ' + result + ' (' + stats.duration + ' seconds)');
