import { useState } from "react";
import LocationData from "./LocationData";
import IconButton from "./IconButton";
import DatePicker from "react-datepicker";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";
import { LABEL_COLORS } from "./constants";
import "components/LocationContainer.scss";
import "react-datepicker/dist/react-datepicker.css";

const DAY_IN_MILLIS = 60 * 60 * 24 * 1000;
const MAX_INPUTS = 3;
const EARLIEST_DATE = new Date("2020-01-22");
// day before current date
const LATEST_DATE = new Date(Date.now() - DAY_IN_MILLIS);

const DateContainer = () => {
  const [startDate, setStartDate] = useState(
    new Date(LATEST_DATE.getTime() - 7 * DAY_IN_MILLIS),
  );
  const [endDate, setEndDate] = useState(LATEST_DATE);

  const validateDateRange = (date) => {
    const timestamp = date.getTime();

    return (
      timestamp >= EARLIEST_DATE.getTime() && timestamp <= LATEST_DATE.getTime()
    );
  };

  return (
    <div>
      <h3>From ...</h3>
      <div className="date-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
          }}
          filterDate={validateDateRange}
        />
        <span> to </span>
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
          }}
          filterDate={validateDateRange}
        />
      </div>
    </div>
  );
};

const LocationContainer = ({
  data,
  onSelectLocation,
  onAddLocationInput,
  onRemoveLocationInput,
}) => {
  return (
    <div className="location-container">
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
      <DateContainer />
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
