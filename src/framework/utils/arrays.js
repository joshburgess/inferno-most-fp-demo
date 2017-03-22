import curry2 from './fp'

/******************************************************************************
  Writing our own functions to operate on arrays
*******************************************************************************/

/* eslint-disable fp/no-arguments */
/* eslint-disable fp/no-this */
/* eslint-disable fp/no-rest-parameters */
/* eslint-disable fp/no-throw */
/* eslint-disable fp/no-let */
/* eslint-disable fp/no-loops */
/* eslint-disable fp/no-nil */
/* eslint-disable fp/no-mutation */
/* eslint-disable fp/no-mutating-methods */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable better/no-ifs */


// workhorse array functions implemented by wrapping & currying JavaScript's
// native array methods in order to get an API supporting functional composition
// const map = curry2((f, arr) => arr.map(f))
// const filter = curry2((f, arr) => arr.filter(f))
// const reduce = curry2((f, arr) => arr.reduce(f))

// implementing a map function from scratch
const map = curry2((f, arr) => {
  const len = arr.length
  const result = Array(len)

  for (let i = 0; i < len; ++i) {
    result[i] = f(arr[i])
  }

  return result
})

// implementing a filter function from scratch
const filter = curry2((pred, arr) => {
  const len = arr.length
  const result = []

  for (let i = 0; i < len; ++i) {
    const val = arr[i]

    if (pred(val)) {
      result.push(val)
    }
  }

  return result
})

// fold is based on Haskell's foldl, which is similar to JavaScript's native
// reduce function, but differs in that the the seed argument is not optional
const fold = curry3((f, seed, arr) => {
  if (typeof seed === 'undefined' || seed === null) {
    throw Error(`fold's seed argument must not be null or undefined`)
  }

  let acc = seed

  for (let i = 0; i < arr.length; i++) {
    acc = f(acc, arr[i])
  }

  return acc
})

// fold1 is based on Haskell's foldl1, which is a variant of foldl that has no
// starting value argument, and thus must be applied to non-empty lists.
// This also means that the accumulated type will always be the same as that of
// the items in the provided list, whereas foldl1 can accumulate into a new type
const fold1 = curry2((f, arr) => {
  if (!arr.length) {
    throw Error('fold1 must only be applied to non-empty lists')
  }

  let acc

  for (let i = 0; i < arr.length; i++) {
    acc = !acc ? arr[i] : f(acc, arr[i])
  }

  return acc
})

// reduce function which uses either fold1 or fold under the hood
// This is a variadic function and thus is problematic for currying, but by
// making both it and the fold & fold1 functions available, we can support a
// generic reduce function similar to the native JS array method, as well as
// specific curried "reduce" (fold) functions for those who want them
function reduce (f, seed, arr) {
  const args = arguments
  const len = args.length

  if (len < 2) {
    throw Error('reduce is variadic and requires either 2 or 3 arguments')
  }

  if (len === 2) {
    return fold1(args[0], args[1])
  }

  return fold(args[0], args[1], args[2])
}

const reduceR = curry2((f, arr) => arr.reduceRight(f))

const head = arr => arr[0]
const tail = arr => arr[arr.length - 1]

const sliceFrom = curry2((start, arr) => arr.slice(start))
const sliceFromTo = curry3((start, end, arr) => arr.slice(start, end))

const withoutHead = sliceFrom(1)
const withoutTail = sliceFromTo(0, -1)

const concat = (...arrs) => head(arrs).concat(withoutHead(arrs))

const copy = map(identity)
const reverse = arr => [...arr].reverse()

const sortBy = curry2((f, arr) => [...arr].sort(f))
const sortByAlpha = arr => [...arr].sort()
const sortByAlphaDesc = arr => reverse(sortByAlpha(arr))
const sortByNum = sortBy((a, b) => a - b)
const sortByNumDesc = sortBy((a, b) => b - a)
const sortByLen = sortBy((a, b) => a.length - b.length)
const sortByLenDesc = sortBy((a, b) => b.length - a.length)