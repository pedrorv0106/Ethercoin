import ApiCaller from './api-caller'
import Constant from '../constants/constant' 
let CryptoJS = require('crypto-js');

var SIGN = ''

const processRequest = (methodName, params) => {
  const requestData = {
    method: methodName,
    params,
    id: 'test',
    jsonrpc: '2.0'
  }
  const object = CryptoJS.HmacSHA512(JSON.stringify(requestData), Constant.CHANGELLY_SECRET)
  let hexString = ''
  object.words.forEach(w => {
    let value
    if (w < 0){
      let w1 = 4294967295 + w + 1
      value = w1.toString(16)
    } else {
      value = w.toString(16)
    }
    if(value.length < 8){
      value = '0' + value
    } else if (value.length > 8){
      value = value.substring(1, 9)
    }
    hexString = hexString + value
  })
  SIGN = hexString

  return JSON.stringify(requestData)
}
export const fetchJSON = (json) => new Promise((resolve, reject) => {
  const headers = {}
  let apiPromise = null
  console.log("signed message", SIGN);
  console.log("api key", Constant.CHANGELLY_API_KEY);
  if (json) {
    headers['Content-Type'] = 'application/json'  
    headers['sign'] = SIGN
    headers['apiKey'] = Constant.CHANGELLY_API_KEY  
    apiPromise = ApiCaller.post(Constant.CHANGELLY_URL, json, true, headers)
  } else {
    apiPromise = ApiCaller.get(Constant.CHANGELLY_URL, {})
  }

  return apiPromise.then((res) => {            
    if (res.data.error) return reject(res.data.error)
    return resolve(res)
  })
})

export const API = (methodName, params) => {
  console.log("Params", params)
  let requestData = {}
  switch (methodName) {
    case 'getExchangeAmount':
      requestData = processRequest('getExchangeAmount', [params.from, params.to, params.amount])
      break
    case 'createTransaction':
      requestData = processRequest('createTransaction', [params.from, params.to, params.address, params.extraId, params.amount])
    break
    default:
      break
  }

  return fetchJSON(requestData)
}
