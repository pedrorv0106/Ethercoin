import * as wallet from './wallet'
import * as etherJSONRPC from './ether-json-rpc'
import * as NotificationAPI from './NotificationAPI'
import * as Transaction from './Transaction'
import * as Token from './Token'
import * as Changelog from './Changelog'
import * as changelly from './changelly'
import * as simplex from './simplex'

export default {
  ...wallet,
  etherJSONRPC: { ...etherJSONRPC },
  ...NotificationAPI,
  ...Changelog,
  ...Token,
  ...Transaction,
  ...changelly,
  ...simplex,
}
