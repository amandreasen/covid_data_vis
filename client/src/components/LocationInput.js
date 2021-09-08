import PropTypes from "prop-types";
import { useRef, useState } from "react";
import Script from "react-load-script";
import "components/LocationInput.scss";

const VALID_COUNTRY = "US";

const LocationInput = ({ id, onSelectLocation }) => {
  const [error, setError] = useState(null);
  const [term, setTerm] = useState("");
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

    const locationData = getLocationData(address);
    if (locationData?.country !== VALID_COUNTRY) {
      setError("Please select a United States location.");
      return;
    } else if (!locationData?.state || !locationData?.county) {
      setError("Please select a location associated with a US county.");
      return;
    }

    setTerm(addressObject.formatted_address);

    onSelectLocation({
      id,
      locationData,
    });
  };

  const getLocationData = (components) =>
    components.reduce((acc, comp) => {
      const location_types = comp.types;
      // country
      if (location_types.includes("country")) {
        acc["country"] = comp.short_name;
      }
      // state
      else if (
        location_types?.[0] === "administrative_area_level_1" &&
        location_types?.[1] === "political"
      ) {
        acc["state"] = comp.short_name;
      }
      // county
      else if (
        location_types?.[0] === "administrative_area_level_2" &&
        location_types?.[1] === "political"
      ) {
        acc["county"] = comp.short_name;
      }

      return acc;
    }, {});

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
        value={term}
        onChange={(event) => setTerm(event.target.value)}
      />
    </>
  );
};

LocationInput.propTypes = {
  id: PropTypes.number.isRequired,
  onSelectLocation: PropTypes.func.isRequired,
};

export default LocationInput;
