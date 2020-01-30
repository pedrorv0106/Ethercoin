import { observable } from 'mobx'

const defaultObjCoin = {
  token_name: '',
  token_symbol: '',
  wallet_symbol: '',
  wallet_privatekey: '',
  wallet_address: '',
  token_contract_address: '',
  decimals: 0,
  balance: 0,
  gbpPrice: 0,
  isAdded: true
}

export default class Coin {
  @observable token_name = ''
  @observable token_symbol = ''
  @observable wallet_symbol = ''
  @observable wallet_privatekey = ''
  @observable wallet_address = ''
  @observable token_contract_address = ''
  @observable decimals = 0
  @observable balance = 0
  @observable gbpPrice = 0
  @observable isAdded = true

  constructor(obj) {
    const initObj = Object.assign({}, defaultObjCoin, obj) // copy
    this._validateData(initObj)

    Object.keys(initObj).forEach((k) => {
      this[k] = initObj[k]
    })
  }
  
  _validateData(obj) {
    if (!obj.token_name) throw new Error('Address is required')
  }

  toJSON() {
    const {
      token_name, token_symbol, wallet_symbol, wallet_privatekey,
      wallet_address, token_contract_address, decimals, balance, gbpPrice,
      isAdded
    } = this
    return {
      token_name,
      token_symbol,
      wallet_symbol,
      wallet_privatekey,
      wallet_address,
      token_contract_address,
      decimals,
      balance,
      gbpPrice,
      isAdded
    }
  }
}
