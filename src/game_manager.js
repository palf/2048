var directions = require('./directions');

function GameManager(grid, player, view) {
    this.grid = grid;
    this.player = player;
    this.view = view;

    this.gameOver = false;
    this.won = false;

    this.updateView = function () {
        view.display(grid);
    };

    this.updateView();
}


GameManager.prototype.onMove = function(result) {
    if (result.won) {
        this.won = true;
        this.gameOver = true;
    } else {
        if (result.moved) {
            this.grid.placeRandomTile();
        }
    }
    this.updateView();

    if (!this.grid.movesAvailable()) {
        this.gameOver = true;
    }
}


GameManager.prototype.run = function() {
    while (!this.gameOver) {
        var best = this.player.getMove();
        var directionIndex = best.move;
        console.log(directions[directionIndex] + '\n');
        var result = this.grid.move(directionIndex);
        this.onMove(result);
    }
}


module.exports = GameManager;







// var handleWinning = function () {
//     this.won = true;
//     this.gameOver = true;
// }

// var handleLosing = function () {
//     this.won = false;
//     this.gameOver = true;
// }

// function loseCondition (grid) {
//     return !grid.hasMovesAvailable();
// }

// function winCondition (grid) {
//     return grid.contains(2048);
// }

// function requestNextMove () {
//     var move = this.player.getMove();

// }

// var handleMove = function (result) {
//     view.display(grid);

//     if ( winCondition(grid) ) { handleWinning(); }
//     else if ( loseCondition(grid) ) { handleLosing(); }
//     else { requestNextMove(); }
// }
