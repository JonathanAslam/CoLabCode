import { useState, useEffect } from 'react'
import './Login.css'
import Button from '../../components/button/Button'


const Login = () => {
  const [hasAccount, setHasAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
  }

  return (
    <div className='login-page'>
      <div className='forms-container'>
        {hasAccount ? (
          //Login form
          < div className='form' onSubmit={handleSubmit}>
            <h1>Login</h1>
            <form action="" className='input-field'>
              <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              <button className='btn' type="submit">Login</button>
            </form>
          </div>
        ) : (
          //Create account form
          < div className='form' onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <form action="" className='input-field'>
              <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
              <input type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
              <button className='btn' type="submit">Create Account</button>
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

export default Login
