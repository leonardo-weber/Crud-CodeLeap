import '../css/LoginContainer.css'

export default function LoginContainer (props) {
    return (
        <div className='LoginContainer'>
        <p> Welcome to CodeLeap network! </p>
        <label> Please enter your username </label>
        <input  onChange={props.onChange}  type="text" placeholder='John Doe' name = 'username' value={props.value} />
        <button type = 'submit' onClick={props.onClick}> ENTER </button>
      </div>
    )
}