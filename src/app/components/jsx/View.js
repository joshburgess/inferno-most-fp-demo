// Use JSX
import Inferno from 'inferno'
import { Counter, Header, PartyParrot, Textbox } from '../../components'

const View = ({ count, rgb, subtitle, title }) => {
  const counterStyle = rgb
    ? {
      background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    }
    : ''

  return (
    <div className={'counter-demo'} style={counterStyle}>
      <Header title={title} subtitle={subtitle} />
      <Counter count={count} />
      <Textbox
        id={'edit-subtitle'}
        label={'Edit subtitle'}
        placeholder={subtitle || 'Enter new subtitle here'}
      />
      <PartyParrot />
    </div>
  )
}

export default View
