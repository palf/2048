var Tile = require('./tile');

var win_limit = 128;

function selectAtRandom (array) {
    return array[Math.floor(Math.random() * array.length)];
}

function positionsEqual (first, second) {
    return (first.x === second.x) && (first.y === second.y);
}


var vectors = {
    0: { x: 0,  y: -1 },
    1: { x: 1,  y: 0 },
    2: { x: 0,  y: 1 },
    3: { x: -1, y: 0 }
};

function getVector (direction) {
    return vectors[direction];
}

// function Cell (x, y, value) {
//     this.x = x;
//     this.y = y;
//     this.value = value;

//     this.left = null;
//     this.right = null;
//     this.up = null;
//     this.down = null;
// }


function Grid (size) {

    function eachCell (operation) {
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                operation(x, y, cells[x][y]);
            }
        }
    }

    function availableCells () {
        // var cellIsEmpty = function (cell) { cell.value === 0; }
        // return allCells.filter(cellIsEmpty);
        var available = [];
        eachCell(function (x, y, tile) {
            if (!tile) { available.push({ x: x, y: y }); }
        });

        return available;
    }

    function getContentOf (position) {
        if (withinBounds(position)) {
            return cells[position.x][position.y];
        } else {
            return null;
        }
    }

    function isEmpty (position) {
        return !getContentOf(position);
    }

    function withinBounds (position) {
        return position.x >= 0 &&
            position.y >= 0 &&
            position.x < size &&
            position.y < size;
    }


    function findFarthestPosition (position, vector) {
        var previous, next = position;

        do {
            previous = next;
            next = { x: previous.x + vector.x, y: previous.y + vector.y };
        } while (withinBounds(next) && isEmpty(next));

        return {
            farthest: previous,
            next: next
        };
    }



    function someCellsAreEmpty () {
        return availableCells().length > 0;
    }

    function tileMatchesAvailable () {
        eachCell(function (x, y, tile) {
            for (var direction = 0; direction < 4; direction++) {
                var vector = getVector(direction);
                var cell = { x: x + vector.x, y: y + vector.y };
                var other = getContentOf(cell);
                if (other && other.value === tile.value) {
                    return true;
                }
            }
        });

        return false;
    }

    this.movesAvailable = function () {
        return someCellsAreEmpty() || tileMatchesAvailable();
    };




    function insertTile (tile) {
        cells[tile.x][tile.y] = tile;
    }

    function removeTile (tile) {
        cells[tile.x][tile.y] = null;
    }

    function addRandomTile () {
        var value = (Math.random() < 0.9) ? 2 : 4;
        var emptyCells = availableCells();
        var tile = new Tile(selectAtRandom(emptyCells), value);
        insertTile(tile);
    }

    function moveTile (tile, cell) {
        cells[tile.x][tile.y] = null;
        cells[cell.x][cell.y] = tile;
        tile.updatePosition(cell);
    }

    function prepareTiles () {
        eachCell(function (x, y, tile) {
            if (tile) {
                tile.mergedFrom = null;
                tile.savePosition();
            }
        });
    }

    function buildTraversals (vector) {
        var traversals = { x: [], y: [] };

        for (var pos = 0; pos < size; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }

        if (vector.x === 1) { traversals.x = traversals.x.reverse(); }
        if (vector.y === 1) { traversals.y = traversals.y.reverse(); }

        return traversals;
    }


    this.move = function (direction) {
        var cell, tile;

        var vector = getVector(direction);
        var traversals = buildTraversals(vector);
        var moved = false;
        var won = false;

        prepareTiles();

        traversals.x.forEach(function (x) {
            traversals.y.forEach(function (y) {
                cell = indexes[x][y];
                tile = getContentOf(cell);

                if (tile) {
                    var positions = findFarthestPosition(cell, vector);
                    var next = getContentOf(positions.next);

                    if (next && next.value === tile.value && !next.mergedFrom) {
                        var merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];

                        insertTile(merged);
                        removeTile(tile);

                        tile.updatePosition(positions.next);

                        if (merged.value === win_limit) {
                            won = true;
                        }
                    } else {
                        moveTile(tile, positions.farthest);
                    }

                    if (!positionsEqual(cell, tile)) {
                        playerTurn = false;
                        moved = true;
                    }
                }
            });
        });

        return { moved: moved, won: won };
    };

    this.placeRandomTile = function() {
        addRandomTile();
        playerTurn = true;
    };


    var startTiles = 2;
    var playerTurn = true;

    var cells = [];
    var indexes = [];
    var x, y;

    for (x = 0; x < size; x ++) {
        var column = [];
        for (y = 0; y < size; y ++) {
            column.push({ x: x, y: y });
        }
        indexes.push(column);
    }

    for (x = 0; x < size; x++) {
        var row = cells[x] = [];

        for (y = 0; y < size; y++) {
            row.push(null);
        }
    }

    for (var i = 0; i < startTiles; i++) {
        addRandomTile();
    }

    this.cells = cells;
}

module.exports = Grid;
