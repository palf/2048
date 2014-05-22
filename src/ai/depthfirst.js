var collection = require('../utils/collection');
var gameManager = require('../game/game_manager');

function max (a, b) {
    if (a < b) { return b; }
    else { return a; }
}

function min (a, b) {
    if (b < a) { return b; }
    else { return a; }
}

function bestOf (aState, bState) {
    if (aState.value < bState.value) { return bState; }
    else { return aState; }
}


function movesAvailable (game) {
    return [ 'up', 'down', 'left', 'right' ];
}


function applyMove(game, move) {
    return game.move(move);
}


function highestValueIn (game) {
    var value = 0;
    collection.each(game.cells, function (cell) {
        value = max(value, cell.value);
    });

    return value;
}


function search (game, depth) {
    var bestMove = { move: 'none', value: -1 };

    movesAvailable().forEach(function (move) {
        var childGame = game.clone();
        var searchResult = depthfirst
        (childGame, depth, -1);
        console.log(move, searchResult)
        bestMove = bestOf(bestMove, { move: move, value: searchResult });
    });

    return bestMove;
}

function depthfirst
 (game, depth, alpha) {
    if (depth == 0) {
        return highestValueIn(game);
    }

    movesAvailable().forEach(function (move) {
        var childGame = game.clone();
        var childState = applyMove(childGame, move);
        if (childState.successful) {
            var searchResult = depthfirst
            (childGame, depth - 1, alpha);
            alpha = max(alpha, searchResult);
        } else {
            return 0;
        }
    });
    return alpha;
}



function AI (game) {
    this.getMove = function (directions) {
        var chosenMove = search(game, 5);
        return chosenMove.move;
    };
}

module.exports = AI;
