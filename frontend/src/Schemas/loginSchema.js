import * as yup from 'yup';

const passwordPattern =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

  const errorMessage = 'user lowercase, uppercase and digits';

const loginSchema = yup.object().shape({
    username: yup.string().min(5).max(30).required("Username is required"),
    password: yup.string().min(8).max(25).matches(passwordPattern, {message: errorMessage}).required()
})

export default loginSchema;