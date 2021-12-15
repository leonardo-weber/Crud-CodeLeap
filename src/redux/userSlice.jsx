import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        validUsername: false,
        id: null
    },
    reducers: {
        setUsername(state, { payload }) {
            return {...state, username: payload, validUsername: true}
        },
        setIdentifier(state, { payload }) {
            return {...state, id: payload, validUsername: true}
        }
    }
})

export const { setUsername, setIdentifier } = slice.actions
export default slice.reducer
export const getState = state => state.user
