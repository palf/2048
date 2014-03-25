function RandomAI () {
    this.getMove = function () {
        return {
            move: Math.floor(Math.random() * 4)
        };
    };
}

module.exports = RandomAI;
