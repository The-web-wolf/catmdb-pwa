import React, { useContext, useEffect } from 'react'
import { navigate } from 'gatsby'
import GlobalContext from '../context/GlobalContext'
import Spinner from '../components/Core/Spinner'

const Logout = () => {
  const gContext = useContext(GlobalContext)

  useEffect(() => {
    if (gContext.userLoggedIn()) {
      localStorage.removeItem('token')
      localStorage.removeItem('id')
      gContext.setIsLoggedIn(false)
      gContext.setUserData(null)
    }
    navigate('/login')
  }, [gContext])

  return (
    <div className="pos-abs-tr top-0 bottom-0 left-0 h-100 w-100 d-flex justify-content-center align-items-center font-size-5">
      <Spinner className="mr-4" /> Logging you out...
    </div>
  )
}

export default Logout
