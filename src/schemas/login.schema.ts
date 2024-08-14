import {object, string} from "zod"

const loginSchema = object({
    email: string({required_error:"email is required"}).email("email is not valid"),
    password: string({required_error:"password is required"}).min(8, "Password must be at least 8 characters long")
})

export default loginSchema;