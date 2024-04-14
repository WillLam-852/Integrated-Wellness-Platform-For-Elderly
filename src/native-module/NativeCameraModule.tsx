import ActResult from "./dto/ActResult"
import { NativeModules } from "react-native"
import baseFun from "./NMBaseFun"

const { CameraModule } = NativeModules

namespace NativeCameraModule {
    export const startCamera = (callback: (error?: string, result?: ActResult) => void) => {
        const android = () => {
            if (CameraModule == null) {
                callback("CameraModule not found!", undefined)
                return
            }
            CameraModule.start(callback)
        }
        const ios = () => {
            if (CameraModule == null) {
                callback("CameraModule not found!", undefined)
                return
            }
            CameraModule.start()
                .then((res: any) => {
                    const obj = JSON.parse(res)
                    let actResult: ActResult = {
                        code: obj.code,
                        action: obj.action,
                        activityName: obj.activityName,
                    }
                    callback(undefined, actResult)
                })
                .catch((e: { message: any; code: any }) => callback(`[iOS] ${e.code}, ${e.message}`, undefined))
        }
        const other = () => {
            callback("UnknowOS", undefined)
        }
        baseFun(android, ios, other)
    }
}

export default NativeCameraModule
