import authenticationReducer from "./authentication/slice"
import { combineReducers } from "@reduxjs/toolkit"
import healthInformationReducer from "./health-information/slice"

const reducer = combineReducers({
    authentication: authenticationReducer,
    healthInformation: healthInformationReducer,
})

export default reducer
