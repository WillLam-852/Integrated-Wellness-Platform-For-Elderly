import "react-native-gesture-handler"
import "./translations"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import ApplicationNavigator from "./navigators/Application"
import { MMKV } from "react-native-mmkv"
import { ThemeProvider } from "@/theme"

const queryClient = new QueryClient()

export const storage = new MMKV()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
                <ApplicationNavigator />
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App
