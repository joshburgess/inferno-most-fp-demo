// Use JSX
import Inferno from 'inferno'

const Textbox = ({ label, onInput }) =>
  <div>
    <label htmlFor='edit-subtitle'>{label}</label>
    <input id='edit-subtitle' type='text' onInput={onInput} />
  </div>

export default Textbox
