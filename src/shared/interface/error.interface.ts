// NOTE: if you update this interface adding a required field, please update the error.service isStandardError type guard
export interface StandardError {
  type: string
  errors: ValidationElement[] | string[]
  errorCode?: string
}

export interface ValidationElement {
  property?: string
  constraints?: {
    [type: string]: string
  }
}
