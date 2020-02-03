import { observable, action } from 'mobx'
import CoinDS from './datasource/CoinDS'
import Constant from '../constants/constant'
import ETHProvider from '../providers/ETHProvider'
import MainStore from './MainStore'

export default class AppCoinsStore {
  @observable coins = []
  @observable ethProvider

  @action async getCoinFromDS() {
    const coins = await CoinDS.getCoins()
    const coinMap = coins.reduce((_rs, c, i) => {
      const rs = _rs
      rs[c.token_name] = i
      return rs
    }, {})

    this.coins.forEach((c) => {
      const index =  coinMap[c.token_name]
      coins[index] = c
    })
    this.coins = coins

    return this.coins;
  }

  @action save() {
    return CoinDS.saveCoins(this.coins)
  }
  @action addCoins(coins){
    this.coins = coins
    return this.save()
  }
  @action async removeAll() {
    this.coins = []
    return this.save()
  }

  @action async getBalances(){
    if(!this.ethProvider){
      console.log('Ethereum Address: ', MainStore.appState.ethAddress)
      let ethPrivateKey = MainStore.appState.ethPrivateKey
      ethPrivateKey = ethPrivateKey.replace('0x', '')
      console.log('Mnemonic: ', MainStore.appState.mnemonic, ethPrivateKey)
      this.ethProvider = new ETHProvider(MainStore.appState.mnemonic)
    }
    try {
      const response = await fetch(Constant.COINMARKET_GET_GBP_URL)
      const posts = await response.json()
      for(var k in posts.data) {
        let index = this.getIndexCoin(posts.data[k].symbol)
        if(index >= 0){
          this.coins[index].gbpPrice = posts.data[k].quotes.GBP.price
        }
      }
    } catch (e) { 
      console.log('Getting GBP Price is failed')
    }
    
    this.coins.forEach((coin, index) => this.getBalance(coin, index))
    
    setTimeout(() =>{
      this.getBalances()
    }, Constant.INTERVAL_GET_GBP)
  }
  getIndexCoin(symbol){
    let ret = -1
    this.coins.forEach((c, index) =>{
      if(c.token_symbol === symbol){
        ret = index
      }
    })
    return ret;
  }
  async getBalance(coin, index){
    if(coin.wallet_symbol === 'BTC'){

    } else {
      let balance = await this.ethProvider.getBalance(coin.token_contract_address)
      this.coins[index].balance = balance
      console.log('balance:', this.coins[index].token_symbol, balance)
    }
  }
}