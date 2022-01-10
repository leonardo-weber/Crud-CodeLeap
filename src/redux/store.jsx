import { configureStore } from '@reduxjs/toolkit'
import setUsername from './userSlice'
import setIdentifier from './userSlice'
import  setNextLink from './userSlice'
import setPreviousLink  from './userSlice'

export default configureStore({
    reducer: {
      reduxData: setUsername, setIdentifier, setNextLink, setPreviousLink
    }
})