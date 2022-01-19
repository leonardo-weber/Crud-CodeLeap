import React from 'react'
import '../css/deleteComponent.css'

export default function DeleteComponent(props) {
  return (
    <div id='deleteBackground'> 
      <div className='DeleteComponent'> 
        <p> Are you sure you want to delete this item? </p>
        <div className='buttonDiv'> 
          <button onClick={props.cancelClick} className='button' id = 'yesButton' type='submit'> Cancel </button>
          <button onClick={props.deleteClick} className='button' id = 'noButton' type='submit'> OK </button>
        </div>
      </div>
    </div>
  )
}
