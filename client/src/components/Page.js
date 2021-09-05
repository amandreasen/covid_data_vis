import Chart from "components/Chart";
import LocationContainer from "components/LocationContainer";
import 'components/Page.scss'

const Page = () => {
  return <div className="Page"><LocationContainer/><Chart/></div>;
};

export default Page;