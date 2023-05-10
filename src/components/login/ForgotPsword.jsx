import React, { useContext } from 'react'
import className from './Login.css'
import { Link } from 'react-router-dom'
import UserContext from '../../Context/UserContext'
const ForgotPsword = () => {
  const hellow =useContext(UserContext)
  console.log(hellow.userState.token)
  return (
    <>
<div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="" class="sign-in-form">
          <h2 class="title">Forget Password</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input type="text" name="usuario" autocomplete="username" placeholder="Username" required="yes"/>
          </div>
          <button class="btn solid">recover</button>
          {/* <p class="social-text">You can login with:</p> */}
         <Link to="/login" >Login Page ?</Link>

      
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        {/* <div class="content">
          <h3>You don't have an account?</h3>
          <p>Create your account right now to follow people and like publications</p>
          <button class="btn transparent" id="sign-up-btn">Register</button>
        </div> */}
        {/* <img src="img/log.svg" class="image" alt=""> */}
      </div>

      <div class="panel right-panel">
        <div class="content">
          <h3>Already have an account?</h3>
          <p>Login to see your notifications and post your favorite photos</p>
          <button class="btn transparent" id="sign-in-btn">Sign in</button>
        </div>
        {/* <img src="img/register.svg" class="image" alt=""> */}
      </div>
    </div>
  </div>

    </>
  )
}

export default ForgotPsword