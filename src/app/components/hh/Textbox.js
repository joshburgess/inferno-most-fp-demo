// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, input, label } = hh(h)
// alias label function to not conflict with label prop
const htmlLabel = label

const Textbox = ({ id, label, placeholder }) =>
  div('.edit-subtitle', [
    htmlLabel({ for: id }, [label]),
    input(`#${id}`, { type: 'text', placeholder }),
  ])

export default Textbox
