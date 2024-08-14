import {object, string, TypeOf} from "zod"

const userSchema = object({
    name: string({required_error:"Name is required"}),
    email: string({required_error:"email is required"}).email("email is not valid"),
    password: string({required_error:"password is required"}).min(8, "Password must be at least 8 characters long")
})

export default userSchema;