import '../css/createPost.css'

export default function CreatePost (props) {
  return ( 
    <div className='createPost'>
      <h4> What's on your mind? </h4> 
      <label id = 'titleLabel'> Title </label> 
      <input autoComplete='off' onChange={props.onChangeTitle} value = {props.TitleValue} placeholder = 'Hello World' id = 'inputTitle' /> 
      <label   id = 'contentLabel'> Content </label>
      <textarea autoComplete='off' onChange={props.onChangeContent} value = {props.ContentValue} id = 'inputContent' placeholder='Content here'></textarea>
      <div id='divButton'> 
        <button id={props.createButtonID} className='button' type='submit' onClick={props.onClick}> {props.ButtonName} </button>  
      </div>
    </div>
  )
}

