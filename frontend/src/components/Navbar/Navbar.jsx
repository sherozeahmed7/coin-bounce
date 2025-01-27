import {NavLink} from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = () => {
  const isAuthenticated = false;
  return (
    <>
    <nav className={styles.navbar}>
        
        <NavLink to="/" className={`${styles.logo} ${styles.inActiveStyle  }`} >CoinBounce</NavLink>
        
        <NavLink to="/" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>Home</NavLink>
        <NavLink to="crypto" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>Cryptocurrencies</NavLink>
        <NavLink to="blogs" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>Blogs</NavLink>
        <NavLink to="submit" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}>Submit a Blog</NavLink>
        {isAuthenticated ? <NavLink><button className={styles.signOutButton}>logout</button></NavLink> : 
        <div>
        <NavLink to="login" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}> <button className={styles.logInButton}>Log In</button></NavLink>
        <NavLink to="signup" className={({isActive}) => isActive ? styles.activeStyle : styles.inActiveStyle}> <button className={styles.signUpButton}>Sign Up</button></NavLink> </div>}
    </nav>
    <div className={styles.separator}></div>
    
    
    
    </>
  )
}

export default Navbar
