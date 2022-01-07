import '../css/CreateAndUpdate.css'
import '../css/crudRender.css'
import axios from 'axios'
import React from 'react'
import Header from './header'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIdentifier } from '../redux/userSlice';
import { useState, useLayoutEffect } from 'react/cjs/react.development'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import CreateAndUpdate from './CreateAndUpdate'

export default function CrudOperations () {

    const username = useSelector(state => state['nameData'].username)
    
    const [post, setPost] = useState({
        username: username,
        title: '',
        content: ''
    })
    
    const initialState = {
        title: '',
        content: ''
    }
    
    const dispatch = useDispatch()
    
    const [list, setList] = useState([])

    const [ButtonName, setButtonName] = useState('CREATE')
    
    const identifier = useSelector(state => state['nameData'].id)
    
    const databaseURL = "https://dev.codeleap.co.uk/careers/"
    
    useLayoutEffect( () => {
        axios.get(databaseURL)
        .then(resp => setList(resp.data['results']))
        .catch(e => console.log('erro: ', e))
    },[])
   

    function updateList (post, add = true) {
        const newList = list.filter(p => p.id !== post.id)
        if (add) newList.unshift(post)
        return newList
    }

    function savePost (e) {
        
       const data = Object.assign(post)

       if (data.title === '' || data.content === '') {
           e.preventDefault ()
           alert('You need to type in both fields in order to make a post')
       } else {
           axios.post(databaseURL, data)
           .then(resp => {
               const newList = updateList(resp.data)
               setList(newList)
               setPost(initialState)    
            })
            .catch(console.log('error'))
       }

    }
    
    function patchData (e) {

        const data = Object.assign(post)

        if (data.title === '' || data.content === '') {
            e.preventDefault()
            alert('You need to type in both fields in order to make a post')
        } 
        else {
           axios.patch(`${databaseURL}${identifier}/`, data )
            .then(resp => {
                const newList = updateList(resp.data)
                setList(newList)
                setPost(initialState)   
                setButtonName('CREATE') 
                })
        }
        
    }   
    
    function deleteData(post) { 
        axios.delete(`https://dev.codeleap.co.uk/careers/${post.id}/`) 
            .then(resp => {
                const newList = updateList(post, false)
                setList(newList)
                setPost(initialState)
            })
            .catch( () => console.log('erro')) 
    }
    
    function updateInputField (e) {  
        setPost({title: e.target.value, content: post.content, username: post.username})
    }

    function updateContentField(e) {
        setPost({content: e.target.value, title: post.title, username: post.username })
    }
    
    function loadPost (post) {
        setButtonName('UPDATE')
        setPost(post)
        dispatch(setIdentifier(post.id))
        
   }
    
    function renderData () {
        console.log(list)
        return list.map(post => {
            return (
                <div className = 'crudView'>
                    <Header title = {post.title}>   
                        {username === post.username ? (
                            <>
                             <div className="iconEdit">
                                <button className='buttonEdit ' onClick={() => loadPost(post)}>
                                    <FontAwesomeIcon icon={faEdit} size='lg'>

                                    </FontAwesomeIcon> </button>
                            </div>
                            <div className="iconDelete">
                                    <button className='buttonDelete' onClick={() => deleteData(post)}>
                                        <FontAwesomeIcon icon={faTrash} size='lg'>

                                        </FontAwesomeIcon>
                                    </button>
                            </div></>
                        ) : null}
                    </Header> 

                    <p id = 'datetime'> {post.created_datetime.substr(0,10) } </p>
                    <p id = 'userp'>@{post.username} </p>
                    <p> {post.content} </p>
                </div>
            )
        })
    }

    return (
        <>
        <CreateAndUpdate onChangeTitle = {e => updateInputField(e)} onChangeContent = {e => updateContentField(e)} TitleValue = {post.title} ContentValue = {post.content} onClick={e => `${ButtonName === 'CREATE' ? savePost(e) : patchData(e)}`} ButtonName={ButtonName} />

        {renderData()}
        </>



    
      
    )
  
}