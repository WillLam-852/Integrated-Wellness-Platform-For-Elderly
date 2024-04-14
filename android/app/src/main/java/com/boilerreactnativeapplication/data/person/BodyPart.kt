package com.boilerreactnativeapplication.data.person

enum class BodyPart(val indexInBlazePose: Int, val indexInPerson: Int) {
    HEAD(0, 0),
    LEFT_SHOULDER(11, 1),
    RIGHT_SHOULDER(12, 2),
    LEFT_ELBOW(13, 3),
    RIGHT_ELBOW(14, 4),
    LEFT_WRIST(15, 5),
    RIGHT_WRIST(16, 6),
    LEFT_HIP(23, 7),
    RIGHT_HIP(24, 8),
    LEFT_KNEE(25, 9),
    RIGHT_KNEE(26, 10),
    LEFT_ANKLE(27, 11),
    RIGHT_ANKLE(28, 12)
}