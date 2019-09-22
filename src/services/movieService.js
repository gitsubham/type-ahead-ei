import { get } from './apiService'

const API_KEY = "PlzBanMe"
const BASE_URL = "http://www.omdbapi.com/"
const URL = {
  SEARCH_BY_TITLE: "http://www.omdbapi.com"
}

const formParams = params => ({ apikey: API_KEY, ...params })

export const getMovies = async (token) => {
  const params = formParams({ s: token })
  return get({ url: URL.SEARCH_BY_TITLE, params})
}