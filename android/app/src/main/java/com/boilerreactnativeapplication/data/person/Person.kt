package com.boilerreactnativeapplication.data.person

import com.boilerreactnativeapplication.data.person.KeyPoint

data class Person (
    val keyPoints: MutableList<KeyPoint> = MutableList(13){ KeyPoint() },
    val missingPoint: Int = 0
)