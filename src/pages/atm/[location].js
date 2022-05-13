import React from "react";
import PageWrapper from "../../components/PageWrapper";
import LocationMap from "../../components/LocationMap";

const Atm = (props) => {
  const { location } = props.params;
  let lat;
  let lng;
  let place_id;
  if (location) {
    lat = location.split("~")[0];
    lng = location.split("~")[1];
    place_id = location.split("~")[2];
  }
  return (
    <PageWrapper>
      <LocationMap lat={lat} lng={lng} place_id={place_id} />
    </PageWrapper>
  );
};
export default Atm;
