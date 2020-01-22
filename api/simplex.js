
import { BigNumber } from 'bignumber.js'
import { ec as Ec } from 'elliptic'
import ApiCaller from './api-caller'
import utils from '../Utils/Ethererum'
import URL from './url'
import uuidv1 from 'uuid/v1'

export const Sandbox_URL = 'https://sandbox.test-simplexcc.com/wallet/merchant/v2/quote'
export const Production_URL = 'https://backend-wallet-api.simplexcc.com/wallet/merchant/v2/quote'
export const NEW_PAYMENT_URL = 'https://sandbox.test-simplexcc.com/payments/new'
export const API_KEY = '7d5dd1b8d9c748559cc7b7f31f6adc37'
export const PROVIDER = 'ethercoin'
export const API_VERSION = '1'
export const END_USER_ID = 'dev-user-id'
export const RETURN_URL = 'https://simplex-api.edgesecure.co/redirect/'
export const ACCEPT_LANGUAGE = 'en-US;q=0.7,en;q=0.3'
export const HTTP_ACCEPT = 'en-US;q=0.7,en;q=0.3'
export const LIMITS = {
  USD: {
    min: 50,
    daily: 18800,
    monthly: 47000
  },
  EUR: {
    min: 50,
    daily: 16972,
    monthly: 42431
  }
}

export const api = (api_url, params) => new Promise((resolve, reject) => {
  const headers = {}
  json = JSON.stringify(params)
  let apiPromise = null
  console.log("api key", API_KEY);  
  headers['Content-Type'] = 'application/json'  
  headers['Authorization'] = 'Apikey ' + API_KEY
  apiPromise = ApiCaller.post(api_url, json, true, headers)
  
  return apiPromise.then((res) => {            
    if (res.data.error) return reject(res.data.error)
    return resolve(res)
  })
})

export function sessionId () {
  return uuidv1()
}

export function installId () {
  return uuidv1()
}



/*import uuidv1 from 'uuid/v1'
import { core } from 'edge-libplugin'
import { AsyncStorage, Linking} from 'react-native';
import { cancelableFetch } from './utils'
import caller from './api-caller'

export const PROVIDER = 'edge'
export const API_VERSION = '1'
export const ACCEPT_LANGUAGE = 'en-US;q=0.7,en;q=0.3'
export const HTTP_ACCEPT = 'en-US;q=0.7,en;q=0.3'
export const RETURN_URL = 'https://simplex-api.edgesecure.co/redirect/'
export const LIMITS = {
  USD: {
    min: 50,
    daily: 18800,
    monthly: 47000
  },
  EUR: {
    min: 50,
    daily: 16972,
    monthly: 42431
  }
}

let lastRequest = null

export function requestAbort () {
  if (lastRequest) {
    lastRequest.cancel()
  }
}

export const SUPPORTED_DIGITAL_CURRENCIES = [
  'BTC', 'ETH', 'BCH', 'LTC', 'XRP'
]

export const SUPPORTED_FIAT_CURRENCIES = [
  'USD', 'EUR'
]

export const DEV = process.env.NODE_ENV === 'development'

const edgeUrl = DEV
  ? 'https://simplex-sandbox-api.edgesecure.co'
  : 'https://simplex-api.edgesecure.co'
const simplexUrl = DEV
  ? 'https://sandbox.test-simplexcc.com/payments/new'
  : 'https://checkout.simplexcc.com/payments/new'

export function sessionId () {
  return uuidv1()
}

export async function getUserId () {
  if (DEV) {
    return 'dev-user-id'
  }
  let id = null
  let inCore = true
  try {
    id = await core.readData('simplex_user_id')
    core.debugLevel(0, 'Found user key in core')
  } catch (e) {
    core.debugLevel(0, 'No existing key in core')
    inCore = false
  }
  if (!id) {
    id = AsyncStorage.getItem('simplex_user_id')
  }
  if (!id) {
    id = uuidv1()
    core.debugLevel(0, 'Generating id "' + id + "' ")
  }
  if (!inCore) {
    try {
      await core.writeData('simplex_user_id', id)
      core.debugLevel(0, 'Wrote key to core')
    } catch (e) {
      core.debugLevel(0, 'Unable to write key to core. Storing in localStorage')
      AsyncStorage.setItem('simplex_user_id', id)
    }
  }
  return id
}

export function installId () {
  const id = AsyncStorage.getItem('simplex_install_id') || uuidv1()
  AsyncStorage.setItem('simplex_install_id', id)
  return id
}

export async function requestConfirm (sessionId, uaid, quote) {
  const userId = await getUserId()
  const body = {
    'account_details': {
      'app_provider_id': PROVIDER,
      'app_version_id': API_VERSION,
      'app_end_user_id': userId,
      'signup_login': {
        'ip': '4.30.5.194',
        'uaid': uaid,
        'accept_language': ACCEPT_LANGUAGE,
        'http_accept_language': HTTP_ACCEPT,
        'user_agent': window.navigator.userAgent,
        'cookie_session_id': sessionId,
        'timestamp': new Date().toISOString()
      }
    },
    'transaction_details': {
      'payment_details': {
        'quote_id': quote.quote_id,
        'payment_id': quote.payment_id,
        'order_id': quote.order_id,
        'fiat_total_amount': {
          'currency': quote.fiat_total_amount_currency,
          'amount': quote.fiat_total_amount_amount
        },
        'requested_digital_amount': {
          'currency': quote.digital_currency,
          'amount': quote.digital_amount
        },
        'destination_wallet': {
          'currency': quote.digital_currency,
          'address': quote.address
        },
        'original_http_ref_url': 'https://www.edgesecure.co/'
      }
    }
  }
  const data = {
    // signal: abortController.signal,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
  lastRequest = cancelableFetch(edgeUrl + '/partner/data', data)
  return lastRequest.promise
}

export async function requestQuote (requested, amount, digitalCurrency, fiatCurrency) {
  const userId = await getUserId()
  // Abort any active requests
  requestAbort()
  const data = {
    // signal: abortController.signal,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      digital_currency: digitalCurrency,
      fiat_currency: fiatCurrency,
      requested_currency: requested,
      requested_amount: parseFloat(amount),
      client_id: userId
    })
  }
  // Issue a new request
  lastRequest = cancelableFetch(edgeUrl + '/quote', data)
  return lastRequest.promise
}

export async function payments () {
  const userId = await getUserId()

  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const url = `${edgeUrl}/payments/${userId}/`
  return caller.get(url, data, true)  
}

export async function paymentDetails (paymentId) {
  const userId = await getUserId()
  const data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  const url = `${edgeUrl}/payments/${userId}/${paymentId}/`
  return caller.get(url, data, true)  
}*/
