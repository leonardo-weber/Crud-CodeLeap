import React from 'react'
import '../css/CrudContainer.css'

export default function CrudContainer(props) {
  return (
    <div className='CrudContainer'>
      {props.children}
    </div>
  )
}
