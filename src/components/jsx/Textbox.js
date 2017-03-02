// Use JSX
import Inferno from 'inferno'

const Textbox = ({ id, label, onInput }) =>
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} type='text' onInput={onInput} />
  </div>

export default Textbox
