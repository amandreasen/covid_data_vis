import { useState, useEffect } from "react";
import LocationData from "./LocationData";
import IconButton from "./IconButton";
import DatePicker from "react-datepicker";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import { getDateRange } from "services/services";
import "components/LocationContainer.scss";
import "react-datepicker/dist/react-datepicker.css";

const MAX_INPUTS = 3;

const DateContainer = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  useEffect(async () => {
    const dateData = await getDateRange();
    setMinDate(new Date(dateData?.start));
    setMaxDate(new Date(dateData?.end));
  }, []);

  const validateDateRange = (date) => {
    const timestamp = date.getTime();
    const minTimestamp = minDate ? minDate.getTime() : 0;
    const maxTimestamp = maxDate ? maxDate.getTime() : new Date();

    console.log(minDate?.toString());
    console.log(maxDate?.toString());

    return timestamp >= minTimestamp && timestamp <= maxTimestamp;
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

const LocationContainer = () => {
  const [nextInputId, setNextInputId] = useState(1);
  const [locationInputs, setLocationInputs] = useState([
    { id: 0, value: "", county: "", state: "" },
  ]);

  const onChangeLocationInput = ({ event, id }) => {
    const inputs = [...locationInputs];
    const input = inputs.find((input) => input.id == id);

    if (input) {
      input.value = event.target.value;
      setLocationInputs(inputs);
    }
  };

  const onAddLocationInput = () => {
    const newInput = { id: nextInputId, value: "", county: "", state: "" };
    const inputs = [...locationInputs, newInput];

    setNextInputId(nextInputId + 1);
    setLocationInputs(inputs);
  };

  const onRemoveLocationInput = (id) => {
    const inputs = locationInputs.filter((input) => input.id != id);
    setLocationInputs(inputs);
  };

  const onSelectLocation = ({ id, locationData, address }) => {
    const inputs = [...locationInputs];
    const input = inputs.find((input) => input.id == id);

    if (input) {
      input.county = locationData.county;
      input.value = address;
      setLocationInputs(inputs);
    }
  };

  return (
    <div className="location-container">
      <div>
        <h3>Compare data for ... </h3>
        {locationInputs.map(({ value, county, state, id }) => (
          <>
            <div className="data-container" key={id}>
              <LocationData
                id={id}
                value={value}
                county={county}
                state={state}
                onChangeLocationInput={onChangeLocationInput}
                onSelectLocation={onSelectLocation}
              />
              <IconButton
                icon={faTimes}
                onClick={() => onRemoveLocationInput(id)}
                disabled={locationInputs.length === 1}
              />
            </div>
          </>
        ))}
        <div className="add-button-container">
          <IconButton
            icon={faPlus}
            onClick={onAddLocationInput}
            disabled={locationInputs.length == MAX_INPUTS}
          />
        </div>
      </div>
      <DateContainer />
    </div>
  );
};

export default LocationContainer;
