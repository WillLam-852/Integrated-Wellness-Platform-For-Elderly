import NativeCameraModule from "@/native-module/NativeCameraModule"

const useViewModel = () => {
    const startCameraPressed = () => {
        NativeCameraModule.startCamera()
    }

    return { startCameraPressed }
}

export default useViewModel
