import axios, { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import { userSignIn, userSignInFailure, userSignInSuccess } from "./slice"

import { Alert } from "react-native"
import { PayloadAction } from "@reduxjs/toolkit"
import { baseURL } from "../baseURL"

const signInRequest = (userName: string, password: string) => {
    return axios.post(`${baseURL}/login/verify`, {
        userName,
        password,
    })
}

function* signInSaga(
    action: PayloadAction<{ userName: string; password: string }>
): Generator<any, void, unknown> {
    try {
        const response = yield call(
            signInRequest,
            action.payload.userName,
            action.payload.password
        )
        const typedResponse: AxiosResponse<any, any> =
            response as AxiosResponse<any, any>
        console.log("typedResponse:", typedResponse)
        if (typedResponse.data.code === 200) {
            yield put(userSignInSuccess())
        } else {
            throw new Error("Sign-in failed. Please check your credentials.")
        }
    } catch (error: any) {
        Alert.alert(
            "Error",
            "Sign-in failed. Please check your username and password."
        )
        yield put(userSignInFailure())
    }
}

export function* authenticationSaga(): Generator<any, void, unknown> {
    yield takeLatest(userSignIn.type, signInSaga)
}

export default authenticationSaga
