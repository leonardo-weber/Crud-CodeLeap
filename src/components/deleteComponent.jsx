import React from 'react'
import '../css/deleteComponent.css'

export default function DeleteComponent(props) {
  return (
    <div id='deleteLayout'> 
      <div className='DeleteComponent'> 
        <p> Are you sure you want to delete this item? </p>
        <div className='buttonsDiv'> 
          <button onClick={props.cancelClick} className='button' type='submit'> Cancel </button>
          <button onClick={props.deleteClick} className='button' type='submit'> OK </button>
        </div>
      </div>
    </div>
  )
}
