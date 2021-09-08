import { useState, useEffect } from "react";
import Tag from "components/Tag";
import LocationInput from "components/LocationInput";
import { ThreeDots } from "react-loading-icons";
import propTypes from "prop-types";

const LocationData = ({
  id,
  value,
  onChangeLocationInput,
  onSelectLocation,
  county,
  state,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!state || !county) {
      return;
    }

    setIsLoading(true);
  }, [county, state]);
  return (
    <>
      <Tag placeholder="County">
        {isLoading ? <ThreeDots /> : `${county ? `${county},` : ""} ${state}`}
      </Tag>
      <span className="input-container">
        <LocationInput
          value={value}
          id={id}
          onChange={onChangeLocationInput}
          onSelectLocation={onSelectLocation}
        />
      </span>
    </>
  );
};

LocationData.propTypes = {
  id: propTypes.number.isRequired,
  value: propTypes.string,
  onChangeLocationInput: propTypes.func.isRequired,
  onSelectLocation: propTypes.func.isRequired,
  county: propTypes.string,
  state: propTypes.string,
};

LocationData.defaultProps = {
  value: "",
  county: "",
  state: "",
};

export default LocationData;
