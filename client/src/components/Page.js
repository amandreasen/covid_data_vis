import { useState } from "react";
import Chart from "components/Chart";
import LocationContainer from "components/LocationContainer";
import { getCountyData } from "services/services";
import { LABEL_COLORS } from "./constants";
import { Circles } from "react-loading-icons";
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

const Page = () => {
  const [nextInputId, setNextInputId] = useState(1);
  const [locationData, setLocationData] = useState([
    { id: 0, county: "", state: "", caseData: [] },
  ]);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const chartData = formatDataForChart(locationData);
  const [error, setError] = useState("");

  const onSelectLocation = async ({ id, locationData: location, address }) => {
    const inputs = [...locationData];
    const input = inputs.find((input) => input.id == id);

    setIsLoadingChart(true);

    const { county, state } = location;

    if (input) {
      input.county = county;
      input.state = state;
      input.value = address;

      await getCountyData({ county, state })
        .then((response) => (input.caseData = response.data.data.caseData))
        .catch((e) => {
          setError(e);
        });
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
      <LocationContainer
        data={formatLocationInputs(locationData)}
        onSelectLocation={onSelectLocation}
        onAddLocationInput={onAddLocationInput}
        onRemoveLocationInput={onRemoveLocationInput}
      />
      <div className="chart-container">
        {isLoadingChart ? (
          <div className="loading-container">
            <Circles fill="#06bcee" />
            <p>Loading chart...</p>
          </div>
        ) : (
          <Chart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default Page;
