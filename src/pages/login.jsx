import { useDispatch } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { setUsername } from '../redux/userSlice';
import LoginContainer from '../components/LoginContainer';
import '../css/LoginContainer.css'

export default function Login () {

  const [username, setUserName] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (username.length !== 0) {
      dispatch(setUsername(username))
    }
  }

  const buttonID = username.length < 3 ? 'buttonDeactivated' : null

  return (
    <LoginContainer buttonID={buttonID} onChange={e => setUserName(e.target.value) } value={username} onClick = {handleLogin}/>
  )
}
