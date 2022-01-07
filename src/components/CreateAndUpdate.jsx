export default function CreateAndUpdate (props) {
    return ( 
        <div className="createPost">
            <h4> What's on your mind? </h4>
            <label id = 'titleLabel'> Title </label>
            <input onChange={props.onChangeTitle} value = {props.TitleValue} placeholder = 'Hello World' id = 'inputTitle' />
            <label   id = 'contentLabel'> Content </label>
            <input onChange={props.onChangeContent} value = {props.ContentValue}  placeholder = 'Content here' id = 'inputContent'/>
            <button id = 'button'  type = 'submit' onClick={props.onClick}> {props.ButtonName} </button>
        </div>
    )
}