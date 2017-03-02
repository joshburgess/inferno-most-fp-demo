// Use JSX
import Inferno from 'inferno'
import {
  Counter,
  Header,
  Textbox,
} from '../../components'
import { selectAction } from '../../utils'
import { debounce, observe } from 'most'
import { curry } from 'ramda'
import { EDIT_TITLE } from '../../constants/actionTypes'
import { editTitle, editTitleDebounced } from '../../actions'

const selectEditTitle = selectAction(EDIT_TITLE)
const debounce800 = curry(debounce)(800)

const View = (action$, { count, subtitle, title }) => {
  const editTitle$ = selectEditTitle(debounce800(action$))
  const editTitleDebounced$ = debounce800(editTitle$)
  observe(editTitleDebounced, editTitleDebounced$)

  return (
    <div className={'counter-demo'}>
      <Header title={title} subtitle={subtitle} />
      <Counter count={count} />
      <div>
        <Textbox label={'Edit title'} onInput={editTitle} />
      </div>
    </div>
  )
}

export default View
