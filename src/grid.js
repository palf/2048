var Tile = require('./tile');

var win_limit = 128;


function Grid(size) {
    var self = this;

    function randomSelect (cells) {
        return cells[Math.floor(Math.random() * cells.length)];
    }

    this.availableCells = function () {
        var available = [];
        eachCell(function (x, y, tile) {
            if (!tile) { available.push({ x: x, y: y }); }
        });

        return available;
        // var emptyCells = function (cell) { cell.value = 0; }
        // return allCells.select(emptyCells) ;
    };


    function eachCell (operation) {
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                operation(x, y, self.cells[x][y]);
            }
        }
    }


    this._cellsAvailable = function () {
        return !!this.availableCells().length;
    };


    this._cellAvailable = function (cell) {
        return !this._cellOccupied(cell);
    };

    this._cellOccupied = function (cell) {
        return !!this._cellContent(cell);
    };

    this._cellContent = function (cell) {
        if (this._withinBounds(cell)) {
            return this.cells[cell.x][cell.y];
        } else {
            return null;
        }
    };


    this.insertTile = function (tile) {
        this.cells[tile.x][tile.y] = tile;
    };


    this.createTile = function (position, value) {
        return new Tile(position, value);
    };


    this.removeTile = function (tile) {
        this.cells[tile.x][tile.y] = null;
    };


    this._withinBounds = function (position) {
        return position.x >= 0 && position.x < size &&
                     position.y >= 0 && position.y < size;
    };


    this.clone = function() {
        var newGrid = new Grid(size);
        newGrid.playerTurn = this.playerTurn;
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                if (this.cells[x][y]) {
                    newGrid.insertTile(this.cells[x][y].clone());
                }
            }
        }
        return newGrid;
    };


    this._addRandomTile = function () {
        var value = (Math.random() < 0.9) ? 2 : 4;
        var cells = this.availableCells();
        var tile = new Tile(randomSelect(cells), value);
        this.insertTile(tile);
    };

    this._prepareTiles = function () {
        eachCell(function (x, y, tile) {
            if (tile) {
                tile.mergedFrom = null;
                tile.savePosition();
            }
        });
    };

    this._moveTile = function (tile, cell) {
        this.cells[tile.x][tile.y] = null;
        this.cells[cell.x][cell.y] = tile;
        tile.updatePosition(cell);
    };


    var vectors = {
        0: { x: 0,  y: -1 },
        1: { x: 1,  y: 0 },
        2: { x: 0,  y: 1 },
        3: { x: -1, y: 0 }
    };


    this._getVector = function (direction) {
        return vectors[direction];
    };

    this.move = function (direction) {
        var self = this;
        var cell, tile;

        var vector = this._getVector(direction);
        var traversals = this._buildTraversals(vector);
        var moved = false;
        var won = false;

        this._prepareTiles();

        traversals.x.forEach(function (x) {
            traversals.y.forEach(function (y) {
                cell = indexes[x][y];
                tile = self._cellContent(cell);

                if (tile) {
                    var positions = self.findFarthestPosition(cell, vector);
                    var next = self._cellContent(positions.next);

                    if (next && next.value === tile.value && !next.mergedFrom) {
                        var merged = new Tile(positions.next, tile.value * 2);
                        merged.mergedFrom = [tile, next];

                        self.insertTile(merged);
                        self.removeTile(tile);

                        tile.updatePosition(positions.next);

                        if (merged.value === win_limit) {
                            won = true;
                        }
                    } else {
                        self._moveTile(tile, positions.farthest);
                    }

                    if (!self.positionsEqual(cell, tile)) {
                        self.playerTurn = false;
                        moved = true;
                    }
                }
            });
        });

        return { moved: moved, won: won };
    };

    this.placeRandomTile = function() {
        this._addRandomTile();
        this.playerTurn = true;
    };


    this._buildTraversals = function (vector) {
        var traversals = { x: [], y: [] };

        for (var pos = 0; pos < size; pos++) {
            traversals.x.push(pos);
            traversals.y.push(pos);
        }


        if (vector.x === 1) { traversals.x = traversals.x.reverse(); }
        if (vector.y === 1) { traversals.y = traversals.y.reverse(); }

        return traversals;
    };

    this.findFarthestPosition = function (cell, vector) {
        var previous;

        do {
            previous = cell;
            cell = { x: previous.x + vector.x, y: previous.y + vector.y };
        } while (this._withinBounds(cell) &&
                         this._cellAvailable(cell));

        return {
            farthest: previous,
            next: cell
        };
    };

    this.movesAvailable = function () {
        return this._cellsAvailable() || this._tileMatchesAvailable();
    };

    this._tileMatchesAvailable = function () {
        var self = this;
        var tile;

        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                tile = this._cellContent({ x: x, y: y });

                if (tile) {
                    for (var direction = 0; direction < 4; direction++) {
                        var vector = self._getVector(direction);
                        var cell = { x: x + vector.x, y: y + vector.y };

                        var other = self._cellContent(cell);

                        if (other && other.value === tile.value) {
                            return true;
                        }
                    }
                }
            }
        }


        return false;
    };

    this.positionsEqual = function (first, second) {
        return first.x === second.x && first.y === second.y;
    };


    this.contains = function(value) {
        var self = this;
        for (var x = 0; x < size; x++) {
            for (var y = 0; y < size; y++) {
                if (self._cellOccupied(indexes[x][y])) {
                    if (self._cellContent(indexes[x][y]).value === value) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    var startTiles = 2;
    this.playerTurn = true;

    this.cells = [];
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
        var row = this.cells[x] = [];

        for (y = 0; y < size; y++) {
            row.push(null);
        }
    }

    for (var i = 0; i < startTiles; i++) {
        this._addRandomTile();
    }

    this.indexes = indexes; // for stolen ai
    this.eachCell = eachCell; // for view
}
module.exports = Grid;
