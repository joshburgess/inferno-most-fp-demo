// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div, input, label } = hh(h)
// alias label function to not conflict with label prop
const htmlLabel = label
import { INPUT, LABEL } from '../../styles'

const Textbox = ({ id, label, placeholder }) =>
  div('.edit-subtitle', [
    htmlLabel(`.${LABEL}`, { for: id }, [label]),
    input(`#${id}.${INPUT}`, { type: 'text', placeholder }),
  ])

export default Textbox
