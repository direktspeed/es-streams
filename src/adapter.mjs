import { tryEvent } from './core.mjs'
import { pushReturn } from './prelude.mjs'

//sinks are Observers
export const createAdapter = () => {
    const sinks = [];
    return [a => broadcast(sinks, a), new FanoutPortStream(sinks)];
};

export const broadcast = (sinks, a) => sinks.map(({ sink, scheduler }) => tryEvent(scheduler.currentTime(), a, sink));

export class FanoutPortStream {
    constructor(sinks=[]) {
        this.sinks = sinks;
    }
    run(sink, scheduler) {
        //this.sinks[this.sinks.push({ sink, scheduler })];
        return new RemovePortDisposable(pushReturn(this.sinks, { sink, scheduler }), this.sinks);
    }
}

export class RemovePortDisposable {
    constructor(sink, sinks) {
        this.sink = sink;
        this.sinks = sinks;
    }
    dispose() {
        const i = this.sinks.indexOf(this.sink);
        if (i >= 0) {
            this.sinks.splice(i, 1);
        }
    }
}

export class CreateAdapter extends FanoutPortStream {
    emit(x) {
        broadcast(this.sinks, x);
    }
}