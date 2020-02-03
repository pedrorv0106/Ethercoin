import MainStore from './MainStore';
import Keystore from '../libs/react-native-golden-keystore';
import CreateCoinStore from './CreateCoinStore';
import { ethers } from 'ethers';
import ETHProvider from '../providers/ETHProvider'

class CreateWalletStore {
    async handleRestoreWallet(mnemonic) {
        let pathETH = Keystore.CoinType.ETH.path
        let pathBTC = Keystore.CoinType.BTC.path

        pathETH = pathETH.replace('/index', '')
        pathBTC = pathBTC.replace('/index', '')

        const provider = ethers.getDefaultProvider('mainnet')//production ? 'mainnet' : 'ropsten'
        const walletETH = ethers.Wallet.fromMnemonic(mnemonic, pathETH).connect(provider)
        const ethPrivateKey = walletETH.privateKey //test "4E02B37F3CA2F1951C89FF0EC8B0E5585B817333FBC40B8C64D7FED79EB653CE"
        const walletBTC = ethers.Wallet.fromMnemonic(mnemonic, pathBTC).connect(provider)
        const btcPrivateKey = walletBTC.privateKey
      
        const ethProvider = new ETHProvider(ethPrivateKey)
        const ethAddress = ethProvider.address()
        const btcAddress = 'bc1qxjfpe9svhgypa2h4l8pk57rahxw9fcawd3fk7h'
        
        const createCoinStore = new CreateCoinStore();
        const coinArray = createCoinStore.handleCreateCoins(btcPrivateKey, btcAddress, ethPrivateKey, ethAddress);
        MainStore.appState.appCoinsStore.addCoins(coinArray)
        MainStore.appState.btcPrivateKey = btcPrivateKey
        MainStore.appState.btcAddress = btcAddress
        MainStore.appState.ethPrivateKey = ethPrivateKey
        MainStore.appState.ethAddress = ethAddress
        MainStore.appState.mnemonic = mnemonic
        MainStore.appState.save()
        MainStore.appState.appCoinsStore.getBalances()
    }
  }
  
  export default CreateWalletStore
  