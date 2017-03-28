# inferno-most-fp-demo
A demo showing how to build a React+Redux-like architecture from scratch using Inferno, Most.js, reactive programmning, and various functional programming tools & techniques


## Instructions:

```
git clone https://github.com/joshburgess/inferno-most-fp-demo
cd inferno-most-fp-demo
yarn start
```


## Notes:

### Four Separate Branches

This repository features four separate branches that we'll look at in the following order:

1. `javascript`: This branch uses a plain JS object to store the global app state. This is the default branch you will be on when first cloning the repository. There is no master branch.

2. `mori`: This branch uses a mori hashMap (an immutable & persistent data structure) to store the global app state. [mori](https://github.com/swannodette/mori) is similar to [immutable-js](https://github.com/facebook/immutable-js), but features a more functional API & better performance.

3. `event-streams`: This branch is a continuation of the `mori` branch demonstrating how the architecture could be rewritten to use event streams for handling events rather than directly assigning handlers to the components. This helps to further decouple events from component rendering and opens up new possibilities via composition & transformation of streams.

4. `fp-utils`: This branch is a continuation of the `event-streams` branch showing how we could write our own functional utilities from scratch and replace all of the ramda functions we were using in the previous branches. This is just meant as a learning exercise to help provide a better understanding of how these functions work.

You are currently viewing the `javascript` branch.

### JSX & Hyperscript (hyperscript-helpers)

Each branch contains both a JSX version and a hyperscript version of each component. The hyperscript components specifically use hyperscript-helpers, which offers a concise syntax reminiscent of elm-html, purescript-halogen's HTML module, Fable's HTML module, etc., which I happen to like at least as much as JSX. I'm just trying to show that using or not using JSX shouldn't be a deal breaker. It's quite concise, clean, and easy to understand using either option.

### Strict Linting

This project makes heavy use of ESLint to enforce a strict, functional style. The bulk of the rules come from [eslint-config-standard-pure-fp](https://github.com/joshburgess/eslint-config-standard-pure-fp), which is just a combination of [eslint-config-standard](https://github.com/feross/eslint-config-standard) & [eslint-config-cleanjs](https://github.com/bodil/eslint-config-cleanjs).

### Functional Tools & Techniques

[ramda](https://github.com/ramda/ramda) is used to offer functions like `compose`, `curry`, & `partial`. Techniques like functional composition, currying, & partial application are extremely helpful for creating reusable functions & clean, highly readable code. [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) can be used as an alternative. Although I am using ramda, using either of these libraries will give you a huge assortment of very useful functional tools to work with. These are the types of utilities you would find in the standard libraries of purely functional programming languages.

### How To Take This Idea Further

It is important to note that the architecture design demonstrated here was intended for users who are familiar with working with React & Redux, but who may not be familiar with reactive programming (RxJS, Most, Observables, Cycle.js, etc.), and it's just meant to get them thinking about new ways to go about working with unidirectional UI architectures.

A more evolved, less Redux-like, & more reactive version of this demo might include doing the following:

* ~~Stop assigning event handlers via Inferno (or React) component props. Instead, use most's `fromEvent` function to create declarative data flow pipelines. `fromEvent` takes in an event & a CSS selector and returns a stream of events that you can filter, combine with other streams, & transform in various ways.~~

* ~~Stop using lodash's `debounce` function to perform rate limiting. Instead, use most's `debounce` function, which operates on Observable streams rather than functions, keeping everything consistently using the reactive paradigm.~~

Note: The above changes have now been made. See the `event-streams` branch.

* Stop using most-subject & the `dispatch` function. Using Subjects to dispatch Actions is an imperative construct, and we'd like to be as declarative and reactive as possible.

* Start using Flow or TypeScript in order to reap the benefits of static type checking/analysis. Keep in mind that, although TypeScript seems to currently have the edge over Flow in terms of popularity & community activity, going with TypeScript means you will no longer be able to use ESLint, and TSLint is still missing a lot of rules & plugins available in the ESLint ecosystem. This is a downside of TypeScript being both a type checker and a compiler. It replaces a large amount of the tool chain, whereas Flow only adds type checking to standard JS semantics, allowing Flow users to continue using ESLint & Babel. This is a trade-off that might be worth it, but it's important to know that a trade-off exists when making that decision.