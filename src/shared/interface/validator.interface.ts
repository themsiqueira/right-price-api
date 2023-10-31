export interface ValidatorInterface {
  validate(value: unknown): Promise<void>
}
