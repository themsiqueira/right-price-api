import { ValidationError } from '@nestjs/common'

export default class ValidationException extends Error {
  constructor(
    message: string,
    public readonly errors: ValidationError[]
  ) {
    super(message)
  }
}
