import styles from "./App.module.css";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./Footer/Footer";
import Home from "./components/pages/Home/Home";
import Protected from "./Protected/Protected";
import Error from "./components/pages/Error/Error";
import Login from "./components/pages/Login/Login"
import { useSelector } from "react-redux";
import  Signup  from "./components/pages/signup/signup";
import Crypto from "./components/pages/Crypto/Crypto";

function App() {
  const isAuth = useSelector(state => state.user.auth);
  return (
    <>
      <div className={styles.container}>
        <BrowserRouter>
          <div className={styles.layout}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                exact
                element={
                  <div className={styles.main}>
                    <Home />
                  </div>
                }
              />

              <Route
                path="/crypto"
                exact
                element={
                  <div className={styles.main}>
                
                    <Crypto />
                  </div>
                }
              />
              <Route
                path="/blogs"
                exact
                element={
                  <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    Blog Page
                    {/* <Blogs /> */}
                  </div>
                  </Protected>
                }
              />
              <Route
                path="/submit"
                exact
                element={
                  <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    Submit Page
                    {/* <Submit /> */}
                  </div>
                  </Protected>
                }
              />
              <Route
                path="/login"
                exact
                element={
                  <div className={styles.main}>
                   
                    <Login />
                  </div>
                }
              />
              <Route
                path="/signup"
                exact
                element={
                  <div className={styles.main}>
                    <Signup />
                  </div>
                }
              />

              <Route
              path="*"
              exact
              element={
                <div className={styles.main}>
                  <Error/>
                </div>
              }
              />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
