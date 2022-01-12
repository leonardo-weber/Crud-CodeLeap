import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        validUsername: false,
        id: null,
        deleteData: false,
        showDeleteComponent: false,
        showEditComponent: false
    },
    reducers: {
        setUsername(state, { payload }) {
            return {...state, username: payload, validUsername: true}
        },
        setIdentifier(state, { payload }) {
            return {...state, id: payload, validUsername: true}
        },
        setShowDeleteComponent(state, { payload }) {
            return {...state, showDeleteComponent: payload, validUsername: true}
        },
        setShowEditComponent(state, { payload }) {
            return {...state, showEditComponent: payload, validUsername: true}
        },
    }
})

export const { setUsername, setIdentifier, setDeleteData, setShowDeleteComponent, setShowEditComponent} = slice.actions
export default slice.reducer
export const getState = state => state.user
