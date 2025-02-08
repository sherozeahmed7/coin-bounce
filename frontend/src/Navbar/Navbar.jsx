import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useSelector } from "react-redux";
import { signout } from "../API/internal";
import { resetUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import Home from "../components/pages/Home/Home";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.user.auth);
  const dispatch = useDispatch();

  const handleSignout = async () =>{
    await signout();
    dispatch(resetUser());
  }
  return (
    <>
      <nav className={styles.navbar}>
        <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle}`}>
          CoinBounce
        </NavLink>

        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
        
          Home
        </NavLink>
        <NavLink
          to="crypto"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Cryptocurrencies
        </NavLink>
        <NavLink
          to="blogs"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Blogs
        </NavLink>
        <NavLink
          to="submit"
          className={({ isActive }) =>
            isActive ? styles.activeStyle : styles.inActiveStyle
          }
        >
          Submit a Blog
        </NavLink>
        {isAuthenticated ? (
          <NavLink>
            <button onClick={handleSignout} className={styles.signOutButton}>logout</button>
          </NavLink>
        ) : (
          <div>
            <NavLink
              to="login"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              {" "}
              <button className={styles.logInButton}>Log In</button>
            </NavLink>
            <NavLink
              to="signup"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.inActiveStyle
              }
            >
              {" "}
              <button className={styles.signUpButton}>Sign Up</button>
            </NavLink>{" "}
          </div>
        )}
      </nav>
      <div className={styles.separator}></div>
    </>
  );
};

export default Navbar;
