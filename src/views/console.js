var toString = function(grid) {
    var string = '';

    function printCell (cell) {
        return cell ? cell.value : '_';
    }

    var grid_size = 4;
    for (var i = 0; i < grid_size; i++) {
        for (var j = 0; j < grid_size; j++) {
            var cell = grid.cells[j + grid_size * i];
            var cellString = printCell(cell);
            string += ( cellString + '\t' );
        }
        string += '\n';
    }
    return string;
};

var ConsoleView = function () {
    this.display = function (grid) {
        console.log(toString(grid));
    };

    this.log = console.log;
};

module.exports = ConsoleView;
