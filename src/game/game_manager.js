var directions = require('./directions');

var winningValue = 2048;

function GameManager(grid, player, view) {
    var gameOver = false;
    var gameWon = false;

    function updateView () {
        view.display(grid);
    }

    function handleWinning () {
        gameWon = true;
        gameOver = true;
    }

    function handleLosing () {
        gameWon = false;
        gameOver = true;
    }

    function winCondition (grid) {
        return grid.contains(winningValue);
    }

    function loseCondition (grid) {
        return !grid.movesAvailable();
    }

    function handleMove (move) {
        if (move.successful) {
            grid.placeRandomTile();
            view.display(grid);

            if ( winCondition(grid) ) { handleWinning(); }
            else if ( loseCondition(grid) ) { handleLosing(); }
        }
    }

    this.run = function() {
        var turns = 0;
        while (!gameOver) {
            var direction = player.getMove(directions);
            var moveResult = grid.move(direction);
            turns += 1;
            console.log(direction, '-->', moveResult);
            handleMove(moveResult);
        }
        return { won: gameWon, turns: turns };
    };

    updateView();
}

module.exports = GameManager;
