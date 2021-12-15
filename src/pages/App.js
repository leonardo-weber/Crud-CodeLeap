import React, { useEffect } from 'react';
import Crud from './crud'
import '../css/login.css'
import Login from './login';
import { useSelector } from 'react-redux';

export default function App() {  
  
  const validUsername = useSelector(state => state['nameData'].validUsername)
  
  return (    
    <>
   {validUsername === true ? (
        <Crud> </Crud>
    ) : (
      <Login> </Login>
    )}
  </> 
  );
  }