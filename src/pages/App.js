import React from 'react';
import Crud from './crud'
import '../css/LoginContainer.css'
import Login from './login';
import LoginLayout from '../components/LoginLayout';
import CrudLayout from '../components/CrudLayout';
import { useSelector } from 'react-redux';


export default function App() {  
  
  
  const validUsername = useSelector(state => state['reduxData'].validUsername)
  
  return (    
    <>
   {validUsername === true ? (
        <CrudLayout>
          <Crud> </Crud>
        </CrudLayout>
    ) : (
      <LoginLayout> 
        <Login> </Login>
      </LoginLayout>
    )}
  </> 
  );
  }