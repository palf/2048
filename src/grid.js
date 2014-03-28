var collection = require('./collection');
var order = require('./grid_ordering');
var superMerge = require('./merge');

var each = collection.each;
var filter = collection.filter;
var selectAtRandom = collection.selectAtRandom;


function buildGrid (size) {
    var cells = [];
    var square = size * size;

    for (var i = 0 ; i < square ; i++) {
        cells.push({ value: 0, neighbours: [] });
    }

    function connect (left, right) {
        left.neighbours.push(right);
    }

    for (var j = 0 ; j < (square - 1) ; j ++) {
        if ( (j + 1) % 4 !== 0) {
            connect(cells[j], cells[j + 1]);
        }
    }

    for (var k = 0 ; k < (square - size) ; k ++) {
        connect(cells[k], cells[k + size]);
    }

    return cells;
}


function Grid (size) {

    function cellIsEmpty (cell) {
        return (cell.value === 0);
    }

    function emptyCells () {
        return collection.filter(cells, cellIsEmpty);
    }

    function emptyCellsExist () {
        return emptyCells().length > 0;
    }

    function neighbourMergesAvailable () {
        var mergeAvailable = false;
        function checkNeighboursForMatch (cell) {
            function valueMatches (neighbour) {
                return (cell.value === neighbour.value);
            }

            mergeAvailable = mergeAvailable || ((filter(cell.neighbours, valueMatches)).length > 0);
        }

        collection.each(cells, checkNeighboursForMatch);
        return mergeAvailable;
    }

    this.movesAvailable = function () {
        return emptyCellsExist() || neighbourMergesAvailable();
    };




    function attemptMove (sets) {
        var moveSucceeded = false;
        each(sets, function (set) {
            var result = superMerge(set);
            moveSucceeded = moveSucceeded || result;
        });
        return moveSucceeded;
    }

    this.move = function (direction) {
        var sets = order(cells, direction);
        return attemptMove(sets);
    };



    this.placeRandomTile = function () {
        var value = 2;
        var cell = selectAtRandom(emptyCells());
        if (cell) { cell.value = value; }
    };



    this.contains = function (value) {
        function valueMatches (cell) {
            return cell.value === value;
        }
        return filter(cells, valueMatches).length > 0;
    };

    var cells = buildGrid(size);
    this.cells = cells;

    this.placeRandomTile();
    this.placeRandomTile();
}

module.exports = Grid;
