// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, input, label } = hh(h)
// alias label function to not conflict with label prop
const htmlLabel = label

const Textbox = ({ label, onInput }) =>
  div('.edit-subtitle', [
    htmlLabel({ for: 'edit-subtitle' }, [label]),
    input('#edit-subtitle', { type: 'text', onInput }),
  ])

export default Textbox
