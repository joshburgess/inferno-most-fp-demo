import {
  drain,
  fromEvent,
  map,
  scan,
  skipRepeats,
  switchLatest,
  take,
} from 'most'
import { compose, curry } from 'ramda'

/******************************************************************************
  Custom stream operators made with Most.js built-ins & functional composition
*******************************************************************************/

// A variation of scan which immediately starts consuming events
const drainScan = compose(drain, scan)

// A variation of scan which filters out adjacent repeated events
// Note that === is used to identify duplicate items
const distinctScan = compose(skipRepeats, scan)

// A commonly used operator from RxJS which is not available in Most.js
// Map, wait for inner stream, then switch to emitting values from inner stream
const switchMap = compose(switchLatest, map)

// Creates a new stream emitting only the first event from the previous stream
const first = curry(take)(1)

// Creates a new stream which emits only once the DOM has finished loading
const ready = compose(first, () => fromEvent('DOMContentLoaded', window))

export {
  drainScan,
  distinctScan,
  first,
  switchMap,
  ready,
}
