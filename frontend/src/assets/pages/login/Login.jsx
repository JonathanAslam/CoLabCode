import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import Button from '../../components/button/Button'

import Image1 from '../../images/LoginImage1.jpeg'
import Image2 from '../../images/LoginImage2.jpeg'
import Image3 from '../../images/LoginImage3.jpeg'

const Login = () => {
  // page navigation
  const navigate = useNavigate();

  const [hasAccount, setHasAccount] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // states for form submission, use to prevent user interaction during form submission
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // array for images for logo section background, 3-4 images total
  const images = [Image1, Image2, Image3]


  // image carousel effect for logo section background
  const imageCarousel = () => {
    let index = 0;
    const logoSection = document.getElementsByClassName('.image-display');
    setInterval(() => {
      logoSection.style.backgroundImage = `url(${images[index]})`;
      index = (index + 1) % images.length;
    }, 5000);
  }

  useEffect(() => {
    imageCarousel();
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in:", username, email, password);
    setLoading(true);
    setError(null);
    try {


      // Placeholder for actual login logic
      // On successful login, navigate to dashboard
      
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateAccount = (e) => {
    e.preventDefault();
    console.log("Created Account:", username, email, password);
    setLoading(true);
    setError(null);
    try {

      // Placeholder for actual account creation logic
      // On successful account creation, navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error("Account creation failed:", error);
      setError(error.message || "Account creation failed");
    } finally {
      setLoading(false);
    }

  }

  const handleFormToggle = () => {
    setHasAccount(!hasAccount);
    // clear input fields
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className='login-page'>
      {/* return back button */}
      <Button
        className='back-btn'
        text="< Back"
        onClick={() => navigate(-1)} // move back a page with -1
      />


      {/* logo section */}
      <div className='logo-section'>
        <div className='image-display'>
          <h1>CoLab Code</h1>
        </div>
      </div>

      {/* form section */}
      <div className='form-section'>
        <div className='forms-container'>
          {hasAccount ? (
            //Login form
            <div className='form' >
              <h1>Login</h1>
              <form action="" className='form-inputs' onSubmit={handleLogin}>
                <input className='input-field' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <input className='input-field' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='input-field' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='btn' type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>
          ) : (
            //Create account form
            < div className='form' >
              <h1>Create Account</h1>
              <form action="" className='form-inputs' onSubmit={handleCreateAccount}>
                <input className='input-field' type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                <input className='input-field' type="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
                <input className='input-field' type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
                <button className='btn' type="submit" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>        
              </form>
            </div >
          )}
        </div>
        <Button
          text={hasAccount ? "Don't Have An Account? Create One Here!" : "Have An Account? Login Here!"} onClick={handleFormToggle}
        />
      </div>
    </div >
  )
}

export default Login
