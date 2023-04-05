import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
let token = localStorage.getItem('token')

async function request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    console.log(token)
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${token}` } 
    const params = (method === "get")
        ? data
        : {};

    try {
      const resp = await axios({ url, method, data, params, headers })
      console.log(resp)
      return resp
    } catch (err) {
        console.error(err)
        return err
    //   console.error("API Error:", err.response);
    //   let message = err.response.data.error.message 
    //   throw Array.isArray(message) ? message : [message];
    }
  }

  export default request;