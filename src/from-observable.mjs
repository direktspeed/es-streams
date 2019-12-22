/** @license Apache-2.0 License (c) copyright 2010-2020 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Frank Lemanschik <frank@dspeed.eu> */
import observableSymbol from "./symbol-observable.mjs";
import { currentTime } from "./scheduler.mjs";
import { tryEvent } from './core.mjs'

const getObservable = o => {
  if (o) {
    const method = o[observableSymbol];
    if (typeof method === "function") {
      const obs = method.call(o);
      if (!(obs && typeof obs.subscribe === "function")) {
        throw new TypeError("invalid observable " + obs);
      }
      return obs;
    }
  }
};

class Observable {
  constructor(observable) {
    this.observable = observable;
  }

  run(sink, scheduler) {
    const send = e => tryEvent(currentTime(scheduler), e, sink);

    const subscription = getObservable(this.observable).subscribe({
      next: send,
      error: e => sink.error(currentTime(scheduler), e),
      complete: () => sink.end(currentTime(scheduler))
    });

    const dispose = () => subscription.unsubscribe();

    return { dispose };
  }
}

export const fromObservable = observable => new Observable(observable);