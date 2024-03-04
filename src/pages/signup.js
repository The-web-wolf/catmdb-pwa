import React, { useState, useContext, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import SignupAuth from '../utils/auth/Signup'
import { navigate, Link } from 'gatsby'
import Spinner from '../components/Core/Spinner'
import GlobalContext from '../context/GlobalContext'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const gContext = useContext(GlobalContext)

  useEffect(() => {
    if (gContext.isLoggedIn) {
      navigate('/profile')
    }
  }, [gContext.isLoggedIn])

  const onUsernameChange = (e) => {
    const username = e.target.value
    username === '' ? setError('Please enter your username') : setError(null)
    setUsername(username)
  }
  const onEmailChange = (e) => {
    const email = e.target.value
    const isValid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
    // const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    email === '' || !isValid ? setError('Please enter a valid email') : setError(null)
    setEmail(email)
  }
  const onPasswordChange = (e) => {
    const password = e.target.value
    password === '' || password.length < 8
      ? setError('Password should be atleast 8 characters')
      : setError(null)
    setPassword(password)
  }
  const onPassword2Change = (e) => {
    const password2 = e.target.value
    password2 === '' || password !== password2 ? setError('Passwords do not match') : setError(null)
    setPassword2(password2)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const user = {
      username,
      email,
      password,
    }
    const data = await SignupAuth(user, setError)
    if (data) {
      gContext.setUserData(data)
      gContext.setIsLoggedIn(true)
      navigate('/profile')
    }
    setLoading(false)
  }

  return (
    <>
      <PageWrapper>
        <div className="mapBg">
          <div className="container h-75">
            <div className="row align-items-center h-100">
              <div className="col-xxl-5 col-xl-6 col-lg-7">
                <h2 className="font-size-9 text-center mb-11 text-info">Create an account </h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                  <form name="Signup" method="post" onSubmit={handleSignup}>
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="email"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Enter Your E-mail Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                          id="email"
                          name="email"
                          autoComplete="email"
                          required
                          value={email}
                          onInput={onEmailChange}
                        />
                      </div>
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="username"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Choose A Username
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Username"
                          name="username"
                          id="username"
                          autoComplete="username"
                          required
                          value={username}
                          onInput={onUsernameChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="password"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Choose A Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Choose Password"
                          id="password"
                          name="password"
                          autoComplete="off"
                          required
                          value={password}
                          onInput={onPasswordChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="password2"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Confirm Your Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          id="password2"
                          autoComplete="off"
                          required
                          value={password2}
                          onInput={onPassword2Change}
                        />
                      </div>
                      <div className="col-lg-12 pt-4">
                        {error && (
                          <div className="text-warning text-center font-size-3 font-weight semibold mb-2">
                            <span className="fa fa-exclamation-circle"></span> {error}
                          </div>
                        )}
                        <button
                          type="submit"
                          className="btn btn-info text-uppercase w-100 h-px-48"
                          disabled={
                            error ||
                            loading ||
                            !email ||
                            !username ||
                            !password ||
                            !password2 ||
                            password !== password2
                          }
                        >
                          Create Account{' '}
                          {loading ? (
                            <Spinner className="ml-4" />
                          ) : (
                            <span className="fa fa-arrow-right ml-4"></span>
                          )}
                        </button>
                        <div className="mt-5 font-size-3">
                          Already have an account? <Link to="/login">Login</Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  )
}
export default Signup
