import { AuthenticationState } from "./slice"
import { RootState } from "../store"

const authenticationSelector: (state: RootState) => AuthenticationState = (
    state: RootState
) => state.authentication

export default authenticationSelector
