import { Platform } from "react-native"
const baseFun = (android?: () => void, ios?: () => void, other?: () => void) => {
    if (Platform.OS == "android") {
        android && android()
    } else if (Platform.OS == "ios") {
        ios && ios()
    } else {
        other && other()
    }
}
export function baseGenericFun<S>(android?: () => Promise<S>, ios?: () => Promise<S>, other?: () => Promise<S>): Promise<S> | null {
    if (Platform.OS == "android") {
        return android ? android() : null
    } else if (Platform.OS == "ios") {
        return ios ? ios() : null
    } else {
        return other ? other() : null
    }
}

export default baseFun
