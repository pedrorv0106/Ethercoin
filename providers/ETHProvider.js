import { observable} from 'mobx'
import { ethers } from 'ethers'
import EtherscanApi from 'etherscan-api'
import erc20ABI from './ERC20.js'
import Constants from '../constants/constant'

export default class ETHProvider {

  @observable wallet = null
  @observable etherscanApi = null

  constructor(mnemonics) {
    this.loadWalletFromMnemonics(mnemonics)
    this.etherscanApi = new EtherscanApi.init(null, Constants.ETH_NETWORK, 0)
  }

  // constructor(privateKey) {
  //   this.privateKey = privateKey
  //   this.loadWalletFromPrivateKey(this.privateKey)
  //   this.etherscanApi = new EtherscanApi.init(null, Constants.ETH_NETWORK, 0)
  // }

  loadWalletFromMnemonics (mnemonics) {
    provider = ethers.getDefaultProvider(Constants.ETH_NETWORK)
    provider.getBalance = provider.getBalance.bind(provider)
    this.wallet = ethers.Wallet.fromMnemonic(mnemonics).connect(provider)
  }

  loadWalletFromPrivateKey (privateKey) {
    provider = ethers.getDefaultProvider(Constants.ETH_NETWORK)
    provider.getBalance = provider.getBalance.bind(provider)
    this.wallet = new ethers.Wallet(privateKey, provider)
  }

  address() {
    return this.wallet.address
  }
  async getEtherBalance() {
    const balance = await this.wallet.provider.getBalance(this.wallet.address)
    return Number(ethers.utils.formatEther(balance))
  }

  async getTokenBalance(tokenAddress) {
    const contract = new ethers.Contract(tokenAddress, erc20ABI, this.wallet) 
    const balance = await contract.balanceOf(this.wallet.address);
    const decimals = await contract.decimals()
    const tokenBalance = ethers.utils.formatUnits(balance, decimals)
    return Number(tokenBalance)
  }

  async getBalance(tokenAddress) {
    return (tokenAddress == "") ? (await this.getEtherBalance()) : (await this.getTokenBalance(tokenAddress))
  }

  async sendEther(to, amount) {
    const network = await this.wallet.provider.getNetwork()
    const transaction = await this.wallet.sendTransaction({
      to: to,
      value: ethers.utils.parseEther(amount.toString()),
      chainId: network.chainId
    })
    return transaction
  }
  async sendToken(to, amount, tokenAddress) {
    // const network = await this.wallet.provider.getNetwork()
    const contract = new ethers.Contract(tokenAddress, erc20ABI, this.wallet)
    const decimals = await contract.decimals()
    const transaction = await contract.transfer(to, ethers.utils.parseUnits(amount.toString(), decimals))
    return transaction
  }

  async send(to, amount, tokenAddress) {
    return (tokenAddress == "") ? (await this.sendEther(to, amount)) : (await this.sendToken(to, amount, tokenAddress))
  }
  
  async getTxList(tokenAddress) {
    return (tokenAddress == "") ? (await this.getEtherTxList()) : (await this.getTokenTxList(tokenAddress))
  }

  async getEtherTxList() {
    
    let data, newList = []
    try {
      data = await this.etherscanApi.account.txlist(this.address(), 1, 'latest', 1, 100, 'desc')
    } catch (e) {
      return []
    }
    if (data.result) {
      let list = data.result
      for(let i in list) {
        if (list[i].value == 0)
          continue
        newList.push(this.makeTxData(list[i]))
      }
    }
    return newList
  }

  async getTokenTxList(tokenAddress) {
    let data, newList = []
    try {
      data = await this.etherscanApi.account.tokentx(this.address(), tokenAddress, 1, 'latest', 'desc')
    } catch (e) {
      return []
    }

    const contract = new ethers.Contract(tokenAddress, erc20ABI, this.wallet) 
    const decimals = await contract.decimals()
    if (data.result) {
      let list = data.result
      for(let i in list) {
        newList.push(this.makeTxData(list[i], decimals))
      }
    }
    return newList
  }

  makeTxData(tx, decimals = 18) {
    let transaction = {}
    transaction['timestamp'] = tx.timeStamp
    
    // transaction date
    let date = new Date(tx.timeStamp * 1000)
    transaction['date'] = date.toLocaleString()
    transaction['confirmations'] = tx.confirmations
    // transaction direction
    let receive = (tx.from.toLowerCase() != this.address().toLowerCase())
    transaction['receive'] = receive
    
    transaction['from'] = tx.from.toLowerCase()
    transaction['to'] = tx.to.toLowerCase()
    
    // transaction state
    let state
    let desc
    if (Constants.TX_CONFIRMED_THRESHOLD <= tx.confirmations) {
      state = Constants.TX_STATE_CONFIRMED
      desc = "Confirmed"
    } else {
      state = Constants.TX_STATE_PENDING;
      desc = "Pending"
    }
    transaction['state'] = state
    // transaction description
    transaction['descStr'] = desc.toUpperCase()
    if (receive) {
      desc = desc + " Receive";
    } else {
      desc = desc + " Transfer";
    }
    transaction['desc'] = desc
    // transaction amount
    let amount = Number(ethers.utils.formatUnits(tx.value, decimals))
    transaction['amount'] = amount
    // transaction fee
    let fee = Number(ethers.utils.formatUnits(tx.gasUsed, decimals)) * Number(tx.gasPrice)
    transaction['fee'] = fee
    // transaction url
    transaction['hash'] = tx.hash
    transaction['url'] = this.getTxUrl(transaction['hash'])
    transaction['showDetail'] = false
    return transaction
  }

  getTxUrl(txId) {
    return (Constants.ETH_TX_EXPLORER_URL + "/" + txId);
  }
}
