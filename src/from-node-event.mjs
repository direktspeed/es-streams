/** @license MIT License (c) copyright 2018 original author or authors */
/** @author Sergey Samokhov */
import { currentTime } from './scheduler.mjs';
import { tryEvent } from './core.mjs';
// fromEvent('connected',socket)
// fromEvent :: (Emitter emt, Event e) => String -> emt -> Stream e
export const fromEvent = (event, emitter) => FromEvent(event, emitter, 'addListener');
export const fromEventPrepended = (event, emitter) => FromEvent(event, emitter, 'prependListener');

//Method to use
export function FromEvent(event, emitter, method) {
    function run(sink, scheduler) {
        function send(e) {
            tryEvent(currentTime(scheduler), e, sink);
        }
        emitter[method](event, send);
        return ListenerDisposable(emitter, event, send);
    }
    return { run };
}
export function ListenerDisposable(emitter, event, send) {
    return {
        dispose: () => {
            emitter.removeListener(event, send);
        }
    };
}

//# sourceMappingURL=index.js.map