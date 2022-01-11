import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        validUsername: false,
        id: null,
        deleteData: null,
        showDeleteComponent: false
    },
    reducers: {
        setUsername(state, { payload }) {
            return {...state, username: payload, validUsername: true}
        },
        setIdentifier(state, { payload }) {
            return {...state, id: payload, validUsername: true}
        },
        setDeleteData(state, { payload }) {
            return {...state, deleteData: payload, validUsername: true}
        },
        setShowDeleteComponent(state, { payload }) {
            return {...state, showDeleteComponent: payload, validUsername: true}
        }
    }
})

export const { setUsername, setIdentifier, setDeleteData, setShowDeleteComponent} = slice.actions
export default slice.reducer
export const getState = state => state.user
