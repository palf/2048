var merge = require('../src/game/merge');


function cells () {
    var array = [];
    array.add = function (value) {
        array.push({ value: value });
        return array;
    };
    return array;
}


exports['[ ] -> [ ]'] = function (test) {
    var set = cells();
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 0);
    test.done();
};

exports['[ 0 ] -> [ 0 ]'] = function (test) {
    var set = cells().add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 1);
    test.ok(set[0].value === 0);
    test.done();
};

exports['[ 1 ] -> [ 1 ]'] = function (test) {
    var set = cells().add(1);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 1);
    test.ok(set[0].value === 1);
    test.done();
};


exports['[ 0, 0 ] -> [ 0, 0 ]'] = function (test) {
    var set = cells().add(0).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 2);
    test.ok(set[0].value === 0);
    test.ok(set[1].value === 0);
    test.done();
};


exports['[ 0, 1 ] -> [ 1, 0 ]'] = function (test) {
    var set = cells().add(0).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 2);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 0);
    test.done();
};


exports['[ 1, 0 ] -> [ 1, 0 ]'] = function (test) {
    var set = cells().add(1).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 2);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 0);
    test.done();
};

exports['[ 1, 1 ] -> [ 2, 0 ]'] = function (test) {
    var set = cells().add(1).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 2);
    test.ok(set.length === 2);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 0);
    test.done();
};


exports['[ 0, 0, 0 ] -> [ 0, 0, 0 ]'] = function (test) {
    var set = cells().add(0).add(0).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 0);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 0, 1 ] -> [ 1, 0, 0 ]'] = function (test) {
    var set = cells().add(0).add(0).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 1, 0 ] -> [ 1, 0, 0 ]'] = function (test) {
    var set = cells().add(0).add(1).add(0);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 1, 1 ] -> [ 2, 0, 0 ]'] = function (test) {
    var set = cells().add(0).add(1).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 2);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 0, 0 ] -> [ 1, 0, 0 ]'] = function (test) {
    var set = cells().add(1).add(0).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 0, 1 ] -> [ 2, 0, 0 ]'] = function (test) {
    var set = cells().add(1).add(0).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 2);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 1, 0 ] -> [ 2, 0, 0 ]'] = function (test) {
    var set = cells().add(1).add(1).add(0);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 2);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 0);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 1, 1 ] -> [ 2, 1, 0 ]'] = function (test) {
    var set = cells().add(1).add(1).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 2);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 1);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 1, 2 ] -> [ 1, 2, 0 ]'] = function (test) {
    var set = cells().add(0).add(1).add(2);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 2);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 2, 1 ] -> [ 2, 1, 0 ]'] = function (test) {
    var set = cells().add(0).add(2).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 1);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 0, 2 ] -> [ 1, 2, 0 ]'] = function (test) {
    var set = cells().add(1).add(0).add(2);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 2);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 1, 2, 0 ] -> [ 1, 2, 0 ]'] = function (test) {
    var set = cells().add(1).add(2).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 1);
    test.ok(set[1].value === 2);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 2, 0, 1 ] -> [ 2, 1, 0 ]'] = function (test) {
    var set = cells().add(2).add(0).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 1);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 2, 1, 0 ] -> [ 2, 1, 0 ]'] = function (test) {
    var set = cells().add(2).add(1).add(0);
    var result = merge(set);

    test.ok(result.moved === false);
    test.ok(result.value === 0);
    test.ok(set.length === 3);
    test.ok(set[0].value === 2);
    test.ok(set[1].value === 1);
    test.ok(set[2].value === 0);
    test.done();
};


exports['[ 2, 2, 1 ] -> [ 4, 1, 0 ]'] = function (test) {
    var set = cells().add(2).add(2).add(1);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 4);
    test.ok(set.length === 3);
    test.ok(set[0].value === 4);
    test.ok(set[1].value === 1);
    test.ok(set[2].value === 0);
    test.done();
};

exports['[ 0, 4, 7, 4 ] -> [ 4, 7, 4, 0 ]'] = function (test) {
    var set = cells().add(0).add(4).add(7).add(4);
    var result = merge(set);

    test.ok(result.moved === true);
    test.ok(result.value === 0);
    test.ok(set.length === 4);
    test.ok(set[0].value === 4, set[0].value);
    test.ok(set[1].value === 7, set[1].value);
    test.ok(set[2].value === 4, set[2].value);
    test.ok(set[3].value === 0, set[3].value);
    test.done();
};
