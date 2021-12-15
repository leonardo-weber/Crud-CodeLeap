import '../css/login.css'

export default function LoginForm (props) {
    return (
        <div className ='enterCrud'>
        <h4> Welcome to CodeLeap network! </h4>
        <label> Please enter your username </label>
        <input  onChange={props.onChange} className='input' type="text" placeholder='John Doe' name = 'username' value={props.value} />
        <button className="button"type = 'submit' onClick={props.onClick}> ENTER </button>
      </div>
    )
}