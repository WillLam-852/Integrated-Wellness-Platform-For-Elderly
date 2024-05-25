export const E1 = require("./E1.png")
export const E2 = require("./E2.png")
export const E3 = require("./E3.png")

const index: {
    [key: number]: any
} = {
    1: E1,
    2: E2,
    3: E3,
}

export const getExerciseIcon = (id: number) => {
    return index[id]
}
