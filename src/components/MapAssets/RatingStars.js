import React, { useState, useEffect, useContext } from "react";
import { Rating } from "react-simple-star-rating";
import { getRatings } from "../StationsMap/LocationActions";
import GlobalContext from "../../context/GlobalContext";

export default function RatingStars(props) {
  const { place_id } = props;
  const [ratingValue, setRatingValue] = useState(null);
  const [user_ratings_totalValue, setUser_ratings_totalValue] = useState(null);
  const gContext = useContext(GlobalContext);

  const propsRatingTotal = props.user_ratings_total || 0;
  const propsRating = props.rating || 0;

  useEffect(() => {
    const place_ratings = async () => {
      const ratings = await getRatings(place_id);
      if (ratings && ratings.rating) {
        if (propsRatingTotal === 0) {
          setUser_ratings_totalValue(ratings.user_ratings_total);
          setRatingValue(ratings.rating);
        } else {
          setUser_ratings_totalValue(
            propsRatingTotal + ratings.user_ratings_total
          );
          setRatingValue((propsRating + ratings.rating) / 2);
        }
      } else {
        setUser_ratings_totalValue(propsRatingTotal);
        setRatingValue(propsRating);
      }
    };
    place_ratings();
  }, [gContext.refreshRatings]);

  return ratingValue ? (
    <div
      style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center"
      }}
    >
      <Rating
        readonly
        ratingValue={ratingValue * 20}
        size={20}
        fillColor="#1d9caf"
        emptyColor="grey"
      />
      <span
        className="text-muted mt-2"
      >
        ({user_ratings_totalValue ? user_ratings_totalValue : "0"})
      </span>
    </div>
  ) : null;
}
