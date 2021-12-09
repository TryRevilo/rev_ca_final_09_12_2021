var revTruncateString = (str, n) => {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
};

var revGenRandString = (revLength) => {
    let revResult = "";
    let revCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let revCharactersLength = revCharacters.length;
    for (let i = 0; i < revLength; i++) {
        revResult += revCharacters.charAt(Math.floor(Math.random() * revCharactersLength));
    }

    return revResult;
};

var revIsStringEqual = (revString1, revString2) => {
    return revString1 && revString2 && revString1.localeCompare(revString2) == 0;
};

var revIsEmptyVar = (v) => {
    let type = typeof v;

    if (type === "undefined") {
        return true;
    }

    if (type === "boolean") {
        return !v;
    }

    if (v === null) {
        return true;
    }

    if (v === undefined) {
        return true;
    }

    if (v instanceof Array) {
        if (v.length < 1) {
            return true;
        }
    } else if (type === "string") {
        if (v.length < 1) {
            return true;
        }
        if (v === "0") {
            return true;
        }
    } else if (type === "object") {
        if (Object.keys(v).length < 1) {
            return true;
        }
    } else if (type === "number") {
        if (v === 0) {
            return true;
        }
    }

    return false;
};

module.exports.revTruncateString = revTruncateString;

module.exports.revGenRandString = revGenRandString;
module.exports.revIsStringEqual = revIsStringEqual;
module.exports.revIsEmptyVar = revIsEmptyVar;
