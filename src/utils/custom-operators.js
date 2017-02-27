import {
  drain,
  map,
  scan,
  skipRepeats,
  switchLatest,
} from 'most'
import { compose } from 'ramda'
// import { compose, curry} from 'lodash/fp'

// Custom stream operators made with Most.js built-ins & functional composition
export const drainScan = compose(drain, scan)
export const distinctScan = compose(skipRepeats, scan)
export const switchMap = compose(switchLatest, map)
