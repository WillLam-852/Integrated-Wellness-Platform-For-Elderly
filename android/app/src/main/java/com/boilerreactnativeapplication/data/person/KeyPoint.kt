package com.boilerreactnativeapplication.data.person

data class KeyPoint (
    val bodyPart: BodyPart = BodyPart.HEAD,
    val position: Position = Position(),
    val visibility: Float = 0.0f
)