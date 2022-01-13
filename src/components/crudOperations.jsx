import '../css/CreateAndUpdate.css'
import '../css/crudRender.css'
import axios from 'axios'
import React from 'react'
import Header from './header'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIdentifier, setShowDeleteComponent, setShowEditComponent } from '../redux/userSlice';
import { useState, useEffect } from 'react/cjs/react.development'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import CreateAndUpdate from './CreateAndUpdate'
import '../css/deleteComponent.css'
import '../css/editComponent.css'

export default function CrudOperations () {

    const username = useSelector(state => state['reduxData'].username)
    const identifier = useSelector(state => state['reduxData'].id)
    const showDeleteComponent = useSelector(state => state['reduxData'].showDeleteComponent)
    const showEditComponent = useSelector(state => state['reduxData'].showEditComponent)

    const [post, setPost] = useState({
        username: username,
        title: '',
        content: ''
    })

    const [editData, setEditData] = useState({
        username: username,
        title: '',
        content: ''
    })
    
    const initialState = {
        username: username,
        title: '',
        content: ''
    }
    
    
    const dispatch = useDispatch()
    
    const [list, setList] = useState([])

    const [nextLink, setNextLink] = useState('')
    
    const [previousLink, setPreviousLink] = useState('')

    const [ButtonName, setButtonName] = useState('CREATE')
    
    const databaseURL = "https://dev.codeleap.co.uk/careers/"
    
    useEffect( () => {
        axios.get(databaseURL)
        .then(resp => {
            setList(resp.data['results'])
        })
        .catch(e => console.log('erro: ', e))
    },[])

    function updateList (post, add = true) {
        const newList = list.filter(p => p.id !== post.id)
        if (add) newList.unshift(post)
        return newList
    }

    function postData (e) {

       if (post.title === '' || post.content === '') {
           e.preventDefault ()
           alert('You need to type in both fields in order to make a post')
       } else {
           axios.post(databaseURL, post)
           .then(resp => {
               const newList = updateList(resp.data)
               setList(newList)
            })
            .catch(e => console.log(e))
       }
       setPost(initialState) 

    }
    
    function patchData (e) {

        if (editData.title === '' || editData.content === '') {
            e.preventDefault()
            alert('You need to type in both fields in order to make a post')
        } 
        else {
           axios.patch(`${databaseURL}${identifier}/`, editData )
            .then(resp => {
                const newList = updateList(resp.data)
                setList(newList)
                dispatch(setShowEditComponent(false))
                })
               
        }
 
    }   
    
    function deleteData(post) {
        dispatch(setShowDeleteComponent(true))
        setPost(post)
    }
    
    function updateInputField (e) {  
        setPost({title: e.target.value, content: post.content, username: post.username})
   
    }

    function updateContentField(e) {
        setPost({content: e.target.value, title: post.title, username: post.username })
        
    }

    function updateInputEditDataField (e) {  
        setEditData({title: e.target.value, content: editData.content, username: editData.username})

    }

    function updateContentEditDataField(e) {
        setEditData({content: e.target.value, title: editData.title, username: editData.username })

    }
    
    function loadPost (post) {
        setEditData(post)
        dispatch(setIdentifier(post.id))
        dispatch(setShowEditComponent(true))
   }

   function handleYes () {
        axios.delete(`https://dev.codeleap.co.uk/careers/${post.id}/`) 
        .then(resp => {
          const newList = updateList(post, false)
            setList(newList)
            setPost(initialState)
            setButtonName('CREATE')
            })
            .catch( () => console.log('erro')) 

        dispatch(setShowDeleteComponent(false))
        
    }

    function handleNo () {
        dispatch(setShowDeleteComponent(false))
    }

   function nextPage () {
        if (nextLink === '') {
            axios.get(databaseURL)
            .then(resp => {
                axios.get(resp.data['next'])
                    .then(resp => {
                        setList(resp.data['results'])
                        setNextLink(resp.data['next'])
                        setPreviousLink(resp.data['previous'])
                    })
                    .catch(e => console.log(e))
            })
        } else {
            axios.get(nextLink)
                .then(resp => {
                    setList(resp.data['results'])
                    setNextLink(resp.data['next'])
                    setPreviousLink(resp.data['previous'])
                })
        }
   }

   function previousPage () {
       if (previousLink === '') {
           alert('there is no previous page')
       } else {
           axios.get(previousLink)
            .then(resp => {
                setList(resp.data['results'])
                setNextLink(resp.data['next'])
                setPreviousLink(resp.data['previous'])
            })
            .catch(e => console.log(e))
       }
   }
    
    function renderData () {
        return list.map(post => {
            return (
                <div className = 'crudView'>
                    <Header title = {post.title}>   
                        {username === post.username ? (
                            <>
                                
                                <button className='buttonEdit ' onClick={() => loadPost(post)}>
                                    <FontAwesomeIcon  icon={faEdit} size='lg'>

                                    </FontAwesomeIcon> 
                                </button>
                                <button className='buttonDelete' onClick={() => deleteData(post)}>
                                    <FontAwesomeIcon icon={faTrash} size='lg'>

                                    </FontAwesomeIcon>
                                </button>
                         </>
                        ) : null}
                    </Header> 
                    
                    <p id = 'username'>@{post.username} </p>
                    <p id = 'content'> {post.content} </p>
                </div>
            )
        })
    }

    return (
        <>
        <CreateAndUpdate onChangeTitle = {e => updateInputField(e)} onChangeContent = {e => updateContentField(e)} TitleValue = {post.title} ContentValue = {post.content} onClick={e => `${ButtonName === 'CREATE' ? postData(e) : patchData(e)}`} ButtonName={ButtonName} />

        {renderData()}

        
        {showEditComponent === true ? (
            <div className="layout"> 
                <div className='editComponent'>
                    <p> Edit item </p>  
                    <label id = 'titleLabel'> Title </label>
                    <input onChange={e => updateInputEditDataField(e)} value = {editData.title} placeholder = 'Hello World' id = 'inputTitle' />
                    <label  id = 'contentLabel'> Content </label>
                    <input onChange={e => updateContentEditDataField(e) }value = {editData.content} placeholder = 'Content here' id = 'inputContent'/>
                    <button onClick={() => patchData()} className= 'editButton'  type = 'submit'> SAVE </button>

                </div> 
            </div>
        ) : null}


        {showDeleteComponent === true ? (
            <div className="layout"> 
                <div className='DeleteComponent'> 
                    <p> Are you sure you want to delete this item? </p>
                    <button onClick={() => handleNo()} className='button' id = 'yesButton' type="submit"> Cancel </button>
                    <button onClick={() => handleYes()} className='button' id = 'noButton' type="submit"> OK </button>
                </div>
            </div>
        ) : null}

        <button className='pageButton' id = 'previousPage' onClick={() => previousPage()}> Previous Page </button>
        <button className='pageButton' id ='nextPage' onClick={() => nextPage()}> Next Page </button>
        
        </>


    
      
    )
  
}