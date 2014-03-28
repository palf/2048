var collection = require('../collection');
var directions = require('../directions');

var selectAtRandom = collection.selectAtRandom;

var availableDirections = [
    directions.UP,
    directions.DOWN,
    directions.LEFT,
    directions.RIGHT,
];

function RandomAI () {
    this.getMove = function () {
        return selectAtRandom(availableDirections);
    }
}

module.exports = RandomAI;
