class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.message = 'Thing not found'
    }
}

module.exports = NotFoundError;