// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { img } = hh(h)

const PartyParrot = props =>
  img('.counter-img', {
    ...props,
    src: 'http://cultofthepartyparrot.com/parrots/hd/parrot.gif',
  })

export default PartyParrot
