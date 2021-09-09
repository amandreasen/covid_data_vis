import LocationData from "./LocationData";
import IconButton from "./IconButton";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";
import { LABEL_COLORS } from "constants.js";
import "components/LocationContainer.scss";
import "react-datepicker/dist/react-datepicker.css";

const MAX_INPUTS = 3;

const LocationContainer = ({
  data,
  onSelectLocation,
  onAddLocationInput,
  onRemoveLocationInput,
}) => {
  return (
    <div>
      <h3>Compare data for ... </h3>
      {data.map(({ county, state, id }, index) => (
        <>
          <div className="data-container" key={id}>
            <LocationData
              id={id}
              county={county}
              state={state}
              onSelectLocation={onSelectLocation}
              color={LABEL_COLORS[index]}
            />
            <IconButton
              icon={faTimes}
              onClick={() => onRemoveLocationInput(id)}
              disabled={data.length === 1}
            />
          </div>
        </>
      ))}
      <div className="add-button-container">
        <IconButton
          icon={faPlus}
          onClick={onAddLocationInput}
          disabled={data.length == MAX_INPUTS}
        />
      </div>
    </div>
  );
};

LocationContainer.propTypes = {
  data: propTypes.object,
  onSelectLocation: propTypes.func.isRequired,
  onAddLocationInput: propTypes.func.isRequired,
  onRemoveLocationInput: propTypes.func.isRequired,
};

LocationContainer.defaultProps = {
  data: [],
};

export default LocationContainer;
