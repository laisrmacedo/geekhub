import { BaseError } from "./BaseError";

export class ForbiddenError extends BaseError {
    constructor(
        message: string = "There's no permission to complete the request."
    ) {
        super(403, message)
    }
}