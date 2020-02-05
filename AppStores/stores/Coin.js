import { observable } from 'mobx'

const defaultObjCoin = {
  token_name: '',
  token_symbol: '',
  wallet_symbol: '',
  token_contract_address: '',
  decimals: 0,
  balance: 0,
  gbpPrice: 0,
  isAdded: true,
  icon_path: ''
}

export default class Coin {
  @observable token_name = ''
  @observable token_symbol = ''
  @observable wallet_symbol = ''
  @observable token_contract_address = ''
  @observable decimals = 0
  @observable balance = 0
  @observable gbpPrice = 0
  @observable isAdded = true
  @observable icon_path = ''

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
      token_name, token_symbol, wallet_symbol, token_contract_address, decimals, balance, gbpPrice,
      isAdded, icon_path
    } = this
    return {
      token_name,
      token_symbol,
      wallet_symbol,
      token_contract_address,
      decimals,
      balance,
      gbpPrice,
      isAdded,
      icon_path
    }
  }
}
