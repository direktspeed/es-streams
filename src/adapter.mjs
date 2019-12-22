import { tryEvent } from './core.mjs'

//sinks are Observers
export const createAdapter = () => {
    const sinks = [];
    return [a => broadcast(sinks, a), new FanoutPortStream(sinks)];
};

export const broadcast = (sinks, a) => sinks.slice().forEach(({ sink, scheduler }) => tryEvent(scheduler.currentTime(), a, sink));

export class FanoutPortStream {
    constructor(sinks=[]) {
        this.sinks = sinks;
    }
    run(sink, scheduler) {
        const s = { sink, scheduler };
        this.sinks.push(s);
        return new RemovePortDisposable(s, this.sinks);
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

export class CreateSteamWithEmit extends FanoutPortStream {
    constructor(sinks=[]) {
        super(sinks);
    }
    emit(x) {
        broadcast(this.sinks, x);
    }
}