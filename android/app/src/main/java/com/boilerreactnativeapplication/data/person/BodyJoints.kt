package com.boilerreactnativeapplication.data.person

enum class BodyJoints(val joint: Pair<BodyPart, BodyPart>) {
    JOINT_LEFT_SHOULDER_RIGHT_SHOULDER(Pair(BodyPart.LEFT_SHOULDER, BodyPart.RIGHT_SHOULDER)),
    JOINT_LEFT_SHOULDER_LEFT_HIP(Pair(BodyPart.LEFT_SHOULDER, BodyPart.LEFT_HIP)),
    JOINT_RIGHT_SHOULDER_RIGHT_HIP(Pair(BodyPart.RIGHT_SHOULDER, BodyPart.RIGHT_HIP)),
    JOINT_LEFT_HIP_RIGHT_HIP(Pair(BodyPart.LEFT_HIP, BodyPart.RIGHT_HIP)),
    LEFT_ARM(Pair(BodyPart.LEFT_SHOULDER, BodyPart.LEFT_ELBOW)),
    LEFT_FORE_ARM(Pair(BodyPart.LEFT_ELBOW, BodyPart.LEFT_WRIST)),
    RIGHT_ARM(Pair(BodyPart.RIGHT_SHOULDER, BodyPart.RIGHT_ELBOW)),
    RIGHT_FORE_ARM(Pair(BodyPart.RIGHT_ELBOW, BodyPart.RIGHT_WRIST)),
    LEFT_THIGH(Pair(BodyPart.LEFT_HIP, BodyPart.LEFT_KNEE)),
    LEFT_CALF(Pair(BodyPart.LEFT_KNEE, BodyPart.LEFT_ANKLE)),
    RIGHT_THIGH(Pair(BodyPart.RIGHT_HIP, BodyPart.RIGHT_KNEE)),
    RIGHT_CALF(Pair(BodyPart.RIGHT_KNEE, BodyPart.RIGHT_ANKLE))
}