var analysis = {

    islands: function(grid) {
        var mark = function(x, y, value) {
            if (x >= 0 && x <= 3 && y >= 0 && y <= 3 &&
                    grid.cells[x][y] &&
                    grid.cells[x][y].value == value &&
                    !grid.cells[x][y].marked ) {
                grid.cells[x][y].marked = true;

                for (direction in [0,1,2,3]) {
                    var vector = grid._getVector(direction);
                    mark(x + vector.x, y + vector.y, value);
                }
            }
        }

        var islands = 0;

        for (var x=0; x<4; x++) {
            for (var y=0; y<4; y++) {
                if (grid.cells[x][y]) {
                    grid.cells[x][y].marked = false
                }
            }
        }
        for (var x=0; x<4; x++) {
            for (var y=0; y<4; y++) {
                if (grid.cells[x][y] &&
                        !grid.cells[x][y].marked) {
                    islands++;
                    mark({ x:x, y:y }, grid.cells[x][y].value);
                }
            }
        }

        return islands;
    },


    // measures how smooth the grid is (as if the values of the pieces
    // were interpreted as elevations). Sums of the pairwise difference
    // between neighboring tiles (in log space, so it represents the
    // number of merges that need to happen before they can merge).
    // Note that the pieces can be distant
    smoothness: function(grid) {
        var smoothness = 0;
        for (var x=0; x<4; x++) {
            for (var y=0; y<4; y++) {
                if ( grid._cellOccupied( grid.indexes[x][y] )) {
                    var value = Math.log(grid._cellContent( grid.indexes[x][y] ).value) / Math.log(2);
                    for (var direction=1; direction<=2; direction++) {
                        var vector = grid._getVector(direction);
                        var targetCell = grid.findFarthestPosition(grid.indexes[x][y], vector).next;

                        if (grid._cellOccupied(targetCell)) {
                            var target = grid._cellContent(targetCell);
                            var targetValue = Math.log(target.value) / Math.log(2);
                            smoothness -= Math.abs(value - targetValue);
                        }
                    }
                }
            }
        }
        return smoothness;
    },

    monotonicity: function(grid) {
        var self = this;
        var marked = [];
        var queued = [];
        var highestValue = 0;
        var highestCell = {x:0, y:0};
        for (var x=0; x<4; x++) {
            marked.push([]);
            queued.push([]);
            for (var y=0; y<4; y++) {
                marked[x].push(false);
                queued[x].push(false);
                if (grid.cells[x][y] &&
                        grid.cells[x][y].value > highestValue) {
                    highestValue = grid.cells[x][y].value;
                    highestCell.x = x;
                    highestCell.y = y;
                }
            }
        }

        increases = 0;
        cellQueue = [highestCell];
        queued[highestCell.x][highestCell.y] = true;
        markList = [highestCell];
        markAfter = 1; // only mark after all queued moves are done, as if searching in parallel

        var markAndScore = function(cell) {
            markList.push(cell);
            var value;
            if (grid._cellOccupied(cell)) {
                value = Math.log(grid._cellContent(cell).value) / Math.log(2);
            } else {
                value = 0;
            }
            for (direction in [0,1,2,3]) {
                var vector = grid._getVector(direction);
                var target = { x: cell.x + vector.x, y: cell.y+vector.y }
                if (grid._withinBounds(target) && !marked[target.x][target.y]) {
                    if ( grid._cellOccupied(target) ) {
                        targetValue = Math.log(grid._cellContent(target).value ) / Math.log(2);
                        if ( targetValue > value ) {
                            //console.log(cell, value, target, targetValue);
                            increases += targetValue - value;
                        }
                    }
                    if (!queued[target.x][target.y]) {
                        cellQueue.push(target);
                        queued[target.x][target.y] = true;
                    }
                }
            }
            if (markAfter == 0) {
                while (markList.length > 0) {
                    var cel = markList.pop();
                    marked[cel.x][cel.y] = true;
                }
                markAfter = cellQueue.length;
            }
        }

        while (cellQueue.length > 0) {
            markAfter--;
            markAndScore(cellQueue.shift())
        }

        return -increases;
    },

    // measures how monotonic the grid is. This means the values of the tiles are strictly increasing
    // or decreasing in both the left/right and up/down directions
    monotonicity2: function(grid) {
        // scores for all four directions
        var totals = [0, 0, 0, 0];

        // up/down direction
        for (var x=0; x<4; x++) {
            var current = 0;
            var next = current+1;
            while ( next<4 ) {
                while ( next<4 && !grid._cellOccupied( grid.indexes[x][next] )) {
                    next++;
                }
                if (next>=4) { next--; }
                var currentValue = grid._cellOccupied({x:x, y:current}) ?
                    Math.log(grid._cellContent( grid.indexes[x][current] ).value) / Math.log(2) :
                    0;
                var nextValue = grid._cellOccupied({x:x, y:next}) ?
                    Math.log(grid._cellContent( grid.indexes[x][next] ).value) / Math.log(2) :
                    0;
                if (currentValue > nextValue) {
                    totals[0] += nextValue - currentValue;
                } else if (nextValue > currentValue) {
                    totals[1] += currentValue - nextValue;
                }
                current = next;
                next++;
            }
        }

        // left/right direction
        for (var y=0; y<4; y++) {
            var current = 0;
            var next = current+1;
            while ( next<4 ) {
                while ( next<4 && !grid._cellOccupied( grid.indexes[next][y] )) {
                    next++;
                }
                if (next>=4) { next--; }
                var currentValue = grid._cellOccupied({x:current, y:y}) ?
                    Math.log(grid._cellContent( grid.indexes[current][y] ).value) / Math.log(2) :
                    0;
                var nextValue = grid._cellOccupied({x:next, y:y}) ?
                    Math.log(grid._cellContent( grid.indexes[next][y] ).value) / Math.log(2) :
                    0;
                if (currentValue > nextValue) {
                    totals[2] += nextValue - currentValue;
                } else if (nextValue > currentValue) {
                    totals[3] += currentValue - nextValue;
                }
                current = next;
                next++;
            }
        }

        return Math.max(totals[0], totals[1]) + Math.max(totals[2], totals[3]);
    },

    maxValue: function(grid) {
        var max = 0;
        for (var x=0; x<4; x++) {
            for (var y=0; y<4; y++) {
                if (grid._cellOccupied(grid.indexes[x][y])) {
                    var value = grid._cellContent(grid.indexes[x][y]).value;
                    if (value > max) {
                        max = value;
                    }
                }
            }
        }

        return Math.log(max) / Math.log(2);
    }

};


module.exports = analysis;
