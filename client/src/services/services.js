import axios from "axios";

export const getDateRange = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASEURL}/dates`,
  );
  return response?.data?.data;
};

export const getCountyData = ({ county, state }) =>
  axios.get(`${process.env.REACT_APP_SERVER_BASEURL}/cases/county`, {
    params: { county, state },
  });
