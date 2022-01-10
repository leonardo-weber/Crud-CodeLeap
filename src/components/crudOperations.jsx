import '../css/CreateAndUpdate.css'
import '../css/crudRender.css'
import axios from 'axios'
import React from 'react'
import Header from './header'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIdentifier, setNextLink, setPreviousLink } from '../redux/userSlice';
import { useState, useEffect } from 'react/cjs/react.development'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons/faEdit'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import CreateAndUpdate from './CreateAndUpdate'

export default function CrudOperations () {

    const username = useSelector(state => state['reduxData'].username)
    const link = useSelector(state => state['reduxData'].nextLink)
    const previousLink = useSelector(state => state['reduxData'].previousLink)
    const identifier = useSelector(state => state['reduxData'].id)

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

    function savePost (e) {

       if (post.title === '' || post.content === '') {
           e.preventDefault ()
           alert('You need to type in both fields in order to make a post')
       } else {
           axios.post(databaseURL, post)
           .then(resp => {
               const newList = updateList(resp.data)
               setList(newList)
               console.log('chegou aqui')  
            })
            .catch(e => console.log(e))
       }
       setPost(initialState) 

    }
    
    function patchData (e) {

        if (post.title === '' || post.content === '') {
            e.preventDefault()
            alert('You need to type in both fields in order to make a post')
        } 
        else {
           axios.patch(`${databaseURL}${identifier}/`, post )
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
        console.log(post)
    }

    function updateContentField(e) {
        setPost({content: e.target.value, title: post.title, username: post.username })
        console.log(post)
    }
    
    function loadPost (post) {
        setButtonName('UPDATE')
        setPost(post)
        dispatch(setIdentifier(post.id))
        
   }

   function nextPage () {
        if (link === '') {
            axios.get(databaseURL)
            .then(resp => {
                axios.get(resp.data['next'])
                    .then(resp => {
                        setList(resp.data['results'])
                        dispatch(setNextLink(resp.data['next']))
                        dispatch(setPreviousLink(resp.data['previous']))
                    })
                    .catch(e => console.log(e))
            })
        } else {
            axios.get(link)
                .then(resp => {
                    setList(resp.data['results'])
                    dispatch(setNextLink(resp.data['next']))
                    dispatch(setPreviousLink(resp.data['previous']))
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
                dispatch(setNextLink(resp.data['next']))
                dispatch(setPreviousLink(resp.data['previous']))
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
                                    <FontAwesomeIcon icon={faEdit} size='lg'>

                                    </FontAwesomeIcon> 
                                </button>
                                <button className='buttonDelete' onClick={() => deleteData(post)}>
                                    <FontAwesomeIcon icon={faTrash} size='lg'>

                                    </FontAwesomeIcon>
                                </button>
                         </>
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

        <button id = 'next' onClick={() => previousPage()}> Previous Page </button>
        <button id ='previous' onClick={() => nextPage()}> Next Page </button>
        </>


    
      
    )
  
}