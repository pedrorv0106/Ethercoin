import { AsyncStorage } from 'react-native'
import { ethers } from 'ethers'

const dataKey = `secure-mnemonic`

class SecureMnemonicDS {
  password = ''
  iv = ''

  constructor(password, iv) {
    this.password = password
    this.iv = iv
  }

  generateNew = () => {
    return ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16))
  }

  derive = async () => {
    const mnemonic = await AsyncStorage.getItem(dataKey)
    if (!mnemonic) return await this._deriveNew()

    return mnemonic//.split(' ')
  }

  remove = () => AsyncStorage.removeItem(dataKey)

  _deriveNew = async () => {
    const mnemonic = await this.generateNew()
    await AsyncStorage.setItem(dataKey, mnemonic)
    return mnemonic//.split(' ')
  }
}

export default SecureMnemonicDS
