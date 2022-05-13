import React, { useContext, useCallback, useRef } from "react";
import GlobalContext from "../../context/GlobalContext";
import "../../scss/components/_map_styles.scss";
import MapStyles from "../MapAssets/MapStyles";
import locationMarker from "../../assets/location.png";
import Search from "./Search";
import Locate from "./Locate";
import Loader from "../MapAssets/Loader";
import Text from "../Core/Text";
import StationCard from "../StationCard";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import StationsList from "./StationsList";

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  gestureHandling: "greedy",
};

const StationsMap = (props) => {
  const gContext = useContext(GlobalContext);
  const cardsRef = useRef(null);
  const mapRef = useRef();

  const makeCoordSelected = useCallback((coord) => {
    gContext.setSelected(coord);
  }, []);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
    getAtms(true);
  }, []);

  const showMap = useCallback(() => {
    props.onMapShow();
    getAtms(true);
  }, []);

  const panTo = useCallback(({ lat, lng, zoomLevel }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoomLevel || 15);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries: gContext.libraries,
  });

  const setSelectedAndPan = useCallback((coord, zoomLevel) => {
    gContext.setSelected({
      lat: coord.geometry.location.lat(),
      lng: coord.geometry.location.lng(),
      ...coord,
    });
    panTo({
      lat: coord.geometry.location.lat(),
      lng: coord.geometry.location.lng(),
      zoomLevel,
    });
    // scroll into view of div with place_id
    cardsRef.current.childNodes.forEach((node) => {
      if (node.getAttribute("id") === coord.place_id) {
        node.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "center",
        });
      }
    });
  }, []);

  const getAtms = useCallback(
    (recenter, thisCoordinate) => {
      try {
        const request = {
          query: "Crypto_atm | Bitcoin_atm",
          keyword: "crypto",
          location: thisCoordinate
            ? {
                lat: thisCoordinate.lat,
                lng: thisCoordinate.lng,
              }
            : mapRef.current.getCenter(),
          radius: 5000,
        };

        const service = new window.google.maps.places.PlacesService(
          mapRef.current
        );
        service &&
          service.textSearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              if (recenter) {
                setSelectedAndPan(results[0], 10);
              }
              props.onSetFoundLocations(results);
              results.map((result, index) => {
                setTimeout(() => {
                  const marker = new window.google.maps.Marker({
                    position: {
                      lat: result.geometry.location.lat(),
                      lng: result.geometry.location.lng(),
                    },
                    map: mapRef.current,
                    title: result.name,
                    animation: window.google.maps.Animation.DROP,
                    icon: {
                      url: locationMarker,
                      scaledSize: new window.google.maps.Size(60, 60),
                    },
                  });
                  marker.addListener("click", () => {
                    setSelectedAndPan(result);
                  });
                }, index * 200);
              });
            } else {
              console.log("No results found");
            }
          });
      } catch (err) {}
    },
    [props.showMap]
  );

  if (loadError) return <Text>Error loading maps</Text>;
  if (!isLoaded) return <Loader />;

  return (
    <div className="GoogleMapContainer">
      <Search
        location={gContext.location}
        onSelectedChange={makeCoordSelected}
        getAtms={getAtms}
      />
      <Locate getAtms={getAtms} />
      <GoogleMap
        mapContainerStyle={props.mapContainerStyle}
        zoom={10}
        center={props.center}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>

      {props.showMap && (
        <div className="showListTrigger">
          <button onClick={props.onMapShow}>
            <span className="fa fa-bars"></span> List View
          </button>
        </div>
      )}

      {/* List associated with map */}
      {props.foundLocations && (
        <div
          className={
            props.showMap ? "StationCard d-flex" : "StationCard d-none"
          }
          ref={cardsRef}
        >
          {props.foundLocations.map((result) => (
            <StationCard
              key={result.place_id}
              details={result}
              onSelectedChange={setSelectedAndPan}
              isSelected={
                gContext.selected &&
                gContext.selected.place_id === result.place_id
              }
            />
          ))}
        </div>
      )}

      {/* More detailed List, not associated with map */}
      {props.foundLocations && !props.showMap ? (
        <StationsList
          foundLocations={props.foundLocations}
          onMapShow={showMap}
        />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default StationsMap;
