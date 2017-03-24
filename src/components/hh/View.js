// Use hypercscript + hyperscript-helpers
import h from 'inferno-hyperscript'
import hh from 'hyperscript-helpers'
const { div } = hh(h)
import { Counter, Header, PartyParrot, Textbox } from '../../components'

const View = ({ count, rgb, subtitle, title }) => {
  const counterAttrs = {
    style: rgb
      ? {
        background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      }
      : '',
  }

  return (
    div('.counter-demo', counterAttrs, [
      Header({ title, subtitle }),
      Counter({ count }),
      Textbox({
        id: 'edit-subtitle',
        label: 'Edit subtitle',
        placeholder: subtitle || 'Enter new subtitle here',
      }),
      PartyParrot(),
    ])
  )
}

export default View
