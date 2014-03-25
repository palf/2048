var analysis = require('../grid_analysis');

var minSearchTime = 100;

function AI(grid) {
    this.grid = grid;
}

AI.prototype.evaluate = function() {
    var emptyCells = this.grid.availableCells().length;

    var smoothWeight = 0.1,
        mono2Weight = 1.0,
        emptyWeight = 2.7,
        maxWeight = 1.0;

    return analysis.smoothness(this.grid) * smoothWeight +
        analysis.monotonicity2(this.grid) * mono2Weight +
        Math.log(emptyCells) * emptyWeight +
        analysis.maxValue(this.grid) * maxWeight;
};

//AI.prototype.cache = {}

// alpha-beta depth first search
AI.prototype.search = function(depth, alpha, beta, positions, cutoffs) {
    var bestScore;
    var bestMove = -1;
    var result;

    // the maxing player
    if (this.grid.playerTurn) {
        bestScore = alpha;
        for (var direction in [0, 1, 2, 3]) {
            var newGrid = this.grid.clone();
            if (newGrid.move(direction).moved) {
                positions++;
                if (newGrid.contains(2048)) {
                    return { move: direction, score: 10000, positions: positions, cutoffs: cutoffs };
                }
                var newAI = new AI(newGrid);

                if (depth === 0) {
                    result = { move: direction, score: newAI.evaluate() };
                } else {
                    result = newAI.search(depth-1, bestScore, beta, positions, cutoffs);
                    if (result.score > 9900) { // win
                        result.score--; // to slightly penalize higher depth from win
                    }
                    positions = result.positions;
                    cutoffs = result.cutoffs;
                }

                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestMove = direction;
                }
                if (bestScore > beta) {
                    cutoffs ++;
                    return { move: bestMove, score: beta, positions: positions, cutoffs: cutoffs };
                }
            }
        }
    }

    else { // computer's turn, we'll do heavy pruning to keep the branching factor low
        bestScore = beta;

        // try a 2 and 4 in each cell and measure how annoying it is
        // with metrics from eval
        var candidates = [];
        var cells = this.grid.availableCells();
        var scores = { 2: [], 4: [] };
        var value, i;
        for (value in scores) {
            for (i in cells) {
                scores[value].push(null);
                var cell = cells[i];
                var tile = this.grid.createTile(cell, parseInt(value, 10));
                this.grid.insertTile(tile);
                scores[value][i] = analysis.islands(this.grid) - analysis.smoothness(this.grid);
                this.grid.removeTile(cell);
            }
        }

        // now just pick out the most annoying moves
        var maxScore = Math.max(Math.max.apply(null, scores[2]), Math.max.apply(null, scores[4]));
        for (value in scores) { // 2 and 4
            for (i=0; i<scores[value].length; i++) {
                if (scores[value][i] === maxScore) {
                    candidates.push( { position: cells[i], value: parseInt(value, 10) } );
                }
            }
        }

        // search on each candidate
        for (i=0; i<candidates.length; i++) {
            var position = candidates[i].position;
            value = candidates[i].value;
            var newGrid2 = this.grid.clone();
            var tile2 = newGrid2.createTile(position, value);
            newGrid2.insertTile(tile2);
            newGrid2.playerTurn = true;
            positions++;
            var newAI2 = new AI(newGrid2);
            result = newAI2.search(depth, alpha, bestScore, positions, cutoffs);
            positions = result.positions;
            cutoffs = result.cutoffs;

            if (result.score < bestScore) {
                bestScore = result.score;
            }
            if (bestScore < alpha) {
                cutoffs++;
                return { move: null, score: alpha, positions: positions, cutoffs: cutoffs };
            }
        }
    }

    return { move: bestMove, score: bestScore, positions: positions, cutoffs: cutoffs };
};

AI.prototype.getMove = function() {
    return this.iterativeDeep();
};

// performs iterative deepening over the alpha-beta search
AI.prototype.iterativeDeep = function() {
    var start = (new Date()).getTime();
    var depth = 0;
    var best;
    do {
        var newBest = this.search(depth, -10000, 10000, 0 ,0);
        if (newBest.move === -1) {
            break;
        } else {
            best = newBest;
        }
        depth++;
    } while ( (new Date()).getTime() - start < minSearchTime);
    return best;
};



module.exports = AI;
