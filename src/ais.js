var StolenAI = require('./ai/stolen');
var RandomAI = require('./ai/random');
var MergeSumAI = require('./ai/mergeSum');

module.exports = {
    random: function (grid) {
        return new RandomAI(grid);
    },

    mergeSum: function (grid) {
        return new MergeSumAI(grid);
    },

    stolen: function (grid) {
        return new StolenAI(grid);
    }
}
