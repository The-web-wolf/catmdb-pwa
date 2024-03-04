import React, { useState, useContext, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import authLogin from '../utils/auth/Login'
import GlobalContext from '../context/GlobalContext'
import { navigate, Link } from 'gatsby'
import Spinner from '../components/Core/Spinner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const [loginError, setLoginError] = useState('')
  const gContext = useContext(GlobalContext)

  useEffect(() => {
    if (gContext.isLoggedIn) {
      navigate('/profile')
    }
  }, [gContext.isLoggedIn])

  const onEmailChange = (e) => {
    const useremail = e.target.value
    //eslint-disable-next-line
    const isValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(useremail)
    useremail === '' || !isValid ? setEmailError('Please enter a valid email') : setEmailError('')
    setEmail(useremail)
  }
  const onPasswordChange = (e) => {
    const userpassword = e.target.value
    userpassword.length < 8
      ? setPasswordError('Password should be atleast 8 characters long')
      : setPasswordError('')
    setPassword(userpassword)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setLoginError('')
    const user = {
      email,
      password,
    }
    const data = await authLogin(user, setLoginError)
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
                <h2 className="font-size-9 text-center mb-11 text-info">Login with your email </h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                  <form name="Login" method="post" onSubmit={handleLogin}>
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="email"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          E-mail
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                          name="email"
                          required
                          value={email}
                          onInput={onEmailChange}
                        />
                        {emailError && (
                          <div className="text-warning font-weight-semibold font-size-3 mt-1">
                            {' '}
                            <span className="fa fa-exclamation-circle mr-1"></span> {emailError}
                          </div>
                        )}
                      </div>
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="password"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Your Password"
                          name="password"
                          required
                          value={password}
                          onInput={onPasswordChange}
                        />
                        {passwordError && (
                          <div className="text-warning font-weight-semibold font-size-3 mt-1">
                            {' '}
                            <span className="fa fa-exclamation-circle mr-1"></span> {passwordError}
                          </div>
                        )}
                      </div>

                      <div className="col-lg-12 pt-4">
                        {loginError && <div className="alert alert-danger">{loginError}</div>}
                        <button
                          type="submit"
                          className="btn btn-info text-uppercase w-100 h-px-48"
                          disabled={emailError || passwordError || loading}
                        >
                          Login {loading && <Spinner className="ml-4" />}
                        </button>
                        <div className="mt-5 font-size-3">
                          Don't Have An Account? <Link to="/signup">Create Account</Link>
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
export default Login
