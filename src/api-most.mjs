/**
 * Most 1.0 Compatible Api Implamentation 
 * returns Stream[methods*] from './streams'
 */

import * as streamMethods from './streams.mjs'

 /**
 * Method Missing.
 *
 * Main application file.
 * @author Jarrad Seers <jarrad@seers.me>
 * @created 29/03/2017 NZDT
 */

/**
 * Method Missing Error.
 *
 * @class MethodMissingError
 * @extends {Error}
 */

class MethodMissingError extends Error {

    /**
     * Creates an instance of MethodMissingError.
     * @param {any} msg
     *
     * @memberOf MethodMissingError
     */
  
    constructor(msg) {
      super(msg);
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  
  }

/**
 * Main proxy handler.
 * Method Missing.
 *
 * @param {object} Class
 * @param {string} method
 */

function proxy(Class, method) {

  return new Proxy(Class, {
    get(obj, prop) {
      if (Reflect.has(obj, prop)) {
        return Reflect.get(obj, prop);
      } else if (typeof method === 'function') {
        return function methodMissing(...args) {
          method.call(this, prop, args);
        };
      } else if (Reflect.has(obj, method)) {
        return function methodMissing(...args) {
          obj[method].call(this, prop, args);
        };
      }
      const err = `${method}, use method '__call(method, args)' in your class to catch.`;
      throw new MethodMissingError(err);
    },

  });
}

/**
 * MethodMissing Class
 *
 * @class MethodMissing
 */

class MethodMissing {

  /**
   * Creates an instance of MethodMissing.
   * @param {any} method
   *
   * @memberOf MethodMissing
   */

  constructor(method) {
    return proxy(this, method || '__call');
  }

  /**
   * Static method handler.
   *
   * @static
   * @param {any} that
   * @param {any} method
   * @returns
   *
   * @memberOf MethodMissing
   */

  static static(that, method) {
    return proxy(that, method || '__call');
  }

}


 // Looks like StreamImpl from streams.mjs
export class Stream extends MethodMissing {
    constructor(source) {
        this.source = source
    }
    __call(methodName, args) {
        return streamMethods[methodName](...args,this.source)
    }
    run(sink, scheduler) {
        return this.source.run(sink, scheduler)
    }
}