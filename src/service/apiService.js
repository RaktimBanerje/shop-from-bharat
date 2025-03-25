import axios from 'axios';
// const baseUrl = process.env.REACT_APP_BASE_URL;
const baseUrl = "https://3.107.179.121";
async function apiServiceHandler(method, endpoint, payload) {
  const token = localStorage.getItem('BHARAT_TOKEN');
  try {
    console.log(baseUrl, 'BaseUrl value is here');
    let response;
    if (method === 'GET') {

      response = await axios({
        method: 'get',
        url: `${baseUrl}/${endpoint}`,
        headers: { 'Authorization': 'Bearer ' + token }
      });
    } else if (method === 'POST') {

      response = await axios({
        method: 'post',
        url: `${baseUrl}/${endpoint}`,
        headers: { 'Authorization': 'Bearer ' + token },
        data: payload
      })
    } else if (method === 'PUT') {
      response = await axios({
        method: 'put',
        url: `${baseUrl}/${endpoint}`,
        headers: { 'Authorization': 'Bearer ' + token },
        data: payload
      })
    }
    else if (method === 'DELETE') {
      response = await axios({
        method: 'delete',
        url: `${baseUrl}/${endpoint}`,
        headers: { 'Authorization': 'Bearer ' + token },
        data: payload
      })
    }
    else {
      throw new Error('Unsupported HTTP method');
    }

    return response.data;
  } catch (error) {
    return error;
  }
}

export default apiServiceHandler;