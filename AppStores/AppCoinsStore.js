import { observable, action } from 'mobx'
import CoinDS from './DataSource/CoinDS'

export default class AppCoinsStore {
  @observable coins = []

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
}