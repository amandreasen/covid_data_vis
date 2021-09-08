import axios from "axios";

export const getDateRange = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_BASEURL}/dates`,
  );
  return response?.data?.data;
};

export const getCountyData = () => {};
