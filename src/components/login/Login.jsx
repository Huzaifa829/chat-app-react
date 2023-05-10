import axios from 'axios';
import React, { useState,useContext } from 'react'
import className from './Login.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import UserContext from '../../Context/UserContext';

import Swal from 'sweetalert2'

// CommonJS
const LoginPage = () => {
  const user = useContext(UserContext);
  const Swal = require('sweetalert2')
  const [addemail, setemail] = useState('');
  const [addpassword, setpasword] = useState('');
  let location = useLocation();
  let navigation = useNavigate();
  const email_text = (event) => {
    setemail(event.target.value)

  }
  const password_text = (event) => {
    setpasword(event.target.value)

  }
  const Login = async () => {
    try {
        const response = await axios.post('https://cloud1.sty-server.com/api/login-user',
        {
          email: addemail,
          password: addpassword
        })
        if (response.status == 200) {
          user.setUserState({
            token:'huziafa'
          })
          console.log('done', response.status)
          console.log(location.pathname);
          navigation('/')
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Successfully Login',
            showConfirmButton: false,
            timer: 1500
          })
        }
        else {
        }
        
      } catch (error) {
        console.log('not working',error)
        Swal.fire({
          title: 'Error!',
          text: `Email Don't not Exist`,
          icon: 'error',
          confirmButtonText: 'Okay'
        })
        
      }
  }
  return (
    <>
      <div class="container">
        <div class="forms-container">
          <div class="signin-signup">
            <form action="" class="sign-in-form">
              <h2 class="title">Login</h2>
              <div class="input-field">
                <i class="fas fa-user"></i>
                <input onChange={email_text} type="text" name="usuario" autocomplete="username" placeholder="Username" required="yes" />
              </div>
              <div class="input-field">
                <i class="fas fa-lock"></i>
                <input onChange={password_text} type="password" name="contraseña" autocomplete="current-password" placeholder="Password" id="id_password" required="yes" />
              </div>

              <button onClick={Login}class="btn solid">Sign in</button>
              {/* <p class="social-text">You can login with:</p> */}
              <Link to="/forget-password" >Forget Password ?</Link>
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

export default LoginPage

