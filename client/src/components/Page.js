import { useState } from "react";
import Chart from "components/Chart";
import LocationContainer from "components/LocationContainer";
import DateContainer from "./DateContainer";
import { Circles } from "react-loading-icons";
import { LATEST_DATE, DAY_IN_MILLIS, LABEL_COLORS } from "constants.js";
import { getCountyData } from "services/services";
import "components/Page.scss";

const formatDataForChart = (data) =>
  data.reduce((acc, loc, index) => {
    if (!loc.county) {
      return acc;
    }

    const chartData = {
      id: `${loc.county}, ${loc.state}`,
      color: LABEL_COLORS[index],
    };

    const caseData = loc.caseData.reduce((acc, entry) => {
      const point = {
        x: entry.date,
        y: entry.cases,
      };

      acc.push(point);

      return acc;
    }, []);

    chartData.data = caseData;

    acc.push(chartData);

    return acc;
  }, []);

const formatLocationInputs = (data) =>
  data.reduce((acc, loc) => {
    const { id, state, county } = loc;
    const inputData = {
      id,
      state,
      county,
    };

    acc.push(inputData);

    return acc;
  }, []);

const getDatesInRange = ({ startDate, endDate, data }) => {
  if (data.length === 0) {
    return [];
  }

  return data.filter(({ x: date }) => {
    const dateObject = new Date(date);

    dateObject.setHours(0, 0, 0, 0);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    const timestamp = dateObject.getTime();
    return (
      timestamp + DAY_IN_MILLIS >= startDate.getTime() &&
      timestamp <= endDate.getTime()
    );
  });
};

const getChartDataInRange = ({ chartData, startDate, endDate }) =>
  chartData.map(({ data, ...rest }) => ({
    data: getDatesInRange({ startDate, endDate, data }),
    ...rest,
  }));

const Page = () => {
  const [nextInputId, setNextInputId] = useState(1);
  const [locationData, setLocationData] = useState([
    { id: 0, county: "", state: "", caseData: [] },
  ]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(LATEST_DATE.getTime() - 7 * DAY_IN_MILLIS),
  );
  const [endDate, setEndDate] = useState(LATEST_DATE);
  // const [error, setError] = useState("");
  const chartData = formatDataForChart(locationData);

  const onSelectLocation = async ({ id, locationData: location, address }) => {
    const inputs = [...locationData];
    const input = inputs.find((input) => input.id == id);

    setIsLoadingChart(true);

    const { county, state } = location;

    if (input) {
      input.county = county;
      input.state = state;
      input.value = address;

      await getCountyData({ county, state }).then(
        (response) => (input.caseData = response.data.data.caseData),
      );
      // .catch((e) => {
      //   setError(e);
      // });
      setLocationData(inputs);
    }

    setIsLoadingChart(false);
  };

  const onAddLocationInput = () => {
    const newInput = { id: nextInputId, county: "", state: "", caseData: [] };
    const data = [...locationData, newInput];

    setNextInputId(nextInputId + 1);
    setLocationData(data);
  };

  const onRemoveLocationInput = (id) => {
    const data = locationData.filter((input) => input.id != id);
    setLocationData(data);
  };

  return (
    <div className="page">
      <h1>Covid-19 Case Data Visualization</h1>
      <div className="chart-inputs-container">
        <LocationContainer
          data={formatLocationInputs(locationData)}
          onSelectLocation={onSelectLocation}
          onAddLocationInput={onAddLocationInput}
          onRemoveLocationInput={onRemoveLocationInput}
        />
        <DateContainer
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={(date) => setStartDate(date)}
          onChangeEndDate={(date) => setEndDate(date)}
        />
      </div>

      <div className="chart-container">
        {isLoadingChart ? (
          <div className="loading-container">
            <Circles fill="#06bcee" />
            <p>Loading chart...</p>
          </div>
        ) : (
          <Chart
            data={getChartDataInRange({ startDate, endDate, chartData })}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
