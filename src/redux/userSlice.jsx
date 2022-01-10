import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'user',
    initialState: {
        username: '',
        validUsername: false,
        id: null,
        nextLink: '',
        previousLink: ''
    },
    reducers: {
        setUsername(state, { payload }) {
            return {...state, username: payload, validUsername: true}
        },
        setIdentifier(state, { payload }) {
            return {...state, id: payload, validUsername: true}
        },
        setNextLink(state, { payload }) {
            return {...state, nextLink: payload, validUsername: true}
        },
        setPreviousLink(state, { payload }) {
            return {...state, previousLink: payload, validUsername: true}
        },

    }
})

export const { setUsername, setIdentifier, setNextLink, setPreviousLink } = slice.actions
export default slice.reducer
export const getState = state => state.user
