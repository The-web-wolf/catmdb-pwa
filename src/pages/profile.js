import React, { useContext, useEffect, useState } from 'react'
import { Link, navigate } from 'gatsby'
import PageWrapper from '../components/PageWrapper'
import ProfileSidebar from '../components/ProfileSidebar'
import GlobalContext from '../context/GlobalContext'
import Spinner from '../components/Core/Spinner'
import { updateUser } from '../utils/auth/User'

const UserProfile = () => {
  const gContext = useContext(GlobalContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
    e.target.value === '' ? setError('Please enter your first name') : setError(null)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
    e.target.value === '' ? setError('Please enter your last name') : setError(null)
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
    e.target.value === '' ? setError('Please enter your username') : setError(null)
  }
  const handleLocationChange = (e) => {
    setLocation(e.target.value)
    e.target.value === '' ? setError('Please enter your location') : setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const user = {
      firstName,
      lastName,
      username,
      location,
      id: gContext.userData.id,
    }
    const data = await updateUser(user, setError)
    if (data) {
      gContext.setUserData(data)
      setLoading(false)
      // smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (!gContext.isLoggedIn) {
      navigate('/login')
    } else {
      setFirstName(gContext.userData.firstName)
      setLastName(gContext.userData.lastName)
      setUsername(gContext.userData.username)
      setLocation(gContext.userData.location)
    }
  }, [gContext.isLoggedIn, gContext.userData])

  return (
    <>
      <PageWrapper headerConfig={{ button: 'profile' }}>
        <div className="bg-dark pt-10 pt-lg-15 pb-7 pb-lg-23">
          <div className="container">
            {/* <!-- back Button --> */}
            <div className="row">
              <div className="col-12 mt-13 dark-mode-texts">
                <div className="mb-9">
                  <Link to="/locate-atm" className="d-flex align-items-center ml-4">
                    {' '}
                    <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                    <span className="text-uppercase font-size-3 font-weight-bold text-light">
                      Back
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {/* <!-- back Button End --> */}
            <div className="row">
              <div className="col-12 col-xl-4 col-lg-4 col-md-12 col-xs-10 mb-11 mb-lg-0">
                <ProfileSidebar className="mr-0 mr-xl-17" />
              </div>
              <div className="col-12 col-xl-8 col-lg-8">
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                  <h2 className="font-size-9 text-center mb-11 text-info">Update profile info </h2>
                  <form name="UpdateUser" method="post" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="firstName"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          required
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="lastName"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name"
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          required
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="location"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Location
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Location"
                          id="location"
                          name="location"
                          autoComplete="street-address"
                          required
                          value={location}
                          onChange={handleLocationChange}
                        />
                      </div>
                      <div className="col-12 col-md-6 mb-7">
                        <label
                          htmlFor="username"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Username
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
                          onChange={handleUsernameChange}
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
                            error || loading || !username || !firstName || !lastName || !location
                          }
                        >
                          Update Information{' '}
                          {loading ? (
                            <Spinner className="ml-4" />
                          ) : (
                            <span className="fa fa-save ml-4"></span>
                          )}
                        </button>
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
export default UserProfile
