
import { observable} from 'mobx'
import * as bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39'
import qs from 'qs'
import bitcoinTransaction from 'bitcoin-transaction'
import Constants from '../constants/constant'
import { BigNumber}  from 'bignumber.js'

export default class BTCProvider {

  @observable privateKey = null
  @observable address = null
  @observable mnemonic = null
  @observable network = null
  constructor(mnemonic) {
    this.mnemonic = mnemonic 
    this.network = Constants.BTC_NETWORK == "mainnet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet
  }

  async loadWalletFromMnemonic () {
    const seed = await bip39.mnemonicToSeed(this.mnemonic)
    const master = bitcoin.bip32.fromSeed(seed, this.network)
    const derived = master.derivePath("m/49'/0'/0'/0'/0/1")
    this.privateKey = derived.toWIF()

    const keyPair = bitcoin.ECPair.fromWIF(derived.toWIF(), this.network)
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.network});
    this.address = address
  }

  getAddress() {
    return this.address
  }

  async getBalance() {
    let balance = await bitcoinTransaction.getBalance(this.address, { network: Constants.BTC_NETWORK })
    return Number(balance)
  }

  async send(to, amount) {
    return await bitcoinTransaction.sendTransaction({
      from: this.address,
      to: to,
      privKeyWIF: this.privateKey,
      btc: amount,
      network: Constants.BTC_NETWORK
    })
  }
  async getTxList() {
    let txs
    try {
      txs = await this.getTxs("", "", this.address)
    } catch (e) {
      return []
    }
    if (!txs) {
      return []
    }
    var items = txs['items'];
    if (!items) {
      return []
    }

    var count = 0
    let newList = []
    for (let item of items) {
      var txData = this.makeTxData(item);
      if (!txData) {
        continue
      }

      newList.push(txData)
      if (Constants.TX_HISTORY_LIMIT <= (++count)) {
        break
      }
    }
    return newList
  }

  getTxs(from, to, addrs) {
    return axios({
        url: Constants.BTC_API_URL + "/addrs/txs",
        data: qs.stringify({
            noAsm: 1,
            noScriptSig: 1,
            noSpent: 0,
            from,
            to,
            addrs: addrs.join(',')
        }),
        method: "POST"
    }).then(res => res.data);
  }

  makeTxData(tx) {
    var txData = new Object();

    // transaction date
    let time = tx['time'];
    if (!time) {
      return;
    }
    let timestamp = new BigNumber(time).multipliedBy(1000);
    let date = new Date(timestamp.toNumber());
    txData['txDate'] = date.toLocaleString();
    txData['timeStamp'] = timestamp.toNumber();
    txData['txIdx'] = txData['timeStamp'];

    const trader = this.parseTx(tx);
    if (!trader) {
      // console.log("Failed to get the sender and receiver from tx data");
      return null;
    }
    const { receive, sender, receiver, amount } = trader;

    txData['from'] = sender;
    txData['to'] = receiver;
    txData['txReceive'] = receive;

    // transaction state
    let state = Constants.TX_STATE_CONFIRMED;
    let desc = "Confirmed";
    var confirmations = tx['confirmations'];
    if (confirmations != null && confirmations != undefined) {
      const count = (new BigNumber(confirmations)).toNumber();
      if (0 <= count && count < Constants.TX_CONFIRMED_THRESHOLD) {
        state = Constants.TX_STATE_PENDING;
        desc = "Pending";
      }
    }
    txData['txState'] = state;

    // transaction description
    txData['txDescStr'] = desc.toUpperCase();
    
    if (receive) {
      desc = desc + " Receive";
    } else {
      desc = desc + " Transfer";
    }
    txData['txDesc'] = desc;

    // transaction amount
    txData['txAmount'] = amount;

    // transaction fee
    txData['txFee'] = tx['fees'];

    // transaction url
    txData['txUrl'] = this.getTxUrl(tx['txid']);

    txData['showDetail'] = false;

    return txData;
  }

  parseTx(tx) {
    var receive = true;
    var sender;
    var receiver;
    var addr;
    var amount;
    const myAddress = this.address;

    const vin = tx['vin'];
    const vout = tx['vout'];
    if (!vin || !vout) {
      // console.log("Invalid transaction data");
    }

    for (let charge of vin) {
      addr = charge['addr'];
      if (!addr) {
        continue;
      }
      sender = addr;

      if (sender == myAddress) {
        // send transaction
        receive = false;
        break;
      }
    }

    for (let discharge of vout) {
      const value = discharge['value'];
      const scriptPubKey = discharge['scriptPubKey'];
      if (scriptPubKey) {
        const addresses = scriptPubKey['addresses'];
        if (!addresses) {
          continue;
        }

        addr = addresses[0];
        addr = addr;

        if (!receive) {
          // send transaction
          if (addr != myAddress) {
            receiver = addr;
            amount = value;
            break;
          }
        } else {
          // receive transaction
          if (addr == myAddress) {
            receiver = myAddress;
            amount = value;
            break;
          }
        }
      }
    }

    if (sender && receiver && amount) {
      return { receive, sender, receiver, amount };
    }
    return null;
  }

  getTxUrl(txId) {
    return (Constants.BTC_TX_EXPLORER_URL + "/" + txId);
  }
}
