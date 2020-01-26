import { AsyncStorage, NativeModules } from 'react-native'
import MnemonicDS from './SecureMnemonicDS'
import PrivateKeyDS from './SecurePrivateKeyDS'
import { ethers } from 'ethers'

const dataKey = `PASSWORD`
const IVKey = `IVKey`
const passwordValue = `PASSWORD`

export default class SecureDS {
  pincode = ''
  iv = null
  passwordRaw = null

  // Return new SecureDS
  static async getInstance(pincode) {
    try {
      const password = passwordValue;
      return new SecureDS(pincode, false, password)
    } catch (err) {
      return null
    }
  }

  constructor(pincode) {
    if (!pincode) throw new Error('Pincode can not be blank')
    this.pincode = `${pincode}`
  }

  randomKey = (length = 16) => {
    return ethers.utils.randomBytes(length).toString('hex').slice(0, length)
  }
  _getPassword = async () => {
    const password = await AsyncStorage.getItem(dataKey)
    return password
  }// cipher
  getIV = async () => {
    if (this.iv !== null) return this.iv

    let iv = await AsyncStorage.getItem(IVKey)
    if (!iv) {
      iv = this.randomKey()
      await AsyncStorage.setItem(IVKey, iv)
    }

    this.iv = iv
    return iv
  }

  static forceSavePassword(password) {
    AsyncStorage.setItem(dataKey, password)
  }

  static forceSaveIV(iv) {
    return AsyncStorage.setItem(IVKey, iv)
  }

  async hasSetupPincode() {
    return this._getPassword()
  }

  _deriveNew = (iv) => {
    const password = this.randomKey()
    AsyncStorage.setItem(dataKey, password)
    
    return password
  }

  derivePass = async () => {
    const passCipher = await this._getPassword()
    const iv = await this.getIV()
    if (!passCipher) return { password: this._deriveNew(iv), iv }
    return { password: passCipher, iv }
  }

  deriveMnemonic = async () => {
    if (!this.iv) await this.getIV()
    const { iv, password } = await this.derivePass()
    const mnemonicDS = new MnemonicDS(password, iv)
    const mnemonic = await mnemonicDS.derive();
    return mnemonic
  }

  derivePrivateKey = async (address) => {
    if (!this.iv) await this.getIV()

    const { iv, password } = await this.derivePass()
    const privateKeyDS = new PrivateKeyDS(password, iv)
    return await privateKeyDS.getPrivateKey(address)
  }

  savePrivateKey = async (address, privateKey) => {
    if (!this.iv) await this.getIV()

    const { iv, password } = await this.derivePass()
    const privateKeyDS = new PrivateKeyDS(password, iv)
    await privateKeyDS.savePrivateKey(address, privateKey)
  }

  removePrivateKey = async (address) => {
    if (!this.iv) await this.getIV()

    const { iv, password } = await this.derivePass()
    const privateKeyDS = new PrivateKeyDS(password, iv)
    await privateKeyDS.deletePrivateKey(address)
  }

  clearAllData = async () => {
    if (!this.iv) await this.getIV()
    const { iv, password } = await this.derivePass()

    AsyncStorage.removeItem(dataKey)
    AsyncStorage.removeItem(IVKey)

    await new PrivateKeyDS(password, iv).clearAllData()
    await new MnemonicDS(password, iv).remove()
  }
}
