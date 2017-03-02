// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { Counter, Header } from '../../components'

const View = ({ count, subtitle, title }) =>
  div('.counter-demo', [
    Header({ title, subtitle }),
    Counter({ count }),
  ])

export default View
