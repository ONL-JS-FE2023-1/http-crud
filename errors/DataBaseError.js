class DataBaseError extends Error {
    constructor(message) {
        super(message);
        this.message = 'Data base failed!'
    }
}

module.exports = DataBaseError;