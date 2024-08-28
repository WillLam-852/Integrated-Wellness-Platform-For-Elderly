import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface AuthenticationState {
    isSignIn: boolean
    loading: boolean
    error: string | null
}

const initialState: AuthenticationState = {
    isSignIn: false,
    loading: false,
    error: null,
}

const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        userSignIn: (
            state,
            _action: PayloadAction<{ userName: string; password: string }>
        ) => {
            state.loading = true
            state.error = null
        },
        userSignInSuccess: (state) => {
            state.isSignIn = true
            state.loading = false
            state.error = null
        },
        userSignInFailure: (state) => {
            state.loading = false
            state.error = "Sign-in failed. Please check your credentials."
        },
        userSignOut: (state) => {
            state.isSignIn = false
        },
    },
})

export const { userSignIn, userSignInSuccess, userSignInFailure, userSignOut } =
    authenticationSlice.actions

export default authenticationSlice.reducer
