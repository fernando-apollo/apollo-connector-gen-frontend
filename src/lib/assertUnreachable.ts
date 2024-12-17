// @see https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking
/**
 * Use this utility to ensure exhaustive conditions when working with locally defined types.
 * If the type is from graphql, consider using assertUnreachableOrReturnDefault
 * instead to prevent throwing errors in prod
 */
export function assertUnreachable(x: never): never {
  throw new Error(`Didn't expect to get here ${JSON.stringify(x)}`);
}
