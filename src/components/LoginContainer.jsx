import '../css/LoginContainer.css'
import { useSelector } from 'react-redux'

export default function LoginContainer (props) {

   const username = useSelector(state => state.reduxData.username)

    return (
        <div className='LoginContainer'>
        <p> Welcome to CodeLeap network! </p>
        <label> Please enter your username </label>
        <input  onChange={props.onChange}  type="text" placeholder='John Doe' name = 'username' value={props.value} />
        <button type = 'submit' onClick={props.onClick}> ENTER </button>
      </div>
    )
}