import Coin from './stores/Coin';
import Coins from '../constants/coins'
import MainStore from './MainStore';
import ETHProvider from '../providers/ETHProvider'
import BTCProvider from '../providers/BTCProvider'

class CreateCoinStore {
  async handleRestoreWallet(mnemonic) {
    const ethProvider = new ETHProvider(mnemonic)
    
    const btcProvider = new BTCProvider(mnemonic)
    await btcProvider.loadWalletFromMnemonic()
    
    const coinArray = this.handleCreateCoins();
    MainStore.appState.appCoinsStore.ethProvider = ethProvider
    MainStore.appState.appCoinsStore.btcProvider = btcProvider
    MainStore.appState.appCoinsStore.addCoins(coinArray)
    MainStore.appState.mnemonic = mnemonic
    MainStore.appState.save()
    MainStore.appState.appCoinsStore.getBalances()
  }

  handleCreateCoins(){
    let ret = []
    Coins.list.forEach(c => {
      let coin = new Coin({
        token_name: c.token_name, token_symbol:c.token_symbol, wallet_symbol:c.wallet_symbol, 
        token_contract_address:c.token_contract_address, decimals:c.decimals, balance:0, gbpPrice:0, isAdded: true, icon_path:c.icon_path
      })
      ret.push(coin)
    })
    
    return ret
  }
}

export default CreateCoinStore
