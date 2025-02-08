import { useState } from "react";
import styles from "./Signup.module.css";
import TextInput from "../../TextInput/TextInput";
import signupSchema from "../../../Schemas/signupSchema";
import { useFormik } from "formik";
import { signup } from "../../../API/internal";
import { setUser } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleSignup = async () => {
    const data = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    const response = await signup(data);

    if (response.status === 201) {
      const user = {
        _id: response.data.user._id,
        email: response.data.user.email,
        username: response.data.user.username,
        auth: response.data.auth,
      };
      // console.log("API Response:", user);
      dispatch(setUser(user));
      navigate("/");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };

  const { values, touched, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
  });

  return (
    <>
      <div className={styles.signupWrapper}>
        <div className={styles.signupHeader}>Create an account</div>
        <TextInput
          type="text"
          value={values.name}
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="name"
          error={errors.name && touched.name ? 1 : undefined}
          errormessage={errors.name}
        />
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
          type="text"
          value={values.email}
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="email"
          error={errors.email && touched.email ? 1 : undefined}
          errormessage={errors.email}
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

        <TextInput
          type="password"
          value={values.confirmPassword}
          name="confirmPassword"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="confirm password"
          error={
            errors.confirmPassword && touched.confirmPassword ? 1 : undefined
          }
          errormessage={errors.confirmPassword}
        />
        <button
          onClick={handleSignup}
          className={styles.SignupButton}
          disabled={
            !values.username ||
            !values.password ||
            !values.confirmPassword ||
            !values.name ||
            !values.email ||
            errors.username ||
            errors.password ||
            errors.confirmPassword ||
            errors.name ||
            errors.email
          }
        >
          Log In
        </button>
        <span>
          Already have an account?
          <button onClick={() => navigate("/login")} className={styles.login}>
            Log In
          </button>
        </span>
        {/* {error != '' ? <p className={styles.errorMessage}>{error}</p> : ""} */}
      </div>
    </>
  );
};

export default Signup;
