import PropTypes from "prop-types";
import { useRef } from "react";
import Script from "react-load-script";
import "components/LocationInput.scss";

const LocationInput = ({ id, value, onChange, onFindCounty }) => {
  const inputId = `autocomplete ${id}`;
  const autocompleteRef = useRef(null);

  const onScriptLoad = () => {
    //eslint-disable-next-line no-undef
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById(inputId),
    );

    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    autocompleteRef.current.addListener("place_changed", onPlaceSelect);
  };

  const onPlaceSelect = () => {
    const addressObject = autocompleteRef.current.getPlace();
    const address = addressObject.address_components;

    const county = getCounty(address);
    if (county) {
      onFindCounty({ id, county, address: addressObject.formatted_address });
    }
  };

  const getCounty = (components) => {
    const county = components.find((comp) =>
      comp.types.includes("administrative_area_level_2"),
    );

    return county?.short_name || "";
  };

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={onScriptLoad}
      />
      <input
        id={inputId}
        className="locationInput"
        type="text"
        placeholder="Start typing a U.S. location..."
        value={value}
        onChange={(event) => onChange({ event, id })}
      />
    </>
  );
};

LocationInput.propTypes = {
  id: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onFindCounty: PropTypes.func.isRequired,
};

export default LocationInput;
