import { Injectable, ValidationError } from '@nestjs/common'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'

import ErrorType from '@app/shared/constant/error.enum'
import { ErrorService } from '@app/shared/services/error.service'
import ValidationException from '@app/shared/exception/validation.exception'

@Injectable()
export class ValidateService {
  constructor(private errorService: ErrorService) {}

  /**
   * Generic function to validate a given input. Throws a `StandardError` with type `errorType` when input validation fails.
   *
   * @param {ClassConstructor<T>} type
   * @param {V} input input to be validated
   * @param {string} [errorType=ErrorType.INVALID_INPUT] errorType error type of `StandardError` if validation fails
   *
   * @throws {StandardError}
   */
  async validateInput<T extends object, V>(type: ClassConstructor<T>, input: V, errorType: string): Promise<void> {
    try {
      await validateOrReject(plainToInstance(type, input))
    } catch (err) {
      this.errorService.throw(err as ValidationError[], errorType)
    }
  }

  /**
   * Generic function to validate and transform and input, return a `T` class if input is valid. Throws a `StandardError` with type
   * `errorType` when input validation fails.
   *
   * Attention!!! this method should only be used to validate inputs in use cases
   * otherwise we should use this.validateObject
   *
   * @param {ClassConstructor<T>} type
   * @param {V} input input to be validated
   * @param {string} [errorType=ErrorType.INVALID_INPUT] errorType error type of `StandardError` if validation fails
   *
   * @returns {T} transformed input with `T` class
   * @throws {StandardError}
   */
  async validateAndTransformInput<T extends object, V>(
    type: ClassConstructor<T>,
    input: V,
    errorType: string = ErrorType.INVALID_INPUT
  ): Promise<T> {
    try {
      const result = plainToInstance(type, input)
      await validateOrReject(result, { whitelist: true })
      return result
    } catch (err) {
      this.errorService.throw(err as ValidationError[], errorType)
    }
  }

  /**
   * Generic function to validate and transform an object, return a `T` class if input is valid.
   * Throws a `ValidationException` when input validation fails.
   *
   * @param {ClassConstructor<T>} validator A class containing validation decorations
   * @param {V} input Input to be validated
   *
   * @returns {T} transformed object with `T` class
   * @throws {ValidationException}
   */
  async validateAndTransformObject<T extends object, V>(validator: ClassConstructor<T>, input: V): Promise<T> {
    try {
      const result = plainToInstance(validator, input)
      await validateOrReject(result, { whitelist: true })
      return result
    } catch (error: unknown) {
      this.handleError(error)
    }
  }

  private handleError(error: unknown): never {
    if (this.isValidationErrorArray(error)) {
      throw new ValidationException('Input is invalid', error)
    }
    throw error
  }

  private isValidationErrorArray(error: unknown): error is ValidationError[] {
    return Array.isArray(error) && !!(error[0] as ValidationError)?.property
  }
}
