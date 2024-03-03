import React, { useContext, useCallback, useRef, useState, useEffect } from 'react'
import GlobalContext from '../../context/GlobalContext'
import '../../scss/components/_map_styles.scss'
import MapStyles from '../MapAssets/MapStyles'
import Loader from '../MapAssets/Loader'
import locationMarker from '../../assets/location.png'
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import Feedback from '../Feedback/Feedback'
import LocationDetails from './LocationDetails'
import { createRating } from '../StationsMap/LocationActions'

import AddFeeForm from '../StationsMap/Fee/AddFee'
import EditFeeForm from '../StationsMap/Fee/EditFee'

let mapContainerStyle = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
}

const options = {
  styles: MapStyles,
  disableDefaultUI: false,
  zoomControl: true,
  gestureHandling: 'greedy',
}

const LocationMap = (props) => {
  const gContext = useContext(GlobalContext)
  const mapRef = useRef()
  const [directionLoading, setDirectionLoading] = useState(false)
  const [directionText, setDirectionText] = useState(null)
  const [directionParams, setDirectionParams] = useState(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasRated, setHasRated] = useState(false)

  const [addFee, setAddFee] = useState(null)
  const [editFee, setEditFee] = useState(null)

  useEffect(() => {
    // lop through user ratings and find the one that matches the selected location
    if (gContext.userData && gContext.userData.ratings.data) {
      const rating = gContext.userData.ratings.data.find((rating) => {
        return rating.attributes.place_id === props.place_id
      })
      if (rating) {
        setRating(rating.rating)
        setHasRated(true)
      }
    }
  }, [gContext.selected, gContext.userData])

  const handleRating = (newRating) => {
    setRating(newRating / 20)
  }

  const handleSubmitRating = async () => {
    setLoading(true)
    const { place_id } = props
    const newRating = {
      place_id,
      rating,
      user: gContext.userData.id || null,
    }
    const data = await createRating(newRating)
    if (data) {
      setHasRated(true)
    }
    gContext.setRefreshRatings(new Date())
    setLoading(false)
    return data
  }

  const lat = parseFloat(props.lat)
  const lng = parseFloat(props.lng)

  const calculateAndDisplayRoute = useCallback(
    (directionsService, directionsDisplay, mode) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            const origin = { lat: latitude, lng: longitude }
            const destination = {
              lat: parseFloat(props.lat),
              lng: parseFloat(props.lng),
            }
            // clear previous route
            directionsService.route(
              {
                origin: origin,
                destination: destination,
                travelMode: mode,
              },
              (response, status) => {
                if (status === 'OK') {
                  setDirectionText({
                    distance: response.routes[0].legs[0].distance.text,
                    duration: response.routes[0].legs[0].duration.text,
                    mode: mode,
                  })
                  directionsDisplay.setDirections(response)
                } else {
                  window.alert('Directions request failed due to ' + status)
                }
                setDirectionLoading(false)
              }
            )
          },
          (error) => {
            alert('Please enable location services to use this feature')
            setDirectionLoading(false)
          }
        )
      }
    },
    [gContext, props.lat, props.lng]
  )

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
    const request = {
      placeId: props.place_id,
      fields: [
        'formatted_address',
        'name',
        'international_phone_number',
        'rating',
        'opening_hours',
        'user_ratings_total',
        'website',
        'place_id',
      ],
    }
    const service = new window.google.maps.places.PlacesService(mapRef.current)
    service &&
      service.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          gContext.setSelected(place)
          const directionsService = new window.google.maps.DirectionsService()
          const directionsRenderer = new window.google.maps.DirectionsRenderer()
          directionsRenderer.setMap(mapRef.current)
          setDirectionParams({
            directionsService,
            directionsRenderer,
          })
        }
      })
  }, [])

  const handleGetDirection = useCallback(
    (e) => {
      directionParams && e.preventDefault()
      setDirectionLoading(true)
      const { directionsService, directionsRenderer } = directionParams
      //remove old routes
      directionsRenderer.setDirections({ routes: [] })
      const mode = e.target.attributes['data-mode']
        ? e.target.attributes['data-mode'].value
        : 'DRIVING'
      calculateAndDisplayRoute(directionsService, directionsRenderer, mode)
    },
    [directionParams]
  )

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: gContext.libraries,
  })

  if (loadError) return <p>Error loading maps</p>
  if (!isLoaded) return <Loader />
  return (
    <>
      <AddFeeForm
        place={addFee}
        show={addFee}
        onClose={() => setAddFee(null)}
        User={gContext.userData ? gContext.userData.username : 'Anonymous'}
        onRefreshFees={gContext.setRefreshFees}
      />
      <EditFeeForm
        place={editFee}
        show={editFee}
        onClose={() => setEditFee(null)}
        User={gContext.userData ? gContext.userData.username : 'Anonymous'}
        onRefreshFees={gContext.setRefreshFees}
      />
      <div className="GoogleMapContainer">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={20}
          center={{ lat, lng }}
          options={options}
          onLoad={onMapLoad}
        >
          <Marker
            position={{ lat, lng }}
            animation={window.google.maps.Animation.DROP}
            icon={{
              url: locationMarker,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
            title={gContext.selected ? gContext.selected.name : ''}
            map={mapRef.current}
          />
        </GoogleMap>
        <div className="placeDetails show">
          {gContext.selected && (
            <>
              {!hasRated && (
                <Feedback
                  locationName={gContext.selected.name}
                  show={showFeedbackForm}
                  place_id={props.place_id}
                  onClose={() => {
                    setShowFeedbackForm(false)
                  }}
                  onRatingSubmit={handleSubmitRating}
                  onRatingChange={handleRating}
                  loading={loading}
                  rating={rating}
                />
              )}
              <LocationDetails
                onGetDirection={handleGetDirection}
                directionLoading={directionLoading}
                directionText={directionText}
                showFeedbackForm={!hasRated && showFeedbackForm}
                setShowFeedbackForm={!hasRated && setShowFeedbackForm}
                hasRated={hasRated}
                setEditFee={setEditFee}
                setAddFee={setAddFee}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default LocationMap
