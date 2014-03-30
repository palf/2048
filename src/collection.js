function each (items, operation) {
    for (var index = 0 ; index < items.length ; index++) {
        var item = items[index];
        operation(item, index);
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

function selectAtRandom (object) {
    if (object.length !== undefined) {
        return object[Math.floor(Math.random() * object.length)];
    } else {
        var array = [];
        for (var key in object) {
            array.push(object[key]);
        }
        return selectAtRandom(array);
    }
}

module.exports = {
    each: each,
    filter: filter,
    reverse: reverse,
    selectAtRandom: selectAtRandom
};
