// Use JSX
import Inferno from 'inferno'
import { Counter, Header, Textbox } from '../../components'

const View = ({ count, rgb, subtitle, title }) => {
  const style = rgb
    ? {
      background: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    }
    : ''

  return (
    <div className={'counter-demo'} style={style}>
      <Header title={title} subtitle={subtitle} />
      <Counter count={count} />
      <Textbox
        id={'edit-subtitle'}
        label={'Edit subtitle'}
        placeholder={subtitle || 'Enter new subtitle here'}
      />
    </div>
  )
}

export default View
