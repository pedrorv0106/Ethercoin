import { action } from 'mobx';
import Coin from './stores/Coin';

class CreateCoinStore {
  handleCreateCoins(btcWallet_privateKey, btcWalletAddress, ethWallet_privateKey, ethWalletAddress){    
    let btcCoin = new Coin({
      token_name:'Bitcoin', token_symbol: 'BTC', wallet_symbol:'BTC', wallet_privatekey:btcWallet_privateKey, wallet_address: btcWalletAddress,
      token_contract_address:'', decimals:0, balance:0, gbpPrice:0, isAdded: true
    })
    let ethCoin = new Coin({
      token_name:'Ethereum', token_symbol: 'ETH', wallet_symbol:'ETH', wallet_privatekey:ethWallet_privateKey, wallet_address: ethWalletAddress,
      token_contract_address:'', decimals:18, balance:0, gbpPrice:0, isAdded: true
    })
    let daiCoin = new Coin({
      token_name:'DAI', token_symbol: 'DAI', wallet_symbol:'ETH', wallet_privatekey:ethWallet_privateKey, wallet_address: ethWalletAddress,
      token_contract_address:'0x123456789012345678', decimals:6, balance:0, gbpPrice:0, isAdded: true
    })
    let usdcCoin = new Coin({
      token_name:'USD Coin', token_symbol: 'USDC', wallet_symbol:'ETH', wallet_privatekey:ethWallet_privateKey, wallet_address: ethWalletAddress,
      token_contract_address:'0x234567890123456789', decimals:6, balance:0, gbpPrice:0, isAdded: true
    })
  
    return [btcCoin, ethCoin, daiCoin, usdcCoin]
  }
}

export default CreateCoinStore
