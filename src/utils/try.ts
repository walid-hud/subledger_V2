export type Result<T, E = Error> = [T, null] | [null, E];

/**
 * @description 
 * A utility function to wrap promises and synchronous functions in a try-catch block
 I don't like using try-catch blocks everywhere, so this function allows me to handle errors in a more functional way.
 It returns a tuple where the first element is the result of the promise or function, 
 and the second element is the error if there was one.
 This way, I can easily check if there was an error without having to use try-catch blocks everywhere.
 you can find this pattern in other languages like Go and Rust.
 */
export async function wrap<T, E = Error>(
  promise: Promise<T>
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}

export function wrapSync<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    const data = fn();
    return [data, null];
  } catch (error) {
    return [null, error as E];
  }
}
