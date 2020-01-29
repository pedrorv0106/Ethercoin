import { AsyncStorage } from 'react-native'
import Coin from '../stores/Coin'

const dataKey = 'COINS_STORAGE'

class CoinDataSource {
  coins = [] // for caching

  async getCoins() {
    const coinsStr = await AsyncStorage.getItem(dataKey)
    if (!coinsStr) return []

    this.coins = JSON.parse(coinsStr).map((js) => {
      return new Coin(js)
    })
    return this.coins
  }

  async getCoinAtTokenName(token_name) {
    const coins = this.coins || await this.getCoins()
    return coins.find(c => c.token_name === token_name)
  }

  async getIndexAtTokenName(token_name) {
    const coins = this.coins || await this.getCoins()
    const coin = await this.getCoinAtTokenName(token_name)
    return coins.indexOf(coin)
  }

  saveCoins(coinsArray) {
    const coins = coinsArray.map(c => c.toJSON())
    return AsyncStorage.setItem(dataKey, JSON.stringify(coins))
  }

  async updateCoin(coin) {
    const coins = await this.getCoins()

    for (let i = 0; i < coins.length; i++) {
      if (coins[i].token_name === coin.token_name) {
        coins[i] = coin
        this.saveCoins(coins)
        break
      }
    }
  }

  async addNewCoin(coin) {
    const coins = await this.getCoins()
    const find = coins.find(c => c.token_name === coin.token_name)
    if (!find) coins.push(coin)
    return this.saveCoins(coins)
  }

  async deleteCoin(token_name) {
    const coins = await this.getCoins()
    const result = coins.filter(c => c.token_name != token_name)
    return this.saveCoins(result)
  }
}

export default new CoinDataSource()
