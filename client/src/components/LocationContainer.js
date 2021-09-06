import { useState } from "react";
import LocationInput from "components/LocationInput";
import IconButton from "./IconButton";
import Tag from "components/Tag";
import DatePicker from "react-datepicker";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import "components/LocationContainer.scss";
import "react-datepicker/dist/react-datepicker.css";

const MAX_INPUTS = 3;

const LocationContainer = () => {
  const [nextInputId, setNextInputId] = useState(1);
  const [locationInputs, setLocationInputs] = useState([
    { id: 0, value: "", county: "" },
  ]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeLocationInput = ({ event, id }) => {
    const inputs = [...locationInputs];
    const input = inputs.find((input) => input.id == id);

    if (input) {
      input.value = event.target.value;
      setLocationInputs(inputs);
    }
  };

  const onAddLocationInput = () => {
    const newInput = { id: nextInputId, value: "", county: "" };
    const inputs = [...locationInputs, newInput];

    setNextInputId(nextInputId + 1);
    setLocationInputs(inputs);
  };

  const onRemoveLocationInput = (id) => {
    const inputs = locationInputs.filter((input) => input.id != id);
    setLocationInputs(inputs);
  };

  const onFindCounty = ({ id, county, address }) => {
    const inputs = [...locationInputs];
    const input = inputs.find((input) => input.id == id);

    if (input) {
      input.county = county;
      input.value = address;
      setLocationInputs(inputs);
    }
  };

  return (
    <div className="location-container">
      <div>
        <h3>Compare data for ... </h3>
        {locationInputs.map(({ value, county, id }) => (
          <>
            <div className="data-container" key={id}>
              <Tag placeholder="County">{county}</Tag>
              <span className="input-container">
                <LocationInput
                  key={id}
                  value={value}
                  id={id}
                  onChange={onChangeLocationInput}
                  onFindCounty={onFindCounty}
                />
              </span>
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
      <div>
        <h3>From ...</h3>
        <div className="date-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
            }}
          />
          <span> to </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              setEndDate(date);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationContainer;
