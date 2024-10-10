export class CustomError {
    notFoundError (message ="Not found") {
        const error = new Error(message);
        error.status = 404;
        return error
    }
}