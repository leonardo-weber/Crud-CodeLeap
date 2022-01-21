import '../css/LoginContainer.css'


export default function LoginContainer (props) {
  return (
    <div className='LoginContainer'>
      <p> Welcome to CodeLeap network! </p>
      <label> Please enter your username </label>
      <input autoComplete='off' onChange={props.onChange}  type='text' placeholder='John Doe' name='username' value={props.value} />
      <div className='divEnterButton'>
        <button id={props.buttonID} type='submit' onClick={props.onClick}> ENTER </button>
      </div>
    </div>
  )
}
