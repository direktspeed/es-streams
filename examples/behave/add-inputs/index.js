import { always, map, liftA2, sample } from 'stealify/behave.mjs'
import { input } from 'stealify/dom-event.mjs'
import { newDefaultScheduler } from 'stealify/scheduler.mjs'
import { tap, runEffects } from 'stealify/core.mjs'

// inputById :: String -> HTMLInputElement
// Type-safe helper to get an HTMLInputElement by id
const byId = id => document.getElementById(id) || throw new Error(`#${id} not found`)

// numberValue :: HTMLInputElement -> Behavior Number
const numberValue = input => map(input => Number(input.value), always(input))

// add :: Number -> Number -> Number
const add = (x, y) => x + y

// x :: Behavior Number
// x is the value of the #x input at all times
// note that x is not a change event, it's the value over time
const x = numberValue(byId('x'))

// y :: Behavior Number
// Similarly, y is the value of the #y input at all times
const y = numberValue(byId('y'))

// z :: Behavior Number
// z is x + y at all times
const z = liftA2(add, x, y)

// inputEvents :: Stream InputEvent
// All the input events that will occur in container
const inputEvents = input(byId('container'))

// render :: HTMLInputElement -> Number -> void
const render = el => result => el.value = String(result)

// updateFrom :: Behavior Number -> Stream void
// Sample z at all the instants input events occur in container
// and render the sampled value into the `#z` input element's value
const updates = tap(render(byId('z')), sample(z, inputEvents))

// Run the app
runEffects(updates, newDefaultScheduler())
