// @flow
import { fromDomEvent, newDefaultScheduler,combine, map, runEffects, startWith, tap } from '../../src/core.mjs'



const fail = (s) => { throw new Error(s) }
export const qs = (s, el) => el.querySelector(s) || fail(`${s} not found`)

// Display the result of adding two inputs.
// The result is reactive and updates whenever *either* input changes.
const add = (x, y) => x + y
const toNumber = e => Number(e.target.value || 0)
const renderResult = resultNode => result => { resultNode.textContent = result }
const input = node => fromDomEvent('input', node)

const xInput = qs('input.x', document)
const yInput = qs('input.y', document)
const resultNode = qs('.result', document)

// x represents the current value of xInput
const x = startWith(0, map(toNumber, input(xInput)))

// y represents the current value of yInput
const y = startWith(0, map(toNumber, input(yInput)))

// result is the live current value of adding x and y
const result = combine(add, x, y)

// render the result
const outputEffects = tap(renderResult(resultNode), result)

// Run the app
runEffects(outputEffects, newDefaultScheduler())
