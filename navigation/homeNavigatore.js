import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LandingComponent from '../screens/landing';
import HomeComponent from '../screens/Home';
import BuyCryptoComponent from '../screens/BuyCrypto';
import AddCoinTokenComponent from '../screens/AddCoinToken';
import DAppsComponent from '../screens/DApps';
import RestoreWalletComponent from '../screens/RestoreWallet';
import SettingComponent from '../screens/Settings';
import ChangePinOneComponent from '../screens/ChangePinStep1';
import ChangePinTwoComponent from '../screens/ChangePinStep2';
import ChangePinThreeComponent from '../screens/ChangePinStep3';
import CoinDetailReceiveComponent from '../screens/CoinDetailReceive';
import CoinDetailSendComponent from '../screens/CoinDetailSend';
import ShapeshiftExchangeComponent from '../screens/ShapeshiftExchange';
import TermsServiceComponent from '../screens/TermsService';
import PinComponent from '../screens/pin';
import CoinDetailComponent from '../screens/CoinDetails';
import TransactionDetailReceivedComponent from '../screens/TransactionDetailReceived';
import TransactionDetailSentComponent from '../screens/TransactionDetailSent';
import RecoveryStepOneComponent from '../screens/recovery-phrase-step1';
import RecoveryStepTwoComponent from '../screens/recovery-phrase-step2';
import ShowRecoveryPhraseStepOneComponent from '../screens/ShowRecoveryPhraseStep1';
import ShowRecoveryPhraseStepTwoComponent from '../screens/ShowRecoveryPhraseStep2';






const config = Platform.select({
    web: { headerMode: 'screen' },
    default: {},
});

const HomeStack1 = createStackNavigator(
    {
        Home: LandingComponent,
        Main:HomeComponent,
        BuyCrypto:BuyCryptoComponent,
        AddCoinToken:AddCoinTokenComponent,
        DApps:DAppsComponent,
        RestoreWallet:RestoreWalletComponent,
        Settings:SettingComponent,
        ChangePinOne:ChangePinOneComponent,
        ChangePinTwo:ChangePinTwoComponent,
        ChangePinThree:ChangePinThreeComponent,
        CoinDetailReceive:CoinDetailReceiveComponent,
        CoinDetailSend:CoinDetailSendComponent,
        ShapeshiftExchange:ShapeshiftExchangeComponent,
        TermsService:TermsServiceComponent,
        Pin:PinComponent,
        CoinDetail:CoinDetailComponent,
        TransactionDetailReceived:TransactionDetailReceivedComponent,
        TransactionDetailSent:TransactionDetailSentComponent,
        RecoveryStepOne:RecoveryStepOneComponent,
        RecoveryStepTwo:RecoveryStepTwoComponent,
        ShowRecoveryPhraseStepOne:ShowRecoveryPhraseStepOneComponent,
        ShowRecoveryPhraseStepTwo:ShowRecoveryPhraseStepTwoComponent
    },
    config
);

HomeStack1.navigationOptions = {
    header: null
};

HomeStack1.path = '';

export default HomeStack1;