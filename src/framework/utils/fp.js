/******************************************************************************
  Writing our own functional programming utilities
*******************************************************************************/

const curry2 = f => {
  return function g (a, b) {
    return ({
      0: g,
      1: b => f(a, b),
    })[arguments.length] || f(a, b)
  }
}

const curry3 = f => {
  return function g (a, b, c) {
    return ({
      0: g,
      1: curry2((b, c) => f(a, b, c)),
      2: c => f(a, b, c),
    })[arguments.length] || f(a, b, c)
  }
}

const curry4 = f => {
  return function g (a, b, c, d) {
    return ({
      0: g,
      1: curry3((b, c, d) => f(a, b, c, d)),
      2: curry2((c, d) => f(a, b, c, d)),
      3: d => f(a, b, c, d),
    })[arguments.length] || f(a, b, c, d)
  }
}

const compose2 = (f, g) => x => f(g(x))
const compose3 = (f, g, h) => x => f(compose2(g, h)(x))
const compose4 = (f, g, h, i) => x => f(compose3(g, h, i)(x))

const pipe2 = (f, g) => x => compose2(g, f)(x)
const pipe3 = (f, g, h) => x => compose3(h, g, f)(x)
const pipe4 = (f, g, h, i) => x => compose4(i, h, g, f)(x)

const identity = x => x
const apply = (f, x) => f(x)

const add2 = curry2((a, b) => Number(a) + Number(b))
const inc = add2(1)
const dec = add2(-1)

const mult2 = curry2((a, b) => Number(a) * Number(b))
const double = x => mult(x)(2)

export {
  curry2,
  curry3,
  curry4,
  compose2,
  compose3,
  compose4,
  pipe2,
  pipe3,
  pipe4,
  identity,
  apply,
  add,
  inc,
  dec,
}
