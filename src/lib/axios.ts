/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from 'axios'
import { API_URL } from './config'

// ----------------------------------------------------------------------

const axios = axiosInstance.create({
  baseURL: API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axios.interceptors.response.use(
  (response: any) => response,
  (error: { response: { data: any } }) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
)
export default axios
