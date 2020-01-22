import { observable, action } from 'mobx'
import AppDS from './DataSource/AppDS'
import appState from './AppState'

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
    appState.startAllServices()
  }
}

export default new MainStore