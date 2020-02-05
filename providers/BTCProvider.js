
import { observable, has} from 'mobx'
import * as bitcoin from 'bitcoinjs-lib'
import * as bip39 from 'bip39'
import qs from 'qs'
import Constants from '../constants/constant'
import { BigNumber}  from 'bignumber.js'
import axios from 'axios'

let coinSelect = require('coinselect')

var BITCOIN_DIGITS = 8;
var BITCOIN_SAT_MULT = Math.pow(10, BITCOIN_DIGITS);

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
    const url = Constants.BTC_API_URL + "addr/" + this.address + "/balance"
    const response = await axios.get(url)  
    return response.data/BITCOIN_SAT_MULT
  }

  async send(to, amount) {
    // console.log('BTC Private Key: ', this.privateKey)
    const targets = [{
      address: to,
      value: (new BigNumber(amount)).times(Constants.BTC_TO_SATOSHI).toNumber(),
    }];
    var ret;
    try {
      ret = await this.buildTransaction({
        targets,
        feeRate: Constants.DEFAULT_FEE_STATE_PER_BYTE,
        includeUnconfirmedFunds: false,
      });
    } catch(e) {
      console.log("build error");
    }
    // console.log('buildTransaction Result', ret)
    if (!ret) {
      return;
    }

    var finalTx;
    try {
      finalTx = await this.signTx({
        txBuilder: ret.txBuilder,
        inputValues: ret.inputValues
      });
    } catch(e) {
      console.log("key error");
      return;
    }
    // console.log('sign result:', finalTx)

    const hash = finalTx.toHex();

    const res = await this.pushTx(hash);

    return res.data
  }

  async getTxList() {
    let txs
    try {
      const url = Constants.BTC_API_URL + "txs/?address=" + this.address
      console.log(url)
      const response = await axios.get(url)  
      txs = response.data.txs
    } catch (e) {
      return []
    }
    if (!txs) {
      return []
    }
    
    var count = 0
    let newList = []
    for (let item of txs) {
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

  async buildTransaction(option) {
    const { targets, feeRate, includeUnconfirmedFunds } = option;
    
    const txb = new bitcoin.TransactionBuilder(this.network);
    txb.setVersion(1);
    let res = await this.getUtxos([this.address], includeUnconfirmedFunds);
    // console.log('getUtxos Result:', res)
    if (!res) {
      console.log("Invalid address");
      return null;
    }
    let { inputs, outputs, fee } = coinSelect(res.utxos, targets, feeRate)
    
    if (!inputs || !outputs) {
      console.log("Insufficient balance because fee is variable");
      return null;
    }

    const inputValues = [];
    inputs.forEach(input => {
      txb.addInput(input.txId, input.vout);
      inputValues.push(input.value); // for BCH
    })

    outputs.forEach(output => {
      if (!output.address) {
        output.address = this.getAddress();
      }
      txb.addOutput(output.address, output.value)
    })
    
    return {
      txBuilder: txb,
      fee: (new BigNumber(fee)).div(Constants.BTC_TO_SATOSHI),
      inputValues: inputValues,
    };
  }

  async getUtxos(addressList, includeUnconfirmedFunds = false, fallback = true){
    let v = await this.getUtxosRaw(addressList, fallback);
    if (!v) {
      return null;
    }

    const utxos = [];
    let bal = new BigNumber(0);
    let unconfirmed = new BigNumber(0);

    for(let i = 0; i < v.length; i++){
      bal = bal.plus(v[i].amount);
      const u = v[i];
      if (includeUnconfirmedFunds || u.confirmations){
        utxos.push({
          value: (new BigNumber(u.amount)).times(Constants.BTC_TO_SATOSHI).toNumber(),
          txId: u.txid,
          vout: u.vout,
          address: u.address,
          confirmations: u.confirmations
        })
      }else{
        unconfirmed = unconfirmed.plus(u.amount)
      }
    }
    return {
      balance: bal.toNumber(),
      utxos,
      unconfirmed: unconfirmed.toNumber()
    }
  }

  getUtxosRaw(addressList, fallback = true, cnt = 0) {
    return axios({
      url: Constants.BTC_API_URL + "addrs/" + addressList.join(",") + "/utxo",
      method: "GET"
    }).then(res => res.data);
  }

  signTx(option){
    const { txBuilder, inputValues } = option;

    for(let i = 0; i < inputValues.length; i++){
        txBuilder.sign(i, bitcoin.ECPair.fromWIF(this.privateKey, this.network))
    }
    return txBuilder.build()
  }

  pushTx(hex) {
    return axios({
        url: Constants.BTC_API_URL + "tx/send",
        data: qs.stringify({
            rawtx: hex
        }),
        method: "POST"
    }).then(res => {
        return {
            status: res.status,
            data: res.data
        };
    }).catch(function (error) {
        console.log('pushTx API call error:', error);
        const res = error.response;
        if (res) {
            return {
                status: res.status,
                data: res.data
            }
        } else {
            return null;
        }
    })
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
    txData['date'] = date.toLocaleString();
    txData['timestamp'] = timestamp.toNumber();
    
    const trader = this.parseTx(tx);
    if (!trader) {
      // console.log("Failed to get the sender and receiver from tx data");
      return null;
    }
    const { receive, sender, receiver, amount } = trader;

    txData['from'] = sender;
    txData['to'] = receiver;
    txData['receive'] = receive;

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
    txData['confirmations'] = confirmations
    txData['state'] = state;

    // transaction description
    txData['descStr'] = desc.toUpperCase();
    
    if (receive) {
      desc = desc + " Receive";
    } else {
      desc = desc + " Transfer";
    }
    txData['desc'] = desc;

    // transaction amount
    txData['amount'] = amount;

    // transaction fee
    txData['fee'] = tx['fees'];

    // transaction url
    txData['url'] = this.getTxUrl(tx['txid']);
    txData['hash'] = tx['txid']
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
    return (Constants.BTC_TX_EXPLORER_URL + txId);
  }
}
