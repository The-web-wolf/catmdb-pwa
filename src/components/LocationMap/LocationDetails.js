import React, { useContext } from 'react'
import RatingStars from '../MapAssets/RatingStars'
import GlobalContext from '../../context/GlobalContext'
import Fee from '../StationsMap/Fee/Fee'

const LocationDetails = (props) => {
  const gContext = useContext(GlobalContext)

  const { directionLoading, directionText, onGetDirection } = props
  return (
    <div className="placeDetails__container">
      <div className="placeDetails__container__name">{gContext.selected.name}</div>
      <div className="my-5">
        <Fee
          place_id={gContext.selected.place_id}
          onAddFee={() =>
            props.setAddFee({
              place_id: gContext.selected.place_id,
              place_name: gContext.selected.name,
            })
          }
          onEditFee={(fee) =>
            props.setEditFee({
              place_id: gContext.selected.place_id,
              place_name: gContext.selected.name,
              fee_id: fee.id,
              fee_amount: fee.amount,
              fee_currency: fee.currency,
            })
          }
        />
      </div>
      <div className="placeDetails__container__address">
        <span className="fa fa-map-pin mr-5"></span>
        {gContext.selected.formatted_address}
      </div>
      <div className="row phone_rating">
        <div className="col-7">
          <div className="placeDetails__container__phone">
            {gContext.selected.international_phone_number && (
              <>
                <span className="fa fa-address-book mr-2"></span>{' '}
                {gContext.selected.international_phone_number}
              </>
            )}
          </div>
        </div>
        <div className="col-5">
          <div className="placeDetails__container__rating float-right">
            <RatingStars
              rating={gContext.selected.rating}
              user_ratings_total={gContext.selected.user_ratings_total}
              place_id={gContext.selected.place_id}
            />
          </div>
        </div>
      </div>

      <div className="placeDetails__container__buttons">
        <h5>Get Direction</h5>
        <div className="row mb-3">
          <div className="col-12 col-sm-7">
            <div className="placeDetails__container__website">
              {gContext.selected.website && (
                <a href={gContext.selected.website} target="_blank" rel="noreferrer">
                  <span className="fa fa-link mr-4"></span>

                  {gContext.selected.website}
                </a>
              )}
            </div>
          </div>
          <div className="col-12 col-sm-5 ">
            <div className="placeDetails__container__opennow">
              <span className="fa fa-clock mr-4"></span>
              {gContext.selected.opening_hours && gContext.selected.opening_hours.open_now
                ? 'Open'
                : 'Closed'}
            </div>
          </div>
        </div>
        {directionLoading ? (
          <>
            <span className="fa fa-spinner fa-spin mr-4"></span> Loading Direction
          </>
        ) : (
          <div className="buttons">
            <button
              className={
                directionText && directionText.mode === 'DRIVING'
                  ? 'btn btn-info'
                  : 'btn btn-outline-info'
              }
              onClick={onGetDirection}
              data-mode="DRIVING"
              aria-label="Driving"
            >
              <span className="fa fa-car"></span>
            </button>
            <button
              className={
                directionText && directionText.mode === 'WALKING'
                  ? 'btn btn-info'
                  : 'btn btn-outline-info'
              }
              onClick={onGetDirection}
              data-mode="WALKING"
              aria-label="walking"
            >
              <span className="fa fa-walking"></span>
            </button>
            <button
              className={
                directionText && directionText.mode === 'TRANSIT'
                  ? 'btn btn-info'
                  : 'btn btn-outline-info'
              }
              onClick={onGetDirection}
              data-mode="TRANSIT"
              aria-label="transit"
            >
              <span className="fa fa-bus"></span>
            </button>
          </div>
        )}
        {!directionLoading && directionText && (
          <div className="placeDetails__container__buttons__direction">
            <div className="placeDetails__container__buttons__direction__distance">
              {directionText.distance}
            </div>
            <div className="placeDetails__container__buttons__direction__duration">
              {directionText.duration}
            </div>
          </div>
        )}
      </div>
      <div className="placeDetails__container__feeback mt-10">
        {!props.hasRated ? (
          <h4 className="fancy-link">
            <button
              className="text-info"
              onClick={() => {
                props.setShowFeedbackForm(!props.showFeedbackForm)
              }}
            >
              Been here? Tell us about it
            </button>
          </h4>
        ) : (
          <h4 className="fancy-link">Thank you for rating this location!</h4>
        )}
      </div>
    </div>
  )
}

export default LocationDetails
