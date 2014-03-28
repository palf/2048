var collection = require('./collection');
var directions = require('./directions');

var each = collection.each;
var reverse = collection.reverse;


function createRows (cells, size) {
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

function createColumns (cells, size) {
    var columns = [];
    var tick = 0;
    var column;

    for (var i = 0 ; i < size ; i++ ) {
        columns.push([]);
    }

    each(cells, function (cell) {
        column = columns[tick];
        column.push(cell);
        tick = (tick + 1) % size;
    });

    return columns;
}


function orderForUp (cells, size) { return createColumns(cells, size); }
function orderForDown (cells, size) { return createColumns(reverse(cells), size); }
function orderForLeft (cells, size) { return createRows(cells, size); }
function orderForRight (cells, size) { return createRows(reverse(cells), size); }

var setOrderBy = {};
setOrderBy[directions.UP] = orderForUp;
setOrderBy[directions.DOWN] = orderForDown;
setOrderBy[directions.LEFT] = orderForLeft;
setOrderBy[directions.RIGHT] = orderForRight;

module.exports = function (cells, direction) {
    return setOrderBy[direction](cells, 4);
}
