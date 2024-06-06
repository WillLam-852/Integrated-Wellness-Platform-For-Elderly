import { HealthInformationState } from "./slice"
import { RootState } from "../store"

const healthInformationSelector: (
    state: RootState
) => HealthInformationState = (state: RootState) => state.healthInformation

export default healthInformationSelector
