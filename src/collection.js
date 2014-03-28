function each (items, operation) {
    for (var i = 0 ; i < items.length ; i++) {
        var item = items[i];
        operation(item);
    }
}

function filter (items, predicate) {
    var newCollection = [];
    each(items, function (item) {
        if (predicate(item)) { newCollection.push(item); }
    });
    return newCollection;
}

function reverse (array) {
    var newCollection = [];
    each(array, function (item) {
        newCollection.unshift(item);
    });
    return newCollection;
}

function selectAtRandom (array) {
    return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
    each: each,
    filter: filter,
    reverse: reverse,
    selectAtRandom: selectAtRandom
};
