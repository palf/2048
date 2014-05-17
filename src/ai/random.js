var collection = require('../utils/collection');

function RandomAI () {
    this.getMove = function (directions) {
        return collection.selectAtRandom(directions);
    };
}

module.exports = RandomAI;
