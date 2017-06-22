// Use JSX
import Inferno from 'inferno'
import { INPUT, LABEL } from '../../styles'

const Textbox = ({ id, label, onInput, placeholder }) =>
  <div>
    <label className={LABEL} htmlFor={id}>{label}</label>
    <input id={id} className={INPUT} type='text' onInput={onInput} placeholder={placeholder} />
  </div>

export default Textbox
