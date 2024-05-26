class User {
    id: number
    name: string
    email: string
    phone: string
    age: number
    gender: string
    height: number
    weight: number

    constructor(
        id: number,
        name: string,
        email: string,
        phone: string,
        age: number,
        gender: string,
        height: number,
        weight: number
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.phone = phone
        this.age = age
        this.gender = gender
        this.height = height
        this.weight = weight
    }
}

export default User
