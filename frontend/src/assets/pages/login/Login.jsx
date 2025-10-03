import { useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './Login.css'
import Button from '../../components/button/Button'


const Login = () => {
  // page navigation
  const navigate = useNavigate();

  const [hasAccount, setHasAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in:", username, email, password);
  }

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Created Account", username, email, password);
  }

  return (
    <div className='login-page'>
      <Button 
      className='back-btn'
      text="< Back"
      onClick={() => navigate(-1)} // move back a page with -1
      />
      <div className='forms-container'>
        {hasAccount ? (
          //Login form
          < div className='form' onSubmit={handleLogin}>
            <h1>Login</h1>
            <form action="" className='form-inputs'>
              <input className='input-field' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              <input className='input-field' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <input className='input-field' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              <button className='btn' type="submit">Login</button>
            </form>
          </div>
        ) : (
          //Create account form
          < div className='form' onSubmit={handleCreateAccount}>
            <h1>Create Account</h1>
            <form action="" className='form-inputs'>
              <input className='input-field' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              <input className='input-field' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <input className='input-field' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              <button className='btn' type="submit">Create Account</button>
            </form>
          </div >
        )}
        <Button
          text={hasAccount ? "Don't Have An Account? Create One Here!" : "Have An Account? Login Here!"} onClick={() => setHasAccount(!hasAccount)}
        />
      </div>
    </div >
  )
}

export default Login
