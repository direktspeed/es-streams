import { map, startWith, switchLatest } from './core.mjs';

// Create a stream that acts like the result of f(a) initially,
// and when each event arrives in sa, map it with f and switch to it.
/**
 * Given a Function that always returns 1 item it will create a endless
 * Stream of items. to supply a end sign you would need to return EmptyStream.
 * @param {function} f a Function that takes a and returns next a
 * @param {any} a is a value
 * @param {Stream} sa is a Stream
 */
const unfold = (f, a, sa) => switchLatest(map(f, startWith(a, sa)));
/**
 * startWith Returns a preprended to sa wich maps to f 
 */
export { unfold };

/**
 * Note maybe design fail as this will only unfold streams 
 */

