import { persistReducer, persistStore } from "redux-persist"

import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage,
    whitelist: ["authentication"],
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
