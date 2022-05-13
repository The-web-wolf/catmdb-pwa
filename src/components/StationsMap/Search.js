import React, { useRef } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

function Search({location, onSelectedChange, getAtms }) {
  const inputRef = useRef(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: location
        ? { lat: () => location.lat, lng: () => location.lng }
        : { lat: () => 40.7128, lng: () => -74.006 },
      radius: 1000,
    },
  });
  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          setTimeout(() => inputRef.current.blur(), 100);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            getAtms(true, { lat, lng });
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          ref={inputRef}
          disabled={!ready}
          placeholder="Search an address"
        />
        <ComboboxPopover className="combobox">
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Search;
