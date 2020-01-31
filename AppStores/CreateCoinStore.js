import Coin from './stores/Coin';
import Coins from '../constants/coins'

class CreateCoinStore {
  handleCreateCoins(btcWallet_privateKey, btcWalletAddress, ethWallet_privateKey, ethWalletAddress){
    let ret = []
    Coins.list.forEach(c => {
      let wallet_privatekey = c.wallet_symbol === 'BTC'? btcWallet_privateKey : ethWallet_privateKey
      let wallet_address = c.wallet_symbol === 'BTC'? btcWalletAddress : ethWalletAddress
      let coin = new Coin({
        token_name: c.token_name, token_symbol:c.token_symbol, wallet_symbol:c.wallet_symbol, wallet_privatekey, wallet_address,
        token_contract_address:c.token_contract_address, decimals:c.decimals, balance:0, gbpPrice:0, isAdded: true, icon_path:c.icon_path
      })
      ret.push(coin)
    })
    
    return ret
  }
}

export default CreateCoinStore
