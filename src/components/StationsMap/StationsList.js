import React, { useContext, useState } from "react";
import Title from "../Core/Title";
import Spinner from "../Core/Spinner";
import StationCard from "../StationCard";
import GlobalContext from "../../context/GlobalContext";
import { getDistance } from "./LocationActions";
import Fee from "./Fee/Fee";
import AddFeeForm from "./Fee/AddFee";
import EditFeeForm from "./Fee/EditFee";

const StationList = (props) => {
  const gContext = useContext(GlobalContext);
  const [addFee, setAddFee] = useState(null);
  const [editFee, setEditFee] = useState(null);

  const handleSelectedChange = (coord) => {
    gContext.setSelected({
      lat: coord.geometry.location.lat(),
      lng: coord.geometry.location.lng(),
      ...coord,
    });
  };
  const locations = props.foundLocations;

  return locations.length ? (
    <div className=" pb-10 StationsList">
      <AddFeeForm
        place={addFee}
        show={addFee}
        onClose={() => setAddFee(null)}
        User={gContext.userData ? gContext.userData.username : "Anonymous"}
        onRefreshFees= {gContext.setRefreshFees}
      />
      <EditFeeForm
        place={editFee}
        show={editFee}
        onClose={() => setEditFee(null)}
        User={gContext.userData ? gContext.userData.username : "Anonymous"}
        onRefreshFees= {gContext.setRefreshFees}
      />
      <div className="list-title mt-20 mt-lg-20">
        <Title variant="card">Closets ATMs To you</Title>
        <button
          className="viewMap"
          aria-label="View map"
          onClick={props.onMapShow}
        >
          <span className="fa fa-map mr-3"></span>
          Map View
        </button>
      </div>
      <div className="row align-items-center">
        {locations.map((location) => {
          const distance = getDistance(
            gContext.location.lat,
            gContext.location.lng,
            location.geometry.location.lat(),
            location.geometry.location.lng()
          );
          return (
            <div className="col-12 col-lg-6" key={location.place_id}>
              <StationCard
                details={location}
                distance={distance}
                onSelectedChange={handleSelectedChange}
                isSelected={
                  gContext.selected &&
                  gContext.selected.place_id === location.place_id
                }
              >
                <div
                  className={
                    gContext.selected &&
                    gContext.selected.place_id === location.place_id
                      ? "ATM-details selected"
                      : "ATM-details"
                  }
                >
                  <Fee
                    place_id={location.place_id}
                    onAddFee={() =>
                      setAddFee({
                        place_id: location.place_id,
                        place_name: location.name,
                      })
                    }
                    onEditFee={(fee) =>
                      setEditFee({
                        place_id: location.place_id,
                        place_name: location.name,
                        fee_id: fee.id,
                        fee_amount: fee.amount,
                        fee_currency: fee.currency
                      })
                    }
                  />
                </div>
              </StationCard>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="pos-abs-tr h-100 w-100 d-flex align-items-center justify-content-center">
      <Spinner className="font-size-10 text-info" />
    </div>
  );
};

export default StationList;
