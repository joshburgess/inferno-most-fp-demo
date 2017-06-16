// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { Counter, Header, Textbox } from '../../components'
import { editSubtitle, editTitle } from '../../actions'
// ramda does not have debounce or throttle functions
// alternatively, we could have used most's debounce function on a stream
import { debounce } from 'lodash/fp'
import { COUNTER_DEMO } from '../../styles'

// lodash/fp functions are auto-curried just like ramda
const debounce400 = debounce(400)
const debouncedEditSubtitle = debounce400(editSubtitle)

const View = ({ count, subtitle, title }) =>
  div(`.${COUNTER_DEMO}`, [
    Header({ title, subtitle }),
    Counter({ count }),
    Textbox({
      id: 'edit-title',
      label: 'Edit title',
      onInput: editTitle,
      placeholder: title || 'Enter new title here',
    }),
    Textbox({
      id: 'debounced-edit-subtitle',
      label: 'Edit subtitle (Debounced)',
      onInput: debouncedEditSubtitle,
      placeholder: subtitle || 'Enter new subtitle here',
    }),
  ])

export default View
