import Chart from "components/Chart";
import LocationContainer from "components/LocationContainer";
import "components/Page.scss";

const Page = () => {
  return (
    <div className="Page">
      <h1>Covid-19 Case Data Visualization</h1>
      <LocationContainer />
      <Chart />
    </div>
  );
};

export default Page;
