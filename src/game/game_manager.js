var directions = require('./directions');

var winningValue = 2048;

function GameManager (game, player, view) {
    var gameOver = false;
    var gameWon = false;

    function handleWinning () {
        gameWon = true;
        gameOver = true;
    }

    function handleLosing () {
        gameWon = false;
        gameOver = true;
    }

    function winCondition (game) {
        return game.contains(winningValue);
    }

    function loseCondition (game) {
        return !game.hasAvailableMoves();
    }

    function handleMove (move) {
        if (move.successful) {
            game.placeRandomTile();
            view.display(game);

            if ( winCondition(game) ) { handleWinning(); }
            else if ( loseCondition(game) ) { handleLosing(); }
        }
    }

    this.run = function() {
        var turns = 0;
        // while (!gameOver) {
        while (turns < 2) {
            var direction = player.getMove(directions);
            var moveResult = game.move(direction);
            turns += 1;
            view.log(direction, '-->', moveResult);
            handleMove(moveResult);
        }
        return { won: gameWon, turns: turns };
    };

    view.display(game);
}

module.exports = GameManager;
