// Copyright 2012 ninjagecko
// https://stackoverflow.com/a/10316616/13077523
const STRICT_EQUALITY_BROKEN = (a, b) => a === b;
const STRICT_EQUALITY_NO_NAN = (a, b) => {
    if (
        typeof a == "number" &&
        typeof b == "number" &&
        "" + a == "NaN" &&
        "" + b == "NaN"
    )
        // isNaN does not do what you think; see +/-Infinity
        return true;
    else return a === b;
};
const deepEquals = (
    a,
    b,
    areEqual = STRICT_EQUALITY_NO_NAN,
    setElementsAreEqual = STRICT_EQUALITY_NO_NAN
) => {
    /* compares objects hierarchically using the provided 
           notion of equality (defaulting to ===);
           supports Arrays, Objects, Maps, ArrayBuffers */
    if (a instanceof Array && b instanceof Array)
        return arraysEqual(a, b, areEqual);
    if (
        Object.getPrototypeOf(a) === Object.prototype &&
        Object.getPrototypeOf(b) === Object.prototype
    )
        return objectsEqual(a, b, areEqual);
    if (a instanceof Map && b instanceof Map) return mapsEqual(a, b, areEqual);
    if (a instanceof Set && b instanceof Set) {
        if (setElementsAreEqual === STRICT_EQUALITY_NO_NAN)
            return setsEqual(a, b);
        else
            throw "Error: set equality by hashing not implemented because cannot guarantee custom notion of equality is transitive without programmer intervention.";
    }
    if (
        (a instanceof ArrayBuffer || ArrayBuffer.isView(a)) &&
        (b instanceof ArrayBuffer || ArrayBuffer.isView(b))
    )
        return typedArraysEqual(a, b);
    return areEqual(a, b); // see note[1] -- IMPORTANT
};

function arraysEqual(a, b, areEqual) {
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++)
        if (!deepEquals(a[i], b[i], areEqual)) return false;
    return true;
}
function objectsEqual(a, b, areEqual) {
    var aKeys = Object.getOwnPropertyNames(a);
    var bKeys = Object.getOwnPropertyNames(b);
    if (aKeys.length != bKeys.length) return false;
    aKeys.sort();
    bKeys.sort();
    for (var i = 0; i < aKeys.length; i++)
        if (!areEqual(aKeys[i], bKeys[i]))
            // keys must be strings
            return false;
    return deepEquals(
        aKeys.map((k) => a[k]),
        aKeys.map((k) => b[k]),
        areEqual
    );
}
function mapsEqual(a, b, areEqual) {
    // assumes Map's keys use the '===' notion of equality, which is also the assumption of .has and .get methods in the spec; however, Map's values use our notion of the areEqual parameter
    if (a.size != b.size) return false;
    return [...a.keys()].every(
        (k) => b.has(k) && deepEquals(a.get(k), b.get(k), areEqual)
    );
}
function setsEqual(a, b) {
    // see discussion in below rest of StackOverflow answer
    return a.size == b.size && [...a.keys()].every((k) => b.has(k));
}
function typedArraysEqual(a, b) {
    // we use the obvious notion of equality for binary data
    a = new Uint8Array(a);
    b = new Uint8Array(b);
    if (a.length != b.length) return false;
    for (var i = 0; i < a.length; i++) if (a[i] != b[i]) return false;
    return true;
}

export default deepEquals;
