import axios from 'axios'

// https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json
export const api = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5',
})

