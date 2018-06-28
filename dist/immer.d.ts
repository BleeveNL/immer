/**
 * Immer takes a state, and runs a function against it.
 * That function can freely mutate the state, as it will create copies-on-write.
 * This means that the original state will stay unchanged, and once the function finishes, the modified state is returned.
 *
 * If the first argument is a function, this is interpreted as the recipe, and will create a curried function that will execute the recipe
 * any time it is called with the current state.
 *
 * @param currentState - the state to start with
 * @param recipe - function that receives a proxy of the current state as first argument and which can be freely modified
 * @param initialState - if a curried function is created and this argument was given, it will be used as fallback if the curried function is called with a state of undefined
 * @returns The next state: a new state, or the current state if nothing was modified
 */
export default function<S = any>(
    currentState: S,
    recipe: (this: S, draftState: S) => void | S
): S

// curried invocations with default initial state
// 0 additional arguments
export default function<S = any>(
    recipe: (this: S, draftState: S) => void | S,
    initialState: S
): (currentState: S | undefined) => S
// 1 additional argument of type A
export default function<S = any, A = any>(
    recipe: (this: S, draftState: S, a: A) => void | S,
    initialState: S
): (currentState: S | undefined, a: A) => S
// 2 additional arguments of types A and B
export default function<S = any, A = any, B = any>(
    recipe: (this: S, draftState: S, a: A, b: B) => void | S,
    initialState: S
): (currentState: S | undefined, a: A, b: B) => S
// 3 additional arguments of types A, B and C
export default function<S = any, A = any, B = any, C = any>(
    recipe: (this: S, draftState: S, a: A, b: B, c: C) => void | S,
    initialState: S
): (currentState: S | undefined, a: A, b: B, c: C) => S
// any number of additional arguments, but with loss of type safety
// this may be alleviated if "variadic kinds" makes it into Typescript:
// https://github.com/Microsoft/TypeScript/issues/5453
export default function<S = any>(
    recipe: (this: S, draftState: S, ...extraArgs: any[]) => void | S,
    initialState: S
): (currentState: S | undefined, ...extraArgs: any[]) => S

// curried invocations without default initial state
// 0 additional arguments
export default function<S = any>(
    recipe: (this: S, draftState: S) => void | S
): (currentState: S) => S
// 1 additional argument of type A
export default function<S = any, A = any>(
    recipe: (this: S, draftState: S, a: A) => void | S
): (currentState: S, a: A) => S
// 2 additional arguments of types A and B
export default function<S = any, A = any, B = any>(
    recipe: (this: S, draftState: S, a: A, b: B) => void | S
): (currentState: S, a: A, b: B) => S
// 3 additional arguments of types A, B and C
export default function<S = any, A = any, B = any, C = any>(
    recipe: (this: S, draftState: S, a: A, b: B, c: C) => void | S
): (currentState: S, a: A, b: B, c: C) => S
// any number of additional arguments, but with loss of type safety
// this may be alleviated if "variadic kinds" makes it into Typescript:
// https://github.com/Microsoft/TypeScript/issues/5453
export default function<S = any>(
    recipe: (this: S, draftState: S, ...extraArgs: any[]) => void | S
): (currentState: S, ...extraArgs: any[]) => S
/**
 * Automatically freezes any state trees generated by immer.
 * This protects against accidental modifications of the state tree outside of an immer function.
 * This comes with a performance impact, so it is recommended to disable this option in production.
 * It is by default enabled.
 */
export function setAutoFreeze(autoFreeze: boolean): void

/**
 * Manually override whether proxies should be used.
 * By default done by using feature detection
 */
export function setUseProxies(useProxies: boolean): void