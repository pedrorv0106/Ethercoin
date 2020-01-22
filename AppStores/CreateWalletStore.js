import { observable, action, computed } from 'mobx';
import MainStore from './MainStore';
import { generateNew } from './stores/Wallet';
import NotificationStore from './stores/Notification';
import SecureDS from './DataSource/SecureDS';
import Keystore from '../Libs/react-native-golden-keystore';
import { chainNames } from '../Utils/WalletAddresses';
import MixpanelHandler from '../Handler/MixpanelHandler';

class CreateWalletStore {
    @observable customTitle = ``
    @observable finished = false
    @observable loading = false
  
    @action setTitle(title) {
      this.customTitle = title
    }
  
    @action handleCreateWallet(coin = chainNames.ETH) {
        MainStore.appState.mixpanleHandler.track(MixpanelHandler.eventName.CREATE_WALLET)
        this.loading = true
        const ds = new SecureDS('1111')
        let index = 0
        let coinPath = ''
        if (coin === chainNames.ETH) {
            coinPath = Keystore.CoinType.ETH.path
            index = MainStore.appState.currentWalletIndex
        } else if (coin === chainNames.BTC) {
            coinPath = Keystore.CoinType.BTC.path
            index = MainStore.appState.currentBTCWalletIndex
        }
        const { title } = this;
        generateNew(ds, title, index, coinPath, coin).then(async (w) => {
            this.finished = true
            NotificationStore.addWallet(title, w.address, w.type === 'ethereum' ? 'ETH' : 'BTC')
            console.log('aaaaaaaaaaaaaaaa', coinPath);
            MainStore.appState.appWalletsStore.addOne(w)
            MainStore.appState.autoSetSelectedWallet()
            if (coin === chainNames.ETH) {
                MainStore.appState.setCurrentWalletIndex(index + 1)
            } else if (coin === chainNames.BTC) {
                MainStore.appState.setCurrentBTCWalletIndex(index + 1)
            }
            MainStore.appState.save()
            MainStore.appState.selectedWallet.fetchingBalance()
            this.loading = false
        }, ds)
    }
  
    @computed get title() {
      return this.customTitle
    }
  }
  
  export default CreateWalletStore
  