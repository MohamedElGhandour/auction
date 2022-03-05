"use strict";
const myError = function (message) {
    this.message = message;
};
myError.prototype = new Error();
module.exports = myError;
