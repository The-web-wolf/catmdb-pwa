import React, { useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import GlobalContext from '../../context/GlobalContext'
import Title from '../Core/Title'
import { Link } from 'gatsby'

const Feedback = (props) => {
  const gContext = useContext(GlobalContext)
  return (
    <div
      className={props.show ? 'feedbackContainer show' : 'feedbackContainer'}
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="feedbackForm">
        <div className="feedbackForm__header">
          <p className="feedbackForm__header__subtitle">
            How would you rate your experience at{' '}
            <span>{props.locationName || 'this location'} </span>
          </p>
        </div>
        <div className="feedbackForm__body pt-5">
          <Rating
            onClick={props.onRatingChange}
            initialValue={props.rating}
            size={40}
            label
            allowFraction
            allowHover
            transition
            fillColor="#1d9caf"
            emptyColor="grey"
            showToolTip={true}
            tooltipArray={['Terrible', 'Bad', 'OK', 'Good', 'Great']}
            tooltipStyle={{
              backgroundColor: '#1d9caf',
              color: 'white',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0px 0px 5px #1d9caf',
              zIndex: '10000',
            }}
          />
          {gContext.userLoggedIn() ? (
            <button
              className="feedbackForm__body__button mt-10 mb-5"
              onClick={props.onRatingSubmit}
              disabled={props.loading}
            >
              Share rating{' '}
              <span
                className={props.loading ? 'fa fa-spinner fa-spin ml-3' : 'fa fa-comment ml-3'}
              ></span>{' '}
            </button>
          ) : (
            <div className="mt-3">
              <Title variant="pre" className="text-muted">
                Login to rate this place
              </Title>
              <Link to="/login" className="btn btn-outline-warning btn-sm">
                {' '}
                Login{' '}
              </Link>
            </div>
          )}
          <span
            className="text-danger mt-5 d-block close-feedback-form"
            onClick={props.onClose}
            onKeyDown={props.onClose}
          >
            I haven't been here
          </span>
        </div>
      </div>
    </div>
  )
}
export default Feedback
