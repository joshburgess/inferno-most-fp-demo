// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, h1, h2 } = hh(h)

const Header = ({ title, subtitle }) =>
  div([
    h1(title),
    h2(subtitle),
  ])

export default Header
