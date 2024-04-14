export default interface ActResult {
    code: ActCode
    action: ActAction
    activityName: string
}
export const enum ActCode {
    OK = -1,
}
export const enum ActAction {
    CLOSE = "close",
    FINISHED = "actFinished",
}
