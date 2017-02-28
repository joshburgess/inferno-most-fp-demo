// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { br, div, h1, h2 } = hh(h)

const Header = ({ title, subtitle }) =>
  div([
    h1(title),
    h2(subtitle),
    br(),
    br(),
  ])

export default Header
