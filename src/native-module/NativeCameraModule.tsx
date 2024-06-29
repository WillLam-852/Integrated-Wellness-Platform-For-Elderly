import ActResult from "./dto/ActResult"
import { NativeModules } from "react-native"
import PlannedExercise from "@/models/PlannedExercise"
import baseFun from "./NMBaseFun"

const { CameraModule } = NativeModules

namespace NativeCameraModule {
    export const startCamera = (
        exercises: PlannedExercise[],
        callback: (error?: string, result?: ActResult) => void
    ) => {
        const android = () => {
            if (CameraModule == null) {
                callback("CameraModule not found!", undefined)
                return
            }
            CameraModule.start(
                "CameraModule",
                "CatemraLocation",
                (error: any) => {
                    console.log(
                        `Error found in native callback module ${error}`
                    )
                },
                (result: any) => {
                    console.log(
                        `get sussess callback, the result code is ${result.code}, the action is ${result.action}, the activity name is ${result.activityName}`
                    )
                }
            )
        }
        const ios = () => {
            if (CameraModule == null) {
                callback("CameraModule not found!", undefined)
                return
            }
            CameraModule.start(JSON.stringify(exercises))
                .then((res: any) => {
                    const obj = JSON.parse(res)
                    let actResult: ActResult = {
                        code: obj.code,
                        action: obj.action,
                        activityName: obj.activityName,
                    }
                    callback(undefined, actResult)
                })
                .catch((e: { message: any; code: any }) =>
                    callback(`[iOS] ${e.code}, ${e.message}`, undefined)
                )
        }
        const other = () => {
            callback("UnknowOS", undefined)
        }
        baseFun(android, ios, other)
    }
}

export default NativeCameraModule
