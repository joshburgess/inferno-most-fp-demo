// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { Counter, Header, Textbox } from '../../components'
import { editSubtitle } from '../../actions'
// ramda does not have debounce or throttle functions
// alternatively, we could have used most's debounce function on a stream of
// actions filtered for the EDIT_SUBTITLE acion type
import { debounce } from 'lodash/fp'

// lodash/fp functions are auto-curried just like ramda
const debounce400 = debounce(400)
const debouncedEditSubtitle = debounce400(editSubtitle)

const View = ({ count, subtitle, title }) =>
  div('.counter-demo', [
    Header({ title, subtitle }),
    Counter({ count }),
    Textbox({ label: 'Edit subtitle', onInput: debouncedEditSubtitle }),
  ])

export default View
