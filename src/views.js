var toString = function(grid) {
    var string = '';

    function printCell (cell) {
        return cell ? cell.value : '_';
    }

    // function printRow (row) {
    //     forEachColumn(printCell);
    // }

    // forEachRow(printRow);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var column = grid.cells[j];
            var cell = column[i];
            var cellString = printCell(cell);
            string += ( cellString + '\t' );
        }
        string += '\n';
    }
    return string;
}

// grid.row(i) -> [] of cells in row i
// grid.column(j) -> [] of cells in column j
// grid.row(i).column(j) -> cell at i, j
// grid.column(i).row(j) -> cell at j, i



var ConsoleView = function () {
    this.display = function (grid) {
        console.log(toString(grid));
    }
};

module.exports = {
    console: function () {
        return new ConsoleView();
    }
}
