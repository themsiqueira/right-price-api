export function has<P extends PropertyKey>(target: object, property: P): target is { [K in P]: unknown } {
  return !!target && property in target
}

export function isObjectOfStringsBooleansNumbers(obj: unknown): obj is Record<string, string | boolean | number> {
  return (
    obj &&
    typeof obj === 'object' &&
    !Array.isArray(obj) &&
    Object.values(obj).every((value) => ['string', 'boolean', 'number'].includes(typeof value))
  )
}
