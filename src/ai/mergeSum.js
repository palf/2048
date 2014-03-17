function MergeSumAI (grid) {
    this.grid = grid;

    function bestMove () {
        return 0;
    }


    this.getMove = function () {
        return {
            move: bestMove()
        }
    }
}

module.exports = MergeSumAI;
