import "react-native-gesture-handler"
import "./translations"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ApplicationNavigator from "./navigators/Application"
import { MMKV } from "react-native-mmkv"
import { Provider } from "react-redux"
import { ThemeProvider } from "@/theme"
import store from "./redux/store"

const queryClient = new QueryClient()

export const storage = new MMKV()

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider storage={storage}>
                    <ApplicationNavigator />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    )
}

export default App
