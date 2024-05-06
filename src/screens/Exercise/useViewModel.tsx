import ActResult from "@/native-module/dto/ActResult"
import NativeCameraModule from "@/native-module/NativeCameraModule"

const useViewModel = () => {
    const startCameraPressed = () => {
        NativeCameraModule.startCamera(startCameraCallback)
    }

    const startCameraCallback = (error?: string, result?: ActResult) => {
        if (error) {
            console.log("startCameraCallback:", error)
        }
    }

    return { startCameraPressed }
}

export default useViewModel
