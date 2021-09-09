import DatePicker from "react-datepicker";
import propTypes from "prop-types";
import { EARLIEST_DATE, LATEST_DATE } from "constants.js";

const DateContainer = ({
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}) => {
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
          onChange={onChangeStartDate}
          filterDate={validateDateRange}
        />
        <span> to </span>
        <DatePicker
          selected={endDate}
          onChange={onChangeEndDate}
          filterDate={validateDateRange}
        />
      </div>
    </div>
  );
};

DateContainer.propTypes = {
  startDate: propTypes.object.isRequired,
  endDate: propTypes.object.isRequired,
  onChangeStartDate: propTypes.func.isRequired,
  onChangeEndDate: propTypes.func.isRequired,
};

export default DateContainer;
