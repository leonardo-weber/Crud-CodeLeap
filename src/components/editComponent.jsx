import React from 'react'
import '../css/editComponent.css'

export default function EditComponent(props) {
  return (
    <div id='editLayout'> 
      <div className='editComponent'>
        <p> Edit item </p>  
        <label id='titleLabel'> Title </label>
        <input onChange={props.titleOnChange} value={props.titleValue} placeholder='Hello World' id='inputTitle' />
        <label  id='contentLabel'> Content </label>
        <textarea autoComplete='off' onChange={props.contentOnChange} value={props.contentValue} placeholder='Content here' id = 'inputContent'></textarea>
        <div className='buttonDiv'>
          <button onClick={props.returnClick} className='editButton'> RETURN </button>
          <button onClick={props.saveClick}   className='editButton'  type = 'submit'> SAVE </button>
        </div>
      </div> 
    </div>
  )
}
