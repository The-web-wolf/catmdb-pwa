import React from "react";

import { Link } from "gatsby";
import RatingStars from "../../components/MapAssets/RatingStars";

const StationCard = (props) => {
  const { details, onSelectedChange, children } = props;
  return (
    <div
      className={
        props.isSelected ? "card-container selected" : "card-container "
      }
      data-aos="fade-up"
      data-aos-duration="800"
      onClick={() => onSelectedChange(details)}
      id={details.place_id}
      onKeyDown={() => onSelectedChange(details)}
    >
      <div className="pt-5 px-xl-9 px-lg-7 px-7 pb-2 mw rounded hover-shadow-3 card-item  ">
        <div className="row">
          <div className="col-12">
            <div className="media align-items-center">
              <div className="square-3 d-block mr-5 mr-lg-8">
                <img
                  src={details.icon}
                  alt={details.name}
                  height={50}
                  width={50}
                />
              </div>
              <div className="w-100">
                <h3 className="mb-0 font-size-5 heading-default-color">
                  {details.name}
                </h3>
                <div className="row" style={{ width: "inherit" }}>
                  <div className="col-6 font-size-3 line-height-1">
                    {props.distance}
                  </div>
                  <div className="col-6 p-0 text-right ">
                    <RatingStars
                      rating={details.rating}
                      user_ratings_total={details.user_ratings_total}
                      place_id={details.place_id}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {children}
        <div className="row pt-5">
          <div className="col-12">
            <ul className="d-flex list-unstyled flex-wrap ">
              <li className="mt-2 mr-8 font-size-small d-flex">
                <Link
                  className="font-weight-semibold text-info"
                  to={`/atm/${details.geometry.location.lat()}~${details.geometry.location.lng()}~${
                    details.place_id
                  }`}
                >
                  <span className="fa fa-map-pin mr-4"></span>
                  {details.formatted_address}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Link
          className="getDirectionButton"
          to={`/atm/${details.geometry.location.lat()}~${details.geometry.location.lng()}~${
            details.place_id
          }`}
        >
          <i className="fa fa-location-arrow"></i>
        </Link>
      </div>
    </div>
  );
};

export default StationCard;
