import { useState } from "react";
import styles from "./Login.module.css";
import TextInput from "../../TextInput/TextInput";
import loginSchema from "../../../Schemas/loginSchema";
import { useFormik } from "formik";
import { login } from "../../../API/internal";
import { setUser } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleLogin = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };
    const response = await login(data);

    if (response.status === 200) {
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      console.log("API Response:", user);
      dispatch(setUser(user));
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
  });

  return (
    <>
      <div className={styles.loginWrapper}>
        <div className={styles.loginHeader}>Log in to your account</div>
        <TextInput
          type="text"
          value={values.username}
          name="username"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="username"
          error={errors.username && touched.username ? 1 : undefined}
          errormessage={errors.username}
        />
        <TextInput
          type="password"
          value={values.password}
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="password"
          error={errors.password && touched.password ? 1 : undefined}
          errormessage={errors.password}
        />
        <button
          onClick={handleLogin}
          className={styles.logInButton}
          disabled={
            !values.username ||
            !values.password ||
            errors.username ||
            errors.password
          }
        >
          Log In
        </button>
        {/* {error != '' ? <p className={styles.errorMessage}>{error}</p> : ""} */}
        <span>
          Don't have an account?
          <button
            onClick={() => navigate("/signup")}
            className={styles.createAccount}
          >
            Register
          </button>
        </span>
      </div>
    </>
  );
};

export default Login;
