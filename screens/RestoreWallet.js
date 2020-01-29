import React, {Component} from 'react';
import { Platform, StyleSheet, View, ImageBackground, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Input, Text } from 'native-base';
import MainStore from '../appstores/MainStore';
import BackupStore from '../appstores/BackupStore';

export default class RestoreWalletComponent extends Component {
  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
    header: null,
  };S
  state = {
    passphraseInputValue1: '',
    passphraseInputValue2: '',
    passphraseInputValue3: '',
    passphraseInputValue4: '',
    passphraseInputValue5: '',
    passphraseInputValue6: '',
    passphraseInputValue7: '',
    passphraseInputValue8: '',
    passphraseInputValue9: '',
    passphraseInputValue10: '',
    passphraseInputValue11: '',
    passphraseInputValue12: '',
  }
  onRestore = () =>{
    const {
      passphraseInputValue1, passphraseInputValue2, passphraseInputValue3, passphraseInputValue4,
      passphraseInputValue5, passphraseInputValue6, passphraseInputValue7, passphraseInputValue8,
      passphraseInputValue9, passphraseInputValue10, passphraseInputValue11, passphraseInputValue12
    } = this.state;

    if(passphraseInputValue1.trim() == ""
    || passphraseInputValue2.trim() == ""
    || passphraseInputValue3.trim() == ""
    || passphraseInputValue4.trim() == ""
    || passphraseInputValue5.trim() == ""
    || passphraseInputValue6.trim() == ""
    || passphraseInputValue7.trim() == ""
    || passphraseInputValue8.trim() == ""
    || passphraseInputValue9.trim() == ""
    || passphraseInputValue10.trim() == ""
    || passphraseInputValue11.trim() == ""
    || passphraseInputValue12.trim() == ""
    ) {
      Alert.alert(
        //title
        'Error',
        //body
        'Please input correct Passphrase words.',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
      );
    } else {
      const mnemonic = `${passphraseInputValue1} ${passphraseInputValue2} ${passphraseInputValue3} ${passphraseInputValue4} ${passphraseInputValue5} ${passphraseInputValue6} ${passphraseInputValue7} ${passphraseInputValue8} ${passphraseInputValue9} ${passphraseInputValue10} ${passphraseInputValue11} ${passphraseInputValue12}`;
      MainStore.backupStore = new BackupStore();
      MainStore.backupStore.setMnemonic(mnemonic);
      MainStore.backupStore.setup();
      this.props.navigation.navigate('Main')
    }
  }
  render() {
    const {goBack} = this.props.navigation;
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
                <Text style={ styles.PassphraseListNumber}>1</Text> 
                <Input style={ styles.PassphraseListText}
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue1) => this.setState({passphraseInputValue1})} 
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>2</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue2) => this.setState({passphraseInputValue2})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>3</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue3) => this.setState({passphraseInputValue3})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>4</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue4) => this.setState({passphraseInputValue4})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>5</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue5) => this.setState({passphraseInputValue5})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>6</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue6) => this.setState({passphraseInputValue6})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>7</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue7) => this.setState({passphraseInputValue7})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>8</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue8) => this.setState({passphraseInputValue8})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>9</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue9) => this.setState({passphraseInputValue9})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>10</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue10) => this.setState({passphraseInputValue10})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>11</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue11) => this.setState({passphraseInputValue11})}
                />
              </View>
            </View>

            <View style={ styles.PassphraseList}>
              <Text style={ styles.PassphraseListTitle}>Passphrase Word</Text> 
              <View style={ styles.PassphraseCol}>
                <Text style={ styles.PassphraseListNumber}>12</Text> 
                <Input style={ styles.PassphraseListText} 
                  autoCapitalize = 'none'
                  onChangeText={(passphraseInputValue12) => this.setState({passphraseInputValue12})}
                />
              </View>
            </View>
           
            <TouchableOpacity style={ styles.BackupButtonBox} onPress={ this.onRestore }>
              <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.BackupButtonbg}>
                <Text style={ styles.BackupButton}>Restore Wallet</Text>  
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
  PageTitle:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 90 : 120, color:"#fff", fontSize:20, fontWeight:"600", },
  rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
  leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
  ScrollViewContainer:{ paddingTop:30, paddingLeft:20, paddingRight:20,},
  PassphraseBox:{ backgroundColor:"#f9f2fd", borderStyle:"dotted", borderWidth:1, borderColor:"#5a4c75", textAlign:"center", padding:20, borderRadius:5, marginBottom:20,},
  PassphraseText1:{ textAlign:"center", color:"#5f36a8", fontWeight:"600", fontSize:18, fontFamily:'LatoRegular', fontWeight:"600" },
  PassphraseText2:{ textAlign:"center", color:"#5f36a8", fontSize:16, },
  PassphraseListTitle:{ textAlign:"center", color:"#333333", fontSize:18, letterSpacing:0.25, marginBottom:10},
  PassphraseCol:{ position:"relative", paddingLeft:55, minHeight:60, marginBottom:20, borderRadius:30, paddingRight:10, elevation: 10,  shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.35, backgroundColor:"#fff"},
  PassphraseListNumber:{ position:"absolute", left:10, top:10, width:40, height:40, borderRadius:20, borderColor:"#6137a7", borderWidth:2, textAlign:"center", lineHeight:Platform.OS === 'ios' ? 28 : 40, borderStyle:"solid", color:"#6137a7", fontSize:20, },
  PassphraseListText:{ lineHeight:40, color:"#333333", fontSize:18},
  BackupButtonBox:{ marginBottom:50, marginTop:20, width:170, height:52, marginRight:"auto", marginLeft:"auto"},
  BackupButton:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 40 : 50, color:"#f5f5f5", fontSize:Platform.OS === 'ios' ? 16 : 18},
  BackupButtonbg:{ width:"100%", height:"100%"},
});