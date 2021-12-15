export default function CreateAndUpdate (props) {
    return (
        
    <div className="createPost" id = 'create'>
        <h1> What's on your mind? </h1>
        <label id = 'titleLabel'> Title </label>
        <input onChange={props.onChangeTitle} value = {props.TitleValue} placeholder = 'Hello World' id = 'title' />
        <label   id = 'contentLabel'> Content </label>
        <input onChange={props.onChangeContent} value = {props.ContentValue}  placeholder = 'Content here' id = 'content'/>
        <button id = 'button'  type = 'submit' onClick={props.onClick}> {props.ButtonName} </button>
    </div>

    )

}