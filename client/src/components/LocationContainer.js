import { useState } from "react";
import LocationInput from "components/LocationInput";
import IconButton from "./IconButton";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";
import "components/LocationContainer.scss";

const MAX_INPUTS = 5;

const LocationContainer = () => {
  const [nextInputId, setNextInputId] = useState(1);
  const [locationInputs, setLocationInputs] = useState([{ id: 0, value: "" }]);

  const onChangeLocationInput = ({ event, id }) => {
    const inputs = [...locationInputs];
    const input = inputs.find((input) => input.id == id);

    if (input) {
      input.value = event.target.value;
      setLocationInputs(inputs);
    }
  };

  const onAddLocationInput = () => {
    const newInput = { id: nextInputId, value: "" };
    const inputs = [...locationInputs, newInput];

    setNextInputId(nextInputId + 1);
    setLocationInputs(inputs);
  };

  const onRemoveLocationInput = (id) => {
    const inputs = locationInputs.filter((input) => input.id != id);
    setLocationInputs(inputs);
  };

  return (
    <div className="LocationContainer">
      {locationInputs.map(({ value, id }) => (
        <div key={id}>
          <span className="InputContainer">
            <LocationInput
              key={id}
              value={value}
              id={id}
              onChange={onChangeLocationInput}
            />
          </span>
          <IconButton
            icon={faTimes}
            onClick={() => onRemoveLocationInput(id)}
            disabled={locationInputs.length === 1}
          />
        </div>
      ))}
      <IconButton
        icon={faPlus}
        onClick={onAddLocationInput}
        disabled={locationInputs.length == MAX_INPUTS}
      />
    </div>
  );
};

export default LocationContainer;
