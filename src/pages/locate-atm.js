import React, { useState, useContext, useEffect } from 'react'
import PageWrapper from '../components/PageWrapper'
import StationsMap from '../components/StationsMap/StationsMap'
import GlobalContext from '../context/GlobalContext'

const LocateAtm = () => {
  const [showMap, setShowMap] = useState(false)
  const [foundLocations, setFoundLocations] = useState([])
  const gContext = useContext(GlobalContext)

  const handleMapShow = () => {
    setShowMap((showMap) => !showMap)
  }

  const handleSetFoundLocations = (locations) => {
    setFoundLocations(locations)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        gContext.handleLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (err) => alert(err.message)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mapContainerStyle = {
    position: 'fixed',
    top: '0px',
    left: '0px',
    width: '100vw',
    height: '100vh',
    display: showMap ? 'block' : 'none',
  }

  return (
    <PageWrapper>
      {gContext.location && (
        <StationsMap
          showMap={showMap}
          onMapShow={handleMapShow}
          center={gContext.location}
          foundLocations={foundLocations}
          onSetFoundLocations={handleSetFoundLocations}
          mapContainerStyle={mapContainerStyle}
        />
      )}
    </PageWrapper>
  )
}
export default LocateAtm
