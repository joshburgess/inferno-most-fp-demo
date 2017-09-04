// Use hyperscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { Counter, Header, PartyParrot, Textbox } from '../../components'
import { COUNTER_DEMO } from '../../styles'

const View = ({ count, rgb, subtitle, title }) => {
  const counterAttrs = {
    style: rgb
      ? {
        background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      }
      : '',
  }

  return (
    div(`.${COUNTER_DEMO}`, counterAttrs, [
      Header({ title, subtitle }),
      Counter({ count }),
      Textbox({
        id: 'edit-title',
        label: 'Edit title',
        placeholder: title || 'Enter new title here',
      }),
      Textbox({
        id: 'debounced-edit-subtitle',
        label: 'Edit subtitle (Debounced)',
        placeholder: subtitle || 'Enter new subtitle here',
      }),
      PartyParrot(),
    ])
  )
}

export default View
