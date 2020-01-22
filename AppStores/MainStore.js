import { observable, action } from 'mobx'
import AppDS from './DataSource/AppDS'
import appState from './AppState'
import PushNotificationHelper from '../commons/PushNotificationHelper'

class MainStore {
  @observable appState = appState
  secureStorage = null
  sendTransaction = null
  unlock = null
  importStore = null
  backupStore = null
  changePincode = null
  dapp = null
  addressBookStore = null
  importMnemonicStore = null
  importPrivateKeyStore = null
  importAddressStore = null

  // Start
  @action async startApp() {
    await AppDS.readAppData();
    appState.syncWalletAddresses()
    appState.initMixpanel()
    await PushNotificationHelper.init()
    appState.startAllServices()
  }
}

export default new MainStore