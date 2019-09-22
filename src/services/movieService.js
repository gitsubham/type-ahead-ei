import { get } from './apiService'

import { API_KEY, BASE_URL }  from '../constants' 

const URL = {
  SEARCH_BY_TITLE: BASE_URL
}

const formParams = params => ({ apikey: API_KEY,  ...params })

export const getMovies = async (token) => {
  const params = formParams({ s: token })
  return get({ url: URL.SEARCH_BY_TITLE, params})
}