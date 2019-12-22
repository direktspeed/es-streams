/** @license Apache-2.0 License (c) copyright 2010-2020 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @author Frank Lemanschik <frank@dspeed.eu> */
/**
 * This file exports some standard DomEvents as Streams
 * It is using the fromDomEvent Operator 
 */
import { currentTime } from './scheduler.mjs'
import { tryEvent, fromDomEvent } from './core.mjs'

export const blur = (node, capture) => fromDomEvent('blur', node, capture)
export const focus = (node, capture) => fromDomEvent('focus', node, capture)
export const focusin = (node, capture) => fromDomEvent('focusin', node, capture)
export const focusout = (node, capture) => fromDomEvent('focusout', node, capture)
export const click = (node, capture) => fromDomEvent('click', node, capture)
export const dblclick = (node, capture) => fromDomEvent('dblclick', node, capture)
export const mousedown = (node, capture) => fromDomEvent('mousedown', node, capture)
export const mouseup = (node, capture) => fromDomEvent('mouseup', node, capture)
export const mousemove = (node, capture) => fromDomEvent('mousemove', node, capture)
export const mouseover = (node, capture) => fromDomEvent('mouseover', node, capture)
export const mouseenter = (node, capture) => fromDomEvent('mouseenter', node, capture)
export const mouseout = (node, capture) => fromDomEvent('mouseout', node, capture)
export const mouseleave = (node, capture) => fromDomEvent('mouseleave', node, capture)
export const change = (node, capture) => fromDomEvent('change', node, capture)
export const select = (node, capture) => fromDomEvent('select', node, capture)
export const submit = (node, capture) => fromDomEvent('submit', node, capture)
export const keydown = (node, capture) => fromDomEvent('keydown', node, capture)
export const keypress = (node, capture) => fromDomEvent('keypress', node, capture)
export const keyup = (node, capture) => fromDomEvent('keyup', node, capture)
export const input = (node, capture) => fromDomEvent('input', node, capture)
export const contextmenu = (node, capture) => fromDomEvent('contextmenu', node, capture)
export const resize = (node, capture) => fromDomEvent('resize', node, capture)
export const scroll = (node, capture) => fromDomEvent('scroll', node, capture)
export const error = (node, capture) => fromDomEvent('error', node, capture)

export const hashchange = (node, capture = false) => fromDomEvent('hashchange', node, capture)
export const popstate = (node, capture = false) => fromDomEvent('popstate', node, capture)
export const load = (node, capture = false) => fromDomEvent('load', node, capture)
export const unload = (node, capture = false) => fromDomEvent('unload', node, capture)

export const pointerdown = (node, capture = false) => fromDomEvent('pointerdown', node, capture)
export const pointerup = (node, capture = false) => fromDomEvent('pointerup', node, capture)
export const pointermove = (node, capture = false) => fromDomEvent('pointermove', node, capture)
export const pointerover = (node, capture = false) => fromDomEvent('pointerover', node, capture)
export const pointerenter = (node, capture = false) => fromDomEvent('pointerenter', node, capture)
export const pointerout = (node, capture = false) => fromDomEvent('pointerout', node, capture)
export const pointerleave = (node, capture = false) => fromDomEvent('pointerleave', node, capture)

export const touchstart = (node, capture = false) => fromDomEvent('touchstart', node, capture)
export const touchend = (node, capture = false) => fromDomEvent('touchend', node, capture)
export const touchmove = (node, capture = false) => fromDomEvent('touchmove', node, capture)
export const touchcancel = (node, capture = false) => fromDomEvent('touchcancel', node, capture)