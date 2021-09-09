import { useState, useEffect } from "react";
import Tag from "components/Tag";
import LocationInput from "components/LocationInput";
import { ThreeDots } from "react-loading-icons";
import propTypes from "prop-types";

const LocationData = ({
  id,
  value,
  state,
  county,
  color,
  onSelectLocation,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setIsLoading(false);
    }
  }, [state, county]);
  return (
    <>
      <Tag placeholder="??? County" color={color}>
        {isLoading ? (
          <ThreeDots height="50%" />
        ) : (
          `${county ? `${county}, ${state}` : ""}`
        )}
      </Tag>
      <span className="input-container">
        <LocationInput
          value={value}
          id={id}
          onSelectLocation={({ id, locationData, state, county }) => {
            setIsLoading(true);
            onSelectLocation({ id, locationData, state, county });
          }}
        />
      </span>
    </>
  );
};

LocationData.propTypes = {
  id: propTypes.number.isRequired,
  value: propTypes.string,
  state: propTypes.string,
  county: propTypes.string,
  isLoading: propTypes.bool,
  color: propTypes.string,
  onSelectLocation: propTypes.func.isRequired,
};

LocationData.defaultProps = {
  value: "",
  state: "",
  county: "",
  color: "#79E7BD",
};

export default LocationData;
