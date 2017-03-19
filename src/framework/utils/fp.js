/******************************************************************************
  Writing our own functional programming utilities
*******************************************************************************/

/* eslint-disable fp/no-arguments */
/* eslint-disable fp/no-this */
/* eslint-disable fp/no-rest-parameters */

// NOOP
const identity = x => x

// simple application of a function to a single argument
const apply1 = (f, x) => f(x)

// application of a function to a variable amount of arguments
const apply = (f, ...args) => f(...args)

// simple partial application of a function to a single argument
const partial1 = (f, x) => y => f(x, y)

// partial application of a function to a variable amount of arguments
const partial = (f, ...args) => (...rest) => f(...args, ...rest)

// curry functions for when the function arity is known
const curry2 = f => function g (a, b) {
  return ({
    0: g,
    1: b => f(a, b),
  })[arguments.length] || f(a, b)
}

const curry3 = f => function g (a, b, c) {
  return ({
    0: g,
    1: curry2((b, c) => f(a, b, c)),
    2: c => f(a, b, c),
  })[arguments.length] || f(a, b, c)
}

const curry4 = f => function g (a, b, c, d) {
  return ({
    0: g,
    1: curry3((b, c, d) => f(a, b, c, d)),
    2: curry2((c, d) => f(a, b, c, d)),
    3: d => f(a, b, c, d),
  })[arguments.length] || f(a, b, c, d)
}

// curry function for when the function arity is unknown
const curry = f => function g (...args) {
  return args.length >= f.length
    ? f(...args)
    : (...rest) => g(...args, ...rest)
}

// compose functions for when the function arity is known
const compose2 = (f, g) => (...args) => f(g(...args))
const compose3 = (f, g, h) => (...args) => f(compose2(g, h)(...args))
const compose4 = (f, g, h, i) => (...args) => f(compose3(g, h, i)(...args))

// compose function for when the function arity is unknown
const compose = (...fs) => [...fs].reduce(compose2)

// pipe functions for when the function arity is known
const pipe2 = (f, g) => (...args) => compose2(g, f)(...args)
const pipe3 = (f, g, h) => (...args) => compose3(h, g, f)(...args)
const pipe4 = (f, g, h, i) => (...args) => compose4(i, h, g, f)(...args)

// pipe function for when the function arity is unknown
const pipe = (...fs) => [...fs].reduce(pipe2)

// curried add functions for when the function arity is known
const add2 = curry2((a, b) => Number(a) + Number(b))
const add3 = curry3((a, b, c) => add2(a, b) + Number(c))
const add4 = curry4((a, b, c, d) => add3(a, b, c) + Number(d))

// add function for when the function arity is unknown
const add = (...args) => [...args].reduce(add2)

// increment & decrement functions
const inc = add2(1)
const dec = add2(-1)

// curried add functions for when the function arity is known
const mult2 = curry2((a, b) => Number(a) * Number(b))
const mult3 = curry3((a, b, c) => mult2(a, b) * Number(c))
const mult4 = curry4((a, b, c, d) => mult3(a, b, c) * Number(d))

// multiply function for when the function arity is unknown
const mult = (...args) => [...args].reduce(mult2)

// double, triple, & square functions
const doub = mult2(2)
const trip = mult2(3)
const sq = x => mult2(x, x)

// negate function (additive inversion)
const neg = mult2(-1)

// curried subtract functions for when the function arity is known
const sub2 = curry2((a, b) => add2(a, neg(b)))
const sub3 = curry3((a, b, c) => add3(a, neg(b), neg(c)))
const sub4 = curry4((a, b, c, d) => add4(a, neg(b), neg(c), neg(d)))

// subtract function for when the function arity is unknown
const sub = (...args) => [...args].reduce(sub2)

// reciprocal function  (multiplicative inversion)
const recip = x => (1 / Number(x))

// curried divide functions for when the function arity is known
const div2 = curry2((a, b) => mult2(a, recip(b)))
const div3 = curry3((a, b, c) => mult3(a, recip(b), recip(c)))
const div4 = curry4((a, b, c, d) => mult4(a, recip(b), recip(c), recip(d)))

// divide function for when the function arity is unknown
const div = (...args) => [...args].reduce(div2)

// power function for when the function arity is unknown
const pow = (...args) => [...args].reduce(Math.pow)

export {
  identity,
  apply1,
  apply,
  partial1,
  partial,
  curry2,
  curry3,
  curry4,
  curry,
  compose2,
  compose3,
  compose4,
  compose,
  pipe2,
  pipe3,
  pipe4,
  pipe,
  add2,
  add3,
  add4,
  add,
  inc,
  dec,
  mult2,
  mult3,
  mult4,
  mult,
  doub,
  trip,
  sq,
  neg,
  sub2,
  sub3,
  sub4,
  sub,
  recip,
  div2,
  div3,
  div4,
  div,
  pow,
}
