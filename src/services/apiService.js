import axios from 'axios';

export const get = ({url, params, headers}) => {
  return axios.get(url, { params, headers }).then(resp => {
    return { isError: false, resp: resp.data }
  }, error => {
    return { 
      isError: true, 
      error 
    }
  }).catch(error => {
    return { isError: true, error }
  })
}