import { useDispatch } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { setUsername } from '../redux/userSlice';
import LoginContainer from '../components/LoginContainer';
import '../css/LoginContainer.css'

export default function Login (props) {

  const [username, setUserName] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (username.length !== 0) {
      dispatch(setUsername(username))
    }
  }

  return (
     <LoginContainer buttonID={username.length === 0 ? 'buttonDeactivated' : null} onChange={e => setUserName(e.target.value) } value={username} onClick = {handleLogin}/>
    )
}