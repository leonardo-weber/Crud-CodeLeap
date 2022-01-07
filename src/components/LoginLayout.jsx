import React from 'react'
import '../css/LoginLayout.css'

export default function LoginLayout(props) {
    return (
        <div className='layout'>
            {props.children}
        </div>
    )
}
