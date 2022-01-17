export default function CreatePost (props) {
    return ( 
        <div className="createPost">
            <div className="divH4">
                 <h4> What's on your mind? </h4> 
            </div>
            <div className="divTitleLabel">
                 <label id = 'titleLabel'> Title </label> 
            </div>
            <div className="divInputTitle"> 
                <input onChange={props.onChangeTitle} value = {props.TitleValue} placeholder = 'Hello World' id = 'inputTitle' /> 
            </div>
            <div className="divContentLabel">
                <label   id = 'contentLabel'> Content </label>
            </div>
            <div className="divContentInput">
                <textarea onChange={props.onChangeContent} value = {props.ContentValue} id = 'inputContent' placeholder="Content here"></textarea>
            </div>
            <div className="divCreateButton">
                <button id = 'button'  type = 'submit' onClick={props.onClick}> {props.ButtonName} </button>
            </div>
        </div>
    )
}

