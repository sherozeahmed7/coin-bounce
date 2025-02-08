import React from 'react'
import styles from "../Error/Error.module.css"
import Home from '../Home/Home'
import { Link } from 'react-router-dom'
const Error = () => {
  return (
    <div className={styles.errorWrapper}>
      <div className={styles.errorHeader}>Error 404 - Page not found</div>
      <div className={styles.errorBody}>Go Back to &nbsp;
        <Link className={styles.errorHomeLink} to='/'>
       home
        </Link>
        </div>
    </div>
  )
}

export default Error
