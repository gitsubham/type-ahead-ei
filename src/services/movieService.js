import { get } from './apiService'

import { API_KEY, BASE_URL }  from '../constants' 

const URL = {
  SEARCH_BY_TITLE: BASE_URL
}

const formParams = params => ({ apikey: API_KEY,  ...params })

export const getMovies = async (token) => {
  const params = formParams({ s: token })
  try { 
    const resp = await get({ url: URL.SEARCH_BY_TITLE, params })
    if (resp.isError) {
      return {
        isError: resp.isError,
        httpCode: get(resp, 'error.response.status'),
        errMsg: get(resp, 'error.response.data.Error')
      }
    }
    return resp
  } catch(error) {
    // noop
    console.log(error)
  }
}