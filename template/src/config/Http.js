import AxiosRequest from "../utils/AxiosRequest";

function getBaseUrlInterno() {
  const baseUrl = process.env.REACT_APP_ENVIRONMENT == "dev" ? process.env.REACT_APP_URL_DEV : process.env.REACT_APP_URL_PROD;
  return baseUrl;
}

export const HttpInterno = () => {
  const baseUrl = getBaseUrlInterno();
  const axiosRequest = AxiosRequest(`${baseUrl}`);

  return axiosRequest;
}

