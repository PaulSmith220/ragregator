
const abstractMethod = function(name) {
    return function () {
        throw new Error(`Abstract method "${name}" is not implemented in "${this.constructor.name}"`);
    };
};

// Abstract class
class FileSystem {
    constructor() {
        if (this.constructor.name === 'FileSystem') {
            throw new TypeError('Usage of an abstract class constructor is not allowed');
        }
    }
}

['save', 'load', 'find', 'delete'] // Adding abstract methods
    .forEach(key => FileSystem.prototype[key] = abstractMethod(key));

export default FileSystem;
