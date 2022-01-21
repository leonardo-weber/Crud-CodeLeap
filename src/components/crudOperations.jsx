/* eslint-disable jsx-quotes */
/* eslint-disable max-len */
import '../css/createPost.css'
import '../css/crudOperations.css'
import '../css/deleteComponent.css'
import '../css/editComponent.css'
import axios from 'axios'
import React from 'react'
import Header from './header'
import moment from 'moment'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIdentifier } from '../redux/userSlice';
import { useState, useEffect } from 'react/cjs/react.development'
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa'
import CreatePost from './createPost'
import EditComponent from './editComponent'
import DeleteComponent from './deleteComponent'


export default function CrudOperations () {


  const username = useSelector(state => state.reduxData.username)
  const identifier = useSelector(state => state.reduxData.id)

  const [post, setPost] = useState({
    username: username,
    title: '',
    content: '',
  })

  const initialState = {
    username: username,
    title: '',
    content: '',
  }
    
  const dispatch = useDispatch()
    
  const [list, setList] = useState([])

  const [nextLink, setNextLink] = useState('')
    
  const [previousLink, setPreviousLink] = useState('')

  const [showDeleteComponent, setShowDeleteComponent] = useState()

  const [showEditComponent, setShowEditComponent] = useState()

  const apiURL = 'https://dev.codeleap.co.uk/careers/'
    
  useEffect( () => {
    axios.get(apiURL)
      .then(resp => {
        setList(resp.data.results)
      })
      .catch(() => console.log('Error'))
  }, [])

  function postData () {
    console.log(username)
    if (post.title.length && post.content.length >= 3) {
      axios.post(apiURL, post)
        .then(resp => {
          const newList = updateList(resp.data)
          setList(newList)
        })
        .catch(e => console.log(e))
      setPost(initialState) 
    }
  }
     
  function patchData () {
    if (post.title.length && post.content.length >=3) {
      axios.patch(`${apiURL}${identifier}/`, post )
        .then(resp => {
          const newList = updateList(resp.data)
          setList(newList)
          setShowEditComponent(false)
        })      
      setPost(initialState)
    }
  }   
     
  function deleteData(post) {
    setShowDeleteComponent(true)
    setPost(post)
  }

  function loadPost (post) {
    setPost(post)
    dispatch(setIdentifier(post.id))
    setShowEditComponent(true)
  }

  function updateList (post, add = true) {
    const newList = list.filter(p => p.id !== post.id)
    if (add) newList.unshift(post)
    return newList
  }

  function updateInputField (e) {  
    setPost({title: e.target.value, content: post.content, username: post.username})
   
  }

  function updateContentField(e) {
    setPost({content: e.target.value, title: post.title, username: post.username })
        
  }
    
  function handleDelete () {
    axios.delete(`https://dev.codeleap.co.uk/careers/${post.id}/`) 
      .then(() => {
        const newList = updateList(post, false)
        setList(newList)
        setPost(initialState)
      })
      .catch( () => console.log('erro')) 

    setShowDeleteComponent(false)
        
  }

  function handleNotDelete () {
    setShowDeleteComponent(false)
    setPost(initialState)
  }

  function nextPage () {
    if (nextLink === '') {
      axios.get(apiURL)
        .then(resp => {
          axios.get(resp.data.next)
            .then(resp => {
              setList(resp.data.results)
              setNextLink(resp.data.next)
              setPreviousLink(resp.data.previous)
            })
            .catch(e => console.log(e))
        })
    } else {
      axios.get(nextLink)
        .then(resp => {
          setList(resp.data.results)
          setNextLink(resp.data.next)
          setPreviousLink(resp.data.previous)
        })
    }
    window.scrollTo(0, 500)
  }

  function previousPage () {
    if (previousLink === '') {
      alert('there is no previous page')
    } else {
      axios.get(previousLink)
        .then(resp => {
          setList(resp.data.results)
          setNextLink(resp.data.next)
          setPreviousLink(resp.data.previous)
        })
        .catch(e => console.log(e))
    }
    window.scrollTo(0, 500)
  }

  function returnClick () {
    setShowEditComponent(false)
    setPost(initialState)
  }
    
  function renderData () {
    return list.map(post => {
      return (
        <div key={post.id} className = 'crudView'>
          <Header title = {post.title}>   
            {username === post.username ? (
              <>
                <div className="deleteEditDiv">
                  <button className='buttonDelete' onClick={() => deleteData(post)}>
                    <FaRegTrashAlt size={22} />
                  </button>         
                  <button className='buttonEdit' onClick={() => loadPost(post)}>
                    <FaRegEdit size={25} />
                  </button>
                </div>
                         
              </>
            ) : null}
          </Header> 
                    
          <div className="divInlineElements">
            <div className="divUsername">
              <p id='username'>@{post.username} </p>
            </div>

            <div className="divDatetime">
              <p id='datetime'> {moment(post.created_datetime).fromNow()}</p>
            </div>
          </div>
          <div className="divContent">
            <p id='content'> {post.content} </p>  
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <CreatePost createButtonID={post.title.length < 3 || post.content.length < 3 ? 'buttonNotActive' : null} onChangeTitle = {e => updateInputField(e)} onChangeContent = {e => updateContentField(e)} TitleValue = {post.title} ContentValue = {post.content} onClick={e => postData(e)} />

      {renderData()}
        
      {showEditComponent === true ? (
        <EditComponent titleOnChange ={e => updateInputField(e)} titleValue = {post.title} contentOnChange = {e => updateContentField(e)} contentValue = {post.content} returnClick = {() => returnClick()} saveClick = {e => patchData(e)}/>   
      ) : null}


      {showDeleteComponent === true ? (
        <DeleteComponent cancelClick = {() => handleNotDelete()} deleteClick = {() => handleDelete()} />
      ) : null}

      <div className="divPageButton">
        <button className='pageButton' onClick={() => previousPage()}> Previous Page </button>
        <button className='pageButton' onClick={() => nextPage()}> Next Page </button>
      </div>
    </>


    
      
  )
  
}
