import { configureStore } from '@reduxjs/toolkit'
import setUsername from './userSlice'
import setIdentifier from './userSlice'
import setDeleteData from './userSlice'
import setNoDeleteData  from './userSlice'
import setShowDeleteComponent from './userSlice'


export default configureStore({
    reducer: {
      reduxData: setUsername, setIdentifier, setDeleteData, setNoDeleteData, setShowDeleteComponent
    }
})