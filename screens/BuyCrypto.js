import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col, Input,  Icon, Picker  } from 'native-base';
import fiatCurrency from '../constants/fiatCurrency'
import { observer, inject } from 'mobx-react'

@inject("appCoinsStore")
@observer
export default class BuyCryptoComponent extends Component {
  static navigationOptions = {
      header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      coins: props.navigation.state.params.coins,
      selectedCoin: props.navigation.state.params.coins[0],
      selectedWallet: props.navigation.state.params.coins[0],
      isChangingCoin: false,
      isChangingWallet: false,
      fiat_currency: 'USD',
      fiat_amount: '',
      digital_amount: ''
    };
  }
  onBuy(){
    console.log('onBuy')
  }

  onChangeFiatCurrencyAmount(value){
    let fiat_amount = value + ''
    this.setState({fiat_amount})
  }
  onChangeCoinAmount(value){
    let digital_amount = value + ''
    this.setState({digital_amount})
  }
  onValueChangeCoin(value) {
    this.setState({
      selectedCoin: value
    });
  }
  onValueChangeFiatCurrecncy(value) {
    this.setState({
      fiat_currency: value
    });
  }

  renderCoinPickerItems(){
    const pickerItems = []
    const {coins} = this.state
    if(coins != null){
      coins.forEach(c => {
        const item = <Picker.Item key={c.token_symbol} label={c.token_symbol} value={c} />
        pickerItems.push(item)
      })
    }
    return pickerItems
  }
  renderFiatCurrencyPickerItems(){
    const pickerItems = []
    fiatCurrency.list.forEach(c => {
      const item = <Picker.Item key={c.value} label={c.value} value={c.value} />
      pickerItems.push(item)
    })
  
    return pickerItems
  }

  renderDropdownSelectWallet(){
    let {coins} = this.state
    let contents =[]
    if(coins){
        coins.forEach(c => {
            item = <Button style={styles.CryptoModalButton}
                onPress={() => {
                  this.setState({
                    isChangingWallet: false,
                    selectedWallet: c
                  })
                }}
                >
              <Image style={styles.CryptoModalIcon} source={c.icon_path} />
              <Text style={styles.CryptoModalButtonText}>{c.token_name}</Text>
            </Button>
            contents.push(item)
        })
    }
    return contents
  }

  render() {
    const {goBack} = this.props.navigation;
    const { fiat_amount, selectedWallet, digital_amount} = this.state
    const dropdownWallet = this.renderDropdownSelectWallet()
    const fiatPickerItems = this.renderFiatCurrencyPickerItems()
    const coinPikcerItems = this.renderCoinPickerItems()
    const costSelectedWallet = selectedWallet.balance * selectedWallet.gbpPrice
    let address = ''
    if(selectedWallet.wallet_symbol === 'BTC'){
      address = this.props.appCoinsStore.btcProvider.getAddress()
    } else {
      address = this.props.appCoinsStore.ethProvider.address()
    }

    return (
      <Container>
        <View style={ styles.container }>
          {/* Header start */}
          <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
            <TouchableOpacity onPress={() => goBack()}>
              <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
            </TouchableOpacity>
                
            <Text style={ styles.PageTitle}>Buy Crypto</Text>  

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
              </TouchableOpacity>      
          </ImageBackground>
          {/* Header End */}

          {/* Content start */}
          <ScrollView style={ styles.ScrollViewContainer}>
            <Grid style={ styles.WalletGrid}>
              <ImageBackground source={require('../assets/images/WalletBackground.png')} style={styles.WalletBackground}>
                <Col style={ styles.WalletCol}>
                  <Image style={styles.WalletIcon} source={selectedWallet.icon_path} />
                  <Text style={styles.WalletTitle}>My Wallet</Text>
                  <Text style={styles.WalletDetail}>{address}</Text>
                  <Text style={styles.WalletAmount}>£ {costSelectedWallet.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.WalletButton} 
                      onPress={() => {
                        this.setState({ isChangingWallet: true })
                      }}>
                      <Text style={styles.WalletButtonText}>CHANGE</Text>
                    </TouchableOpacity>
                </Col>
              </ImageBackground>
            </Grid>
            <Grid style={ styles.CryptoGrid}>
              <Col style={ styles.CryptoCol}>
                <Input
                  onChangeText={(value) => this.onChangeFiatCurrencyAmount(value)}
                  keyboardType={'numeric'}
                  placeholder="0.00"
                  value={fiat_amount}
                  style={ styles.CryptoInput} />
                <View style={ styles.CryptoSelect}>
                  <ImageBackground source={require('../assets/images/WalletBackground.png')} style={styles.SelectBackground}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                      style={ styles.colPicker}
                      selectedValue={this.state.fiat_currency}
                      onValueChange={this.onValueChangeFiatCurrecncy.bind(this)}
                      textStyle={{ fontSize:18,color:"#fff",}}
                    >
                      {fiatPickerItems}
                    </Picker> 
                  </ImageBackground>
                </View>
              </Col>
            </Grid>
            <Grid style={ styles.CryptoGrid}>
              <Col style={ styles.CryptoCol}>
                <Input 
                  onChangeText={(value) => this.onChangeCoinAmount(value)}
                  keyboardType={'numeric'}
                  placeholder="0.00" 
                  value={digital_amount}
                  style={ styles.CryptoInput} />
                <View style={ styles.CryptoSelect}>
                  <ImageBackground source={require('../assets/images/WalletBackground.png')} style={styles.SelectBackground}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                      style={ styles.colPicker}
                      selectedValue={this.state.selectedCoin}
                      onValueChange={this.onValueChangeCoin.bind(this)}
                      textStyle={{ fontSize:Platform.OS === 'ios' ? 18 : 30,color:"#fff",}}
                    >                
                      {coinPikcerItems}
                    </Picker> 
                  </ImageBackground>
                </View>
              </Col>
            </Grid>

            <TouchableOpacity style={ styles.BackupButtonBox}
              onPress={()=>this.onBuy()}>
              <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.BackupButtonbg}>
                <Text style={ styles.BackupButton}>BUY</Text>  
              </ImageBackground>
            </TouchableOpacity>

            <Grid style={ styles.PoweredBox}>
              <Col style={ styles.PoweredCol}>
                <Image style={styles.PoweredImage} source={require('../assets/images/Powered-icon2.jpg')} />
                <Text style={styles.PoweredText}>Powered by</Text>
              </Col>
            </Grid>
          </ScrollView>
          {/* Content end */}
        </View>
        {/* Footer start */}
        <Footer style={styles.Footer}>
          <FooterTab style={styles.FooterTab}>
            <ImageBackground source={require('../assets/images/tab-bg.jpg')} style={styles.Tabbackground}>
              <Button style={styles.TabButton} onPress={() => this.props.navigation.navigate('Main')}>
                <Image style={styles.TabButtonImage} source={require('../assets/images/icon3.png')} />
                <Text style={styles.TabButtonText}>WALLET</Text>
              </Button>
              <Button style={styles.TabButton} onPress={() => this.props.navigation.navigate('CoinDetailReceive')}>
                <Image style={styles.TabButtonImage} source={require('../assets/images/icon4.png')} />
                <Text style={styles.TabButtonText}>RECEIVE</Text>
              </Button>
              <Button style={styles.TabButton} onPress={() => this.props.navigation.navigate('CoinDetailSend')}>
                <Image style={styles.TabButtonImage} source={require('../assets/images/icon5.png')} />
                <Text style={styles.TabButtonText}>SEND</Text>
              </Button>
              <Button style={styles.TabButton} onPress={() => this.props.navigation.navigate('ShapeshiftExchange')}>
                <Image style={styles.TabButtonImage} source={require('../assets/images/icon6.png')} />
                <Text style={styles.TabButtonText}>EXCHANGE</Text>
              </Button>
            </ImageBackground>
          </FooterTab>
        </Footer>
        {/* Footer End */}

        { this.state.isChangingWallet && <View style={styles.CryptoModal}>
          { dropdownWallet }
        </View>
        }
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
  PageTitleBox:{ paddingTop:30,},
  PageTitle:{ textAlign:"center", lineHeight: 120, color:"#fff", fontSize:20, fontWeight:"600", },
  rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
  leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
  ScrollViewContainer:{ paddingTop:20,  paddingLeft:15, paddingRight:15,},
  Tabbackground:{ display:"flex", flexDirection: 'row', width:"100%", resizeMode: 'cover', padding:0, },
  TabButton:{ width:"25%", height:"100%", padding:0, borderRadius:0, backgroundColor:"transparent"  },
  tabBarActiveTextColor:{ backgroundColor:"#fff"},
  TabButtonText:{ color:"#fff", fontSize:10, fontWeight:"500",    },
  Footer:{ height:75,elevation: 10, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1, },
  TabButtonImage:{ marginBottom:5,},

  WalletGrid:{ borderRadius:8,  overflow:"hidden", marginBottom:30,  },
  WalletBackground:{ width:"100%",},
  WalletCol:{ width:"100%", height:140, position:"relative", paddingLeft:70, paddingRight:120, paddingTop:25,  },
  WalletIcon:{ position:"absolute", left:15, top:"50%", marginTop:-10, width:40, height:40, },
  WalletTitle:{ textAlign:"center", color:"#fff", fontWeight:"700", fontSize:16, textTransform:"uppercase", marginBottom:10,  },
  WalletDetail:{ color:"#fff", fontSize:14, width:"100%", height:20, overflow:"hidden", textAlign:"center", marginBottom:10, },
  WalletAmount:{ textAlign:"center", fontSize:16, fontWeight:"700", color:"#fff",  },
  WalletButton:{ position:"absolute", right:10, top:"50%", marginTop:-10, width:100, height:40, borderRadius:25, borderWidth:2, borderColor:"#fff", },
  WalletButtonText:{ fontSize:14, lineHeight:35, textAlign:"center", color:"#fff"   },

  CryptoGrid:{ marginBottom:30,},
  CryptoCol:{ shadowColor: '#000',elevation:5, shadowOffset: { width: 0, height: 0 }, shadowOpacity:0.35, width:"100%", height:60, backgroundColor:"#fff", borderRadius:30, borderWidth:3, borderColor:"#fff", paddingRight:120, paddingLeft:20, } ,
  CryptoInput:{ color:"#666666", fontSize:16,},
  CryptoSelect:{ position:"absolute", right:0,  top:0, borderTopRightRadius:30, borderBottomRightRadius:30, overflow:"hidden",  },
  SelectBackground:{ height:54, width:110, color:"#fff", fontSize:20, },
  colPicker:{ height:55, width:"100%",  margin:0, alignItems:"center", fontSize:Platform.OS === 'ios' ? 20 : 30, color:"#fff", padding:0, fontWeight:"700",},
  DownArrow:{ color:"#fff", fontSize:24, marginLeft:-5, marginTop:-2},

  BackupButtonBox:{ marginBottom:30,  width:170, height:52, marginRight:"auto", marginLeft:"auto"},
  BackupButton:{ textAlign:"center", lineHeight:50, color:"#f5f5f5", fontSize:16},
  BackupButtonbg:{ width:"100%", height:"100%"},
  PoweredBox:{ marginBottom:80,},
  PoweredCol:{ textAlign:"center", },
  PoweredImage:{ marginLeft:"auto", marginRight:"auto", },
  PoweredText:{ textAlign:"center", color:"#666666", fontSize:16, marginTop:5, },

  CryptoModal: { position: "absolute", left: 0, top: 0, width: "100%", height: "100%", backgroundColor: "#fff", zIndex: 999, paddingTop: 40, paddingLeft: 20, paddingRight: 20, },
  CryptoModalButton: { backgroundColor: "transparent", alignItems: "flex-start", textAlign: "left", justifyContent: "flex-start", borderBottomColor: "#ededed", borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15, height: 70, },
  CryptoModalButtonText: { lineHeight: 30, textAlign: "left", color: "#333333", fontSize: 18 },
  CryptoModalIcon: { width: 40, height: 40, marginRight: 20, },
});