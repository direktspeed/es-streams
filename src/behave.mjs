import { snapshot, map, startWith } from './core.mjs'

//

const snapshotTime = (stream) =>
  new SnapshotTime(stream)

class SnapshotTime {
  constructor (source) {
    this.source = source
  }

  run (sink, scheduler) {
    return this.source.run(new SnapshotTimeSink(sink), scheduler)
  }
}

class SnapshotTimeSink {
  constructor (sink) {
    this.sink = sink
  }

  event (t, a) {
    this.sink.event(t, [t, a])
  }

  error (t, e) {
    this.sink.error(t, e)
  }

  end (t) {
    this.sink.end(t)
  }
}

//

const snapshot$1 = (b, s) =>
  b(s)

const sample = (b, s) =>
  map(ab => ab[0], snapshot$1(b, s))

const always = (a) =>
  (sb) =>
    map(b => [a, b], sb)

const fromTime = (f) =>
  map$1(f, snapshotTime)

const step = (a, sa) =>
  (sb) =>
    snapshot((a, b) => [a, b], startWith(a, sa), sb)

const map$1 = (f, ba) =>
  (sc) =>
    map(([a, c]) => [f(a), c], snapshot$1(ba, sc))

const apply = (bf, ba) =>
  liftA2((f, a) => f(a), bf, ba)

const liftA2 = (f, ba, bb) =>
  (sd) =>
    map(([a, [b, d]]) => [f(a, b), d], snapshot$1(ba, snapshot$1(bb, sd)))

export { snapshot$1 as snapshot, sample, snapshotTime as time, always, fromTime, step, map$1 as map, apply, liftA2 }
// # sourceMappingURL=index.es.js.map