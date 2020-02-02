import { observable, action, computed } from 'mobx'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import erc20ABI from './ERC20.js'
import Constants from '../../../constants/constant'

export default class ETHProvider {

  @observable privateKey = ''
  @observable wallet = null


  constructor(privateKey) {
    this.privateKey = privateKey
    this.loadWalletFromPrivateKey(this.privateKey)
  }

  loadWalletFromPrivateKey (privateKey) {
    provider = ethers.getDefaultProvider(Constants.ETHEREUM_NETWORK)
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
}
