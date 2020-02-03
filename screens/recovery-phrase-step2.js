import React, {Component} from 'react';
import { StyleSheet, View, ImageBackground, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Input, Text } from 'native-base';
import CreateWalletStore from '../appstores/CreateWalletStore';
import shuffle from 'lodash.shuffle'

export default class RecoveryStepTwoComponent extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    
    const mnemonicString = props.navigation.state.params.mnemonicString
    let mnemonic = mnemonicString.split(' ')
    let listKeywordRandom = shuffle(mnemonic)

    this.state = {
      mnemonicString: mnemonicString,
      mnemonic: mnemonic,
      listKeywordRandom: listKeywordRandom,
    passphraseInputValue1: '',
    passphraseInputValue2: '',
    passphraseInputValue3: '',
    passphraseInputValue4: '',
    };
  }
  onBackupNow = async () =>{
    const {listKeywordRandom, passphraseInputValue1, passphraseInputValue2, passphraseInputValue3, passphraseInputValue4} = this.state;
  
    if(passphraseInputValue1 === listKeywordRandom[0]
      && passphraseInputValue2 === listKeywordRandom[1]
      && passphraseInputValue3 === listKeywordRandom[2]
      && passphraseInputValue4 === listKeywordRandom[3]) {        
        const createWalletStore = new CreateWalletStore();
        await createWalletStore.handleRestoreWallet(this.state.mnemonicString);

        this.props.navigation.navigate('Main')
    } else {
      Alert.alert(
        'Error',
        'Please input correct Passphrase words.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      );
    }
  }

  render() {
    const {goBack} = this.props.navigation;
    const {mnemonic, listKeywordRandom} = this.state
    const passphraseIndex1 = mnemonic.indexOf(listKeywordRandom[0]);
    const passphraseIndex2 = mnemonic.indexOf(listKeywordRandom[1]);
    const passphraseIndex3 = mnemonic.indexOf(listKeywordRandom[2]);
    const passphraseIndex4 = mnemonic.indexOf(listKeywordRandom[3]);

    return (
      <View style={ styles.container }>
          <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
              <TouchableOpacity onPress={() => goBack()}>
                <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
              </TouchableOpacity>
              <Text style={ styles.PageTitle}>Recovery Phrase</Text>      
              <TouchableOpacity onPress={this._onPressButton}/>
          </ImageBackground>

          <ScrollView style={ styles.ScrollViewContainer}>
            <View style={ styles.PassphraseBox}>
                <Text style={ styles.PassphraseText1}>Enter your Passphrase Words</Text> 
                <Text style={ styles.PassphraseText2}>as required below</Text>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>{passphraseIndex1 + 1}</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue1) => this.setState({passphraseInputValue1})}
                  />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>{passphraseIndex2 + 1}</Text> 
                <Input style={ styles.PassphraseListText}
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue2) => this.setState({passphraseInputValue2})} 
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>{passphraseIndex3 + 1}</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue3) => this.setState({passphraseInputValue3})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>{passphraseIndex4 + 1}</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue4) => this.setState({passphraseInputValue4})}
                />
              </View>
            </View>

            <TouchableOpacity style={ styles.BackupButtonBox} onPress={ this.onBackupNow }>
              <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.BackupButtonbg}>
                <Text style={ styles.BackupButton}>Backup Now</Text>  
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
  PageTitle:{ paddingRight: 40, textAlign:"center", lineHeight:120, color:"#fff", fontSize:20, fontWeight:"600", },
  rightbutton:{ marginLeft:20, marginTop:45},
  leftbutton:{ marginRight:20, marginTop:45},
  ScrollViewContainer:{ paddingTop:30, paddingLeft:20, paddingRight:20,},
  PassphraseBox:{ backgroundColor:"#f9f2fd", borderStyle:"dotted", borderWidth:1, borderColor:"#5a4c75", textAlign:"center", padding:20, borderRadius:5, marginBottom:20,},
  PassphraseText1:{ textAlign:"center", color:"#5f36a8", fontWeight:"600", fontSize:18, },
  PassphraseText2:{ textAlign:"center", color:"#5f36a8", fontSize:16, },
  PassphraseListTitle:{ fontFamily:"LatoRegular", textAlign:"center", color:"#333333", fontSize:18, letterSpacing:0.25, marginBottom:10},
  PassphraseCol:{ position:"relative", paddingLeft:55, minHeight:60, marginBottom:20, borderRadius:30, paddingRight:10, elevation: 10,  shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.35, backgroundColor:"#fff"},
  PassphraseListNumber:{ fontFamily:"LatoRegular", fontWeight:"bold", position:"absolute", left:10, top:10, width:40, height:40, borderRadius:20, borderColor:"#6137a7", borderWidth:2, textAlign:"center", lineHeight:36, borderStyle:"solid", color:"#6137a7", fontSize:20, },
  PassphraseListText:{ lineHeight:40, color:"#333333", fontSize:18},
  BackupButtonBox:{ marginBottom:50, marginTop:20, width:170, height:52, marginRight:"auto", marginLeft:"auto"},
  BackupButton:{ textAlign:"center", lineHeight:50, color:"#f5f5f5", fontSize:18},
  BackupButtonbg:{ width:"100%", height:"100%"},
});