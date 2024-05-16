import * as Yup from 'yup'

const emailRegex = new RegExp(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

const signupSchema = Yup.object({
    email: Yup.string().matches(emailRegex, "Please Enter The Valid Email").required("Please Enter The Email"),
    password: Yup.string().matches(passwordRegex, "Must have Capital, small, special characters min length of 8").required("Please Enter The Password"),
})
export default signupSchema