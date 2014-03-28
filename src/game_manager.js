var directions = require('./directions');

var winningValue = 128;

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

    function handleMove (moved) {
        if (moved) { grid.placeRandomTile(); }
        view.display(grid);

        if ( winCondition(grid) ) { handleWinning(); }
        else if ( loseCondition(grid) ) { handleLosing(); }
    }

    this.run = function() {
        while (!gameOver) {
            var direction = player.getMove();
            var moved = grid.move(direction);
            console.log(direction, moved);
            handleMove(moved);
        }
        return gameWon;
    };

    updateView();
}

module.exports = GameManager;
