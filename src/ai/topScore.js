function considerMergeScore (grid, direction) {
    var newGrid = grid.clone();
    var move = newGrid.move(direction);
    var score = move.successful ? move.value : -1;
    return { value: score, direction: direction };
}

function maxValue (scores) {
    var best = scores.pop();
    var next;

    while (scores.length > 0) {
        next = scores.pop();
        if (next.value > best.value) {
            best = next;
        }
    }

    return best;
}

module.exports = function TopScore (grid) {
    this.getMove = function getMove(directions) {
        var scores = [
            considerMergeScore(grid, directions.UP),
            considerMergeScore(grid, directions.DOWN),
            considerMergeScore(grid, directions.LEFT),
            considerMergeScore(grid, directions.RIGHT)
        ];

        return maxValue(scores).direction;
    };
};
