import PropTypes from "prop-types";
import { useRef } from "react";
import Script from "react-load-script";

const LocationInput = ({ id, value, onChange }) => {
  const inputId = `autocomplete ${id}`;
  const autocompleteRef = useRef(null);

  const onScriptLoad = () => {
    const options = [];

    //eslint-disable-next-line no-undef
    autocompleteRef.current = new google.maps.places.Autocomplete(
      document.getElementById(inputId),
      options,
    );

    autocompleteRef.current.setFields([
      "address_components",
      "formatted_address",
    ]);

    autocompleteRef.current.addListener("place_changed", onPlaceSelect);
  };

  const onPlaceSelect = () => {};

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={onScriptLoad}
      />
      <input
        id={inputId}
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
};

export default LocationInput;
