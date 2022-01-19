import { configureStore } from '@reduxjs/toolkit'
import setUsername from './userSlice'
import setIdentifier from './userSlice'



export default configureStore({
  reducer: {
    reduxData: setUsername, setIdentifier,
  },
})
