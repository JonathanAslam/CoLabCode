import { useState, useEffect } from 'react'
import './Login.css'
import Button from '../../components/button/Button'


const login = () => {

  const [hasAccount, setHasAccount] = useState(false);

  // useEffect(() => {


  // }, []);


  return (
    <div className='login-page'>
      <div className='forms-container'>
        {hasAccount ? (
          //Login form
          < div className='form'>
            <h1>Login</h1>
            <form action="" className='input-field'>
              <input type="text" placeholder='Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <button className='btn'>Login</button>
            </form>
          </div>
        ) : (
          //Create account form
          < div className='form' >
            <h1>Create Account</h1>
            <form action="" className='input-field'>
              <input type="text" placeholder='Username' />
              <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
              <button className='btn'>Create Account</button>
            </form>
          </div >
        )}
        <Button
          text={hasAccount ? "Don't Have An Account? Create One Here!" : "Have An Account. Login Here!"} onClick={() => setHasAccount(!hasAccount)}
        />
      </div>
    </div >
  )
}

export default login
