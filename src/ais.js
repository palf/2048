var StolenAI = require('./ai/stolen');
var RandomAI = require('./ai/random');
var TopScore = require('./ai/topScore');

module.exports = {
    random: function (grid) {
        return new RandomAI(grid);
    },

    topScore: function (grid) {
        return new TopScore(grid);
    },

    stolen: function (grid) {
        return new StolenAI(grid);
    }
};
