import { ValidationError } from 'class-validator'
import { Injectable } from '@nestjs/common'

import { StandardError, ValidationElement } from '@app/shared/interface/error.interface'
import ErrorType from '@app/shared/constant/error.enum'

@Injectable()
export class ErrorService {
  /**
   * **IMPORTANT:** Use this method on usecase layers only
   *
   * Throws an StandardError object containing type, errors and errorCode properties.
   *
   * @param {ValidationError[] | string[]} baseErrors array of validation errors or error messages
   * @param {string} type error type, preferable an `ErrorType` enum member
   * @param {string} errorCode errorCode specifying more details about the error type
   * @param {object}  extraOutputParams in case you need to return more extra properties when an error occurs
   *
   * @throws {StandardError}
   */
  throw(baseErrors: ValidationError[] | string[], type: string, errorCode?: string, extraOutputParams = {}): never {
    throw this.createError(baseErrors, type, errorCode, extraOutputParams)
  }

  /**
   * **IMPORTANT:** Use this method on usecase layers only
   *
   * Create an StandardError object containing type, errors and errorCode properties
   *
   * @param {ValidationError[] | string[]} baseErrors array of validation errors or error messages
   * @param {string} type error type, preferable an `ErrorType` enum member
   * @param {string} errorCode errorCode specifying more details about the error type
   * @param {object}  extraOutputParams in case you need to return more extra properties when an error occurs
   *
   * @return {StandardError} StandardError object containing type, errors and errorCode properties
   */
  createError(baseErrors: ValidationError[] | string[], type?: string, errorCode?: string, extraOutputParams = {}): StandardError {
    const errors = this.isValidationErrorArray(baseErrors) ? this.mapValidationError(baseErrors) : baseErrors
    return {
      errors,
      errorCode,
      type: typeof type === 'undefined' ? ErrorType.UNHANDLED_ERROR : this.normalizeErrorType(type),
      ...extraOutputParams
    }
  }

  getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message
    }

    if (this.isStandardError(error)) {
      return JSON.stringify(error.errors)
    }

    return 'unknown error'
  }

  isValidationErrorArray(baseErrors: unknown): baseErrors is ValidationError[] {
    return Array.isArray(baseErrors) && baseErrors.every((value) => value instanceof ValidationError)
  }

  isStandardError(error: unknown): error is StandardError {
    return (
      typeof error === 'object' &&
      error !== null &&
      has(error, 'type') &&
      typeof error.type === 'string' &&
      has(error, 'errors') &&
      Array.isArray(error.errors) &&
      (error.errors.every((e) => typeof e === 'string') || error.errors.every((e) => typeof e === 'object'))
    )
  }

  private normalizeErrorType(type: string): string {
    return type.length > 0 ? type.toLocaleUpperCase().replace(/ /g, '_') : ErrorType.UNHANDLED_ERROR
  }

  private mapValidationError(errors: ValidationError[], mappedErrors: ValidationElement[] = [], parent?: string): ValidationElement[] {
    errors.forEach((err) => {
      if (err.children && err.children.length) {
        this.mapValidationError(err.children, mappedErrors, err.property)
      } else {
        const property = parent ? `${parent}.${err.property}` : err.property
        mappedErrors.push({ constraints: err.constraints, property })
      }
    })

    return mappedErrors
  }
}
