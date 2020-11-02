import { get } from './apiService'

import { BASE_URL }  from '../constants' 

const URL = {
  SEARCH_BY_TITLE: BASE_URL
}


export const getUsers = async (token) => {
  try { 
    const resp = await get({ url: URL.SEARCH_BY_TITLE })
    if (resp.isError) {
      return {
        isError: resp.isError,
        httpCode: get(resp, 'error.response.status'),
        errMsg: get(resp, 'error.response.data.Error')
      }
    }
    return resp.resp
  } catch(error) {
    // noop
    console.log(error)
  }
}