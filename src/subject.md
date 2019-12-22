# stealify-subject

**note**
Deprecated in favor of stealify/stream/adapter.mjs

Subjects for 
- [`stealify/stream/core`](https://github.com/stealify/stealify)
- [`@most/core`](https://github.com/mostjs/core)


## API Documentation

#### create\<A\>(): Subject\<A, A\>
#### create\<A, B\>(f: (stream: Stream\<A\>) =\> Stream\<B\>): Subject\<A, B\>

Returns an tuple containing a `AttachSink` and a `Stream`. `AttachSink` can be
used to imperatively control the events flowing through the `Stream` or
declaratively using `attach`. Optionally, a function can be applied to the Stream, 
and the return value of that function will be returned as the second tuple value.

<details>
  <summary>See an example</summary>
  
```typescript
import { create, event } from 'stealify/stream/subject.mjs'
import { runEffects, propagateEventTask, tap } from 'stealify/stream/core.mjs'
import { newDefaultScheduler, currentTime } from 'stealify/stream/scheduler.mjs'

// Create a new `Scheduler` for use in our application.
// Usually, you will want to only have one Scheduler, and it should be shared 
// across your application
const scheduler = newDefaultScheduler()

// Create our sink and our stream.
// NOTE: stream is the resulting value of tap(console.log, stream).
const [ sink, stream ] = createSubject(tap<number>(console.log))

// Pushes events into our stream.
const next = (n: number) => event(currentTime(scheduler), n, sink)

// Activate our stream.
runEffects(stream, scheduler)

// Simulate asynchronous data fetching,
// and then push values into our stream.
Promise.resolve([ 1, 2, 3 ])
 .then(data => data.forEach(next))
```

</details>

#### attach\<A\>(attachSink: AttachSink\<A\>, stream: Stream\<A\>): Stream\<A\>

Create circular dependencies with additional logic to help avoid memory leaks.

WARNING: There isn't any logic for breaking infinite loops.

<details>
  <summary>See an example</summary>

```typescript
import { Stream } from '@most/types'
import { create, attach } from 'most-subject'
import { periodic, scan, take, runEffects, tap } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'

// Create a new Scheduler for use in our application.
// Usually, you will want to only have one Scheduler, and it should be shared 
// across your application.
const scheduler = newDefaultScheduler()

const [ sink, stream ] = create<number>()

// Listen to our stream.
// It will log 1, 2, and 3.
runEffects(tap(console.log, take(3, stream)), scheduler)

const origin = scan(x => x + 1, 0, periodic(100))

attach(origin)
```

</details>

#### event\<A\>(time: Time, value: A, sink: Sink\<A\>): void

A curried function for calling `Sink.event(time, value)`.

#### error(time: Time, error: Error, sink: Sink\<any\>): void

A curried function for calling `Sink.error(time, error)`.

#### end(time: Time, sink: Sink\<any\>): void

A curried function for calling `Sink.end(time)`.

#### Subject\<A, B\>

```typescript
import { Sink, Stream } from '@most/types'

export type Subject<A, B> = [AttachSink<A>, Stream<B>]
```

#### AttachSink\<A\>

```typescript
import { Sink } from '@most/types'

export AttachSink<A> extends Sink<A> {
  attach(stream: Stream<A>): Stream<A>
}
```