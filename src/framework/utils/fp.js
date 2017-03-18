/******************************************************************************
  Writing our own functional programming utilities
*******************************************************************************/

/* eslint-disable fp/no-arguments */
/* eslint-disable fp/no-this */
/* eslint-disable fp/no-rest-parameters */

// NOOP
const identity = x => x

// curry functions for when the function arity is known
function curry4 (f) {
  return function g (a, b) {
    return ({
      0: g,
      1: b => f(a, b),
    })[arguments.length] || f(a, b)
  }
}

function curry4 (f) {
  return function g (a, b, c) {
    return ({
      0: g,
      1: curry2((b, c) => f(a, b, c)),
      2: c => f(a, b, c),
    })[arguments.length] || f(a, b, c)
  }
}

function curry4 (f) {
  return function g (a, b, c, d) {
    return ({
      0: g,
      1: curry3((b, c, d) => f(a, b, c, d)),
      2: curry2((c, d) => f(a, b, c, d)),
      3: d => f(a, b, c, d),
    })[arguments.length] || f(a, b, c, d)
  }
}

// curry function for when the function arity is unknown
function curry (f) {
  return function g (...args) {
    return args.length >= f.length
      ? f.call(this, ...args)
      : (...rest) => {
        return g.call(this, ...args, ...rest)
      }
  }
}

// simple application of a function to a single argument
const apply1 = (f, x) => f(x)

// application of a function to a variable amount of arguments
// const apply = (f, ...args) => f(...args)

// partial application of a function to to a single argument
const partial1 = (f, x) => y => f(x, y)

// partial application of a function to a variable amount of arguments
const partial = (f, ...args) => (...rest) => f(...args, ...rest)

function compose2 (f, g) {
  return function (x) {
    return f(g(x))
  }
}

// const compose2 = (f, g) => x => f(g(x))
const compose3 = (f, g, h) => x => f(compose2(g, h)(x))
const compose4 = (f, g, h, i) => x => f(compose3(g, h, i)(x))

const pipe2 = (f, g) => x => compose2(g, f)(x)
const pipe3 = (f, g, h) => x => compose3(h, g, f)(x)
const pipe4 = (f, g, h, i) => x => compose4(i, h, g, f)(x)
//
const add2 = curry2((a, b) => Number(a) + Number(b))
const inc = add2(1)
const dec = add2(-1)

const mult2 = curry2((a, b) => Number(a) * Number(b))
const double = x => (mult2(x)(2))

function getArityFunction (n, fn) {
  return ({
    0: function () { return fn.apply(this, arguments) },
    1: function (a0) { return fn.apply(this, arguments) },
    2: function (a0, a1) { return fn.apply(this, arguments) },
    3: function (a0, a1, a2) { return fn.apply(this, arguments) },
    4: function (a0, a1, a2, a3) { return fn.apply(this, arguments) },
    5: function (a0, a1, a2, a3, a4) { return fn.apply(this, arguments) },
    6: function (a0, a1, a2, a3, a4, a5) { return fn.apply(this, arguments) },
    7: function (a0, a1, a2, a3, a4, a5, a6) { return fn.apply(this, arguments) },
    8: function (a0, a1, a2, a3, a4, a5, a6, a7) { return fn.apply(this, arguments) },
    9: function (a0, a1, a2, a3, a4, a5, a6, a7, a8) { return fn.apply(this, arguments) },
    10: function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) { return fn.apply(this, arguments) },
  })[n] // || throw new Error('First argument to getArityFunction must be a non-negative integer no greater than ten')
}

export {
  identity,
  curry2,
  curry3,
  curry4,
  curry,
  apply1,
  apply,
  partial,
  compose2,
  compose3,
  compose4,
  pipe2,
  pipe3,
  pipe4,
  add2,
  inc,
  dec,
  mult2,
  double,
}
