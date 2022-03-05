const myError = function (this: any, message: any) {
  this.message = message;
};
myError.prototype = new Error();
export = myError;
