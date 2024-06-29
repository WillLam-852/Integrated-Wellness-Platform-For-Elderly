import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthenticationState {
    isSignIn: boolean
}

const initialState: AuthenticationState = { isSignIn: false }

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        userSignIn: (state) => {
            state.isSignIn = true
        },
        userSignOut: (state) => {
            state.isSignIn = false
        },
    },
})

export const { userSignIn, userSignOut } = authenticationSlice.actions

export default authenticationSlice.reducer
