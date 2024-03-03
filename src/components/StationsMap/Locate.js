import React, { useContext, } from "react";
import GlobalContext from "../../context/GlobalContext";
import compassIcon from "../../assets/compasses.png";

function Locate({ getAtms }) {
  const gContext = useContext(GlobalContext);

  const handleLocateClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getAtms &&
          getAtms(true, {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        gContext.handleLocationChange({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => alert(err.message)
    );
  };

  return (
    <button className="locate-me" onClick={handleLocateClick}>
      <img src={compassIcon} alt="compass - locate me" />
    </button>
  );
}
export default Locate;
