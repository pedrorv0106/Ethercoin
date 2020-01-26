import { observable, action, computed } from 'mobx';
import MainStore from './MainStore';
import { generateNew } from './stores/Wallet';
import SecureDS from './DataSource/SecureDS';
import Keystore from '../Libs/react-native-golden-keystore';

class CreateWalletStore {
    @observable finished = false
    @observable loading = false
  
    @action handleCreateWallet() {
        this.loading = true
        const ds = new SecureDS('1111')
        let indexETH = MainStore.appState.currentWalletIndex
        let coinPathETH = Keystore.CoinType.ETH.path
        let indexBTC = MainStore.appState.currentBTCWalletIndex
        let coinPathBTC = Keystore.CoinType.BTC.path

        coinPathETH = coinPathETH.replace('/index', '')
        coinPathBTC = coinPathBTC.replace('/index', '')

        generateNew(ds, 'wallet', indexETH, indexBTC, coinPathETH, coinPathBTC ).then(async (walletArray) => {
          const wETH = walletArray[0]
          const wBTC = walletArray[1]
          this.finished = true
          MainStore.appState.appWalletsStore.addOne(wETH)
          MainStore.appState.setCurrentWalletIndex(indexETH + 1)
          // MainStore.appState.selectedWallet.fetchingBalance()
          MainStore.appState.appWalletsStore.addOne(wBTC)
          MainStore.appState.autoSetSelectedWallet()
          MainStore.appState.setCurrentBTCWalletIndex(indexBTC + 1)
          MainStore.appState.save()
          // MainStore.appState.selectedWallet.fetchingBalance()
          this.loading = false    
        }, ds)        
    }
  }
  
  export default CreateWalletStore
  