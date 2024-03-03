import React, { useState, useEffect } from "react";
import authUser from "../utils/auth/User";

const GlobalContext = React.createContext();

const GlobalProvider = ({ children }) => {
  const [visibleOffCanvas, setVisibleOffCanvas] = useState(false);
  const [location, setLocation] = useState(null);
  const [selected, setSelected] = useState(null);
  const [libraries, setLibraries] = useState(["places"]);
  const [markers, setMarkers] = useState();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const [refreshFees, setRefreshFees] = useState(false);
  const [refreshRatings, setRefreshRatings] = useState(false);

  // update location from local storage
  useEffect(() => {
    const storedLocation = localStorage.getItem("location");
    if (storedLocation) {
      setLocation(JSON.parse(storedLocation));
    }
    if(localStorage.getItem("token") && localStorage.getItem('id')){
      authUser(localStorage.getItem("id")).then(res => {
        setUserData(res);
        setIsLoggedIn(true);
      });
    }
  }, []);

  const toggleOffCanvas = () => {
    setVisibleOffCanvas(!visibleOffCanvas);
  };

  const closeOffCanvas = () => {
    setVisibleOffCanvas(false);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    //save location to local storage
    localStorage.setItem("location", JSON.stringify(newLocation));
  };

  const handleMarkerAdd = (station) => {
    // add marker if place_id not in markers
    if (!markers.find((m) => m.place_id === station.place_id)) {
      setMarkers([...markers, station]);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        visibleOffCanvas,
        toggleOffCanvas,
        closeOffCanvas,
        location,
        handleLocationChange,
        libraries,
        setLibraries,
        markers,
        handleMarkerAdd,
        selected,
        setSelected,
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        refreshFees,
        setRefreshFees,
        refreshRatings,
        setRefreshRatings,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalProvider };
