import { useDispatch } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { setUsername } from '../redux/userSlice';
import LoginForm from '../components/LoginForm';



export default function Login (props) {

  const [username, setUserName] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    if (username === '') {
      alert('You must type in a username in order to log in')
    } else {
      dispatch(setUsername(username))
    }
  }

  return (
     <LoginForm onChange={e => setUserName(e.target.value) } value={username} onClick = {handleLogin}/>
    )
}