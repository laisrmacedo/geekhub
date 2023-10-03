import { BaseError } from "./BaseError";

export class UnprocessableEntity extends BaseError {
  constructor(
    message: string = "Unable to process the instructions.."
  ) {
    super(422, message)
  }
}