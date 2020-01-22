import { BigNumber } from 'bignumber.js'
import { ec as Ec } from 'elliptic'
import ApiCaller from './api-caller'
import utils from '../Utils/Ethererum'
// import crypto from 'react-native-crypto'
let CryptoJS = require('crypto-js');
import URL from './url'

const API_KEY = '7d5dd1b8d9c748559cc7b7f31f6adc37'
var SIGN = ''
const SECRET = 'ca7ccb683f1d6baf4c448136f0cdfa47152814dbe339aacbccbb5568fa600fbe'
const processRequest = (methodName, params) => {
  const requestData = {
    method: methodName,
    params,
    id: 'test',
    jsonrpc: '2.0'
  }
  // SIGN = crypto.createHmac('sha512', SECRET).update(JSON.stringify(requestData)).digest('hex')
  SIGN = CryptoJS.createHmac('sha512', SECRET).update(JSON.stringify(requestData)).digest('hex')

  console.log("requested data", requestData);

  return JSON.stringify(requestData)
}

export const fetchJSON = (json) => new Promise((resolve, reject) => {
  const headers = {}
  let apiPromise = null
  console.log("signed message", SIGN);
  console.log("api key", API_KEY);
  if (json) {
    headers['Content-Type'] = 'application/json'  
    headers['sign'] = SIGN
    headers['apiKey'] = API_KEY  
    apiPromise = ApiCaller.post(URL.Changelly.apiURL(), json, true, headers)
  } else {
    apiPromise = ApiCaller.get(URL.Changelly.apiURL(), {})
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
    case 'getCurrencies':
        requestData = processRequest('getCurrencies', [])
    break

    case 'getMinAmount':
      requestData = processRequest('getMinAmount', [params.from,params.to])
      break

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

