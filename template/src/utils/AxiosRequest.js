import axios, { AxiosInstance } from "axios";

const AxiosRequest = (baseUrl, headers = null) => {

  if (headers) {
    return axios.create({
      baseURL: baseUrl,
      headers: headers
    });
  } else {
      return axios.create({
      baseURL: baseUrl,
      headers: headers
    });
  }
}

export default AxiosRequest;