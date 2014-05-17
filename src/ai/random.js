var collection = require('../utils/collection');

var selectAtRandom = collection.selectAtRandom;

function RandomAI () {
    this.getMove = function (directions) {
        return selectAtRandom(directions);
    };
}

module.exports = RandomAI;
