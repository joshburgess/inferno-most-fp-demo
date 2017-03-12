// Use JSX
import Inferno from 'inferno'

const Textbox = ({ id, label, placeholder }) =>
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} type='text' placeholder={placeholder} />
  </div>

export default Textbox
