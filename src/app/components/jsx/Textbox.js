// Use JSX
import Inferno from 'inferno'

const Textbox = ({ id, label, onInput, placeholder }) =>
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} type='text' onInput={onInput} placeholder={placeholder} />
  </div>

export default Textbox
