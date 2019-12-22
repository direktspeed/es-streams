import { scheduleAsap } from './scheduler.mjs';
export class ArrayTask {
    constructor(array, sink) {
        this.array = array;
        this.sink = sink;
        this.active = true;
        this.error = sink.error
    }
    run(time) {
        const { array, sink } = this;
        const { length } = array;
        for (let i = 0; i < length && this.active; i++) {
            sink.event(time, array[i]);
        }
        this.active && sink.end(time);
    }
    dispose() {
        this.active = false;
    }
}
// fromArray :: e[] -> Stream e
export function fromArray(a) {
    return new FromArray(a);
}
class FromArray {
    constructor(a) {
        this.a = a;
    }
    run(sink, scheduler) {
        return scheduleAsap(new ArrayTask(this.a, sink), scheduler);
    }
}
