// Use JSX
import Inferno from 'inferno'
import { INPUT, LABEL } from '../../styles'

const Textbox = ({ id, label, placeholder }) =>
  <div>
    <label className={LABEL} htmlFor={id}>{label}</label>
    <input id={id} className={INPUT} type='text' placeholder={placeholder} />
  </div>

export default Textbox
