module.exports = function superMerge (set) {
    var length = set.length;
    var operation = false;

    for (var i = 0 ; i < length ; i++) {
        var leftMerged = false;

        for (var j = i+1 ; j < length ; j++) {
            var left = set[i].value;
            var right = set[j].value;
            if (leftMerged) {
                break;

            } else if (right === 0) {
                //next

            } else if (right === left) {
                //merge
                set[i].value = set[i].value + set[j].value;
                set[j].value = 0;
                leftMerged = true;
                operation = true;

            } else if (left === 0) {
                //move
                set[i].value = set[j].value;
                set[j].value = 0;
                operation = true;

            } else {
                break;
            }
        }
    }

    return operation;
};
