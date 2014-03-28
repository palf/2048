var directions = require('./directions');
var collection = require('./collection');

var each = collection.each;
var filter = collection.filter;
var reverse = collection.reverse;



function randomFrom (array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

var superMerge = require('./merge');

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

    function directMergesAvailable () {
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
        return emptyCellsExist() || directMergesAvailable();
    };





    function createRows (cells) {
        var rows = [];
        var tick = 0;
        var row;
        each(cells, function (cell) {
            if (tick === 0) {
                row = [];
                rows.push(row);
            }
            row.push(cell);
            tick = (tick + 1) % size;
        });

        return rows;
    }


    function createColumns (cells) {
        var columns = [];
        for (var i = 0 ; i < size ; i++ ) {
            columns.push([]);
        }

        var tick = 0;
        var column;
        each(cells, function (cell) {
            column = columns[tick];
            column.push(cell);
            tick = (tick + 1) % size;
        });

        return columns;
    }


    function manipulate (sets) {
        var operation = false;
        each(sets, function (set) {
            var result = superMerge(set);
            operation = operation || result;
        });
        return operation;
    }

    function moveUp () {
        var sets = createColumns(cells);
        return manipulate(sets);
    }

    function moveDown () {
        var sets = createColumns(reverse(cells));
        return manipulate(sets);
    }

    function moveLeft () {
        var sets = createRows(cells);
        return manipulate(sets);
    }

    function moveRight () {
        var sets = createRows(reverse(cells));
        return manipulate(sets);
    }

    this.move = function (directionIndex) {
        var direction = directions[directionIndex];
        console.log(direction);
        var options = {
            'up': moveUp,
            'right': moveRight,
            'down': moveDown,
            'left': moveLeft
        };

        var handler = options[direction];
        var moveSucceeded = handler();

        return { moved: moveSucceeded };
    };



    this.placeRandomTile = function () {
        var value = 2;
        var cell = randomFrom(emptyCells());
        if (cell) {
            cell.value = value;
        }
    };

    var cells = buildGrid(size);
    this.cells = cells;

    this.placeRandomTile();
    this.placeRandomTile();

}

module.exports = Grid;
