import { configureStore } from "@reduxjs/toolkit"
import healthInformationReducer from "./health-information/slice"

const store = configureStore({
    reducer: {
        healthInformation: healthInformationReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
