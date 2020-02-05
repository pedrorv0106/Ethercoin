import { observable, action, computed } from 'mobx'
import AppCoinsStore from './AppCoinsStore'
import AppDS from './datasource/AppDS'

class AppState {
    dataVersion = '1'
    @observable didBackup = false
    @observable internetConnection = 'online' // online || offline
    @observable allowDailyUsage = null
    @observable pinCode = ''
    @observable mnemonic = ''
  
    lastestVersionRead = ''
    shouldShowUpdatePopup = true
    
    static TIME_INTERVAL = 20000
  
    constructor() {
      this.appCoinsStore = new AppCoinsStore()
    }
    
    @action setBackup = (isBackup) => { this.didBackup = isBackup }
    @action setInternetConnection = (ic) => { this.internetConnection = ic }
    @action setLastestVersionRead = (lvr) => { this.lastestVersionRead = lvr }
    @action setShouldShowUpdatePopup = (isShow) => { this.shouldShowUpdatePopup = isShow }
      
    @action setAllowDailyUsage(isEnable) {
      this.allowDailyUsage = isEnable
      this.save()
    }
  
    @action setPinCode(code){
      this.pinCode = code
      this.save()
    }
    @action setMnemonic(mnemonic){
      this.mnemonic = mnemonic
      this.save()
    }
  
    @action async import(orgData) {
      const data = orgData
      this.didBackup = data.didBackup
      this.shouldShowUpdatePopup = data.shouldShowUpdatePopup !== undefined ? data.shouldShowUpdatePopup : true
      this.lastestVersionRead = data.lastestVersionRead
      this.allowDailyUsage = data.allowDailyUsage
      this.pinCode = data.pinCode
      this.mnemonic = data.mnemonic
  
      await this.appCoinsStore.getCoinFromDS()
      this.appCoinsStore.getBalances()
    }
    
    @computed get coins() {
      return this.appCoinsStore.coins
    }
  
    resetAppState() {
      this.setBackup(false)
      this.appCoinsStore.removeAll()
    }
  
    save() {
      return AppDS.saveAppData(this.toJSON())
    }
  
    toJSON() {
      return {
        dataVersion: this.dataVersion,
        didBackup: this.didBackup,
        lastestVersionRead: this.lastestVersionRead,
        shouldShowUpdatePopup: this.shouldShowUpdatePopup,
        allowDailyUsage: this.allowDailyUsage,
        pinCode: this.pinCode,
        mnemonic: this.mnemonic
      }
    }
  }
  
  export default new AppState()
  