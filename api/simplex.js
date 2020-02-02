import ApiCaller from './api-caller'
import Constant from '../constants/constant'

export const api = (api_url, params) => new Promise((resolve, reject) => {
  const headers = {}
  json = JSON.stringify(params)
  let apiPromise = null
  console.log("api key", Constant.SIMPLEX_API_KEY);  
  headers['Content-Type'] = 'application/json'  
  headers['Authorization'] = 'Apikey ' + Constant.SIMPLEX_API_KEY
  apiPromise = ApiCaller.post(api_url, json, true, headers)
  
  return apiPromise.then((res) => {            
    if (res.data.error) return reject(res.data.error)
    return resolve(res)
  })
})