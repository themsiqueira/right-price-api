export default class MethodNotImplementedException extends Error {
  constructor(methodName: string) {
    super(`The ${methodName} method not implemented.`)
  }
}
