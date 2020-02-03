import React, { Component } from 'react';
import { StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Container, Footer, FooterTab, Button,  Icon, Grid, Col, Text, Row, Textarea, Picker,Input  } from 'native-base';
import MainStore from '../appstores/MainStore';
import { observer, inject } from 'mobx-react'

@inject("appCoinsStore")
@observer
export default class CoinDetailSendComponent extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedCoin: null,
      btcValue: '',
      gbpValue: '',
      toAddress: '0x0e1012F7720B20adAB861F70E09f1a82f99aCA57'
    };
  }

  componentWillMount() {
    this.loadCoinData()
  }
  loadCoinData(){
    let coins = this.props.appCoinsStore.coins
    coins = coins.filter(c => c.isAdded === true)
    this.setState({ selectedCoin:coins[0] })
  }
  async onSend(){
    const {selectedCoin, btcValue, gbpValue, toAddress} = this.state
    if(selectedCoin.wallet_symbol === 'ETH'){
      let token_contract_address = selectedCoin.token_contract_address
      if(selectedCoin.token_symbol === 'ETH'){
        token_contract_address = ''
      }
      console.log('onSend', selectedCoin, toAddress, btcValue, token_contract_address)
      let transaction = await MainStore.appState.appCoinsStore.ethProvider.send(toAddress, btcValue, token_contract_address)
      console.log('transaction', transaction)
      Alert.alert(
        'Success',
        'Sent.',
        [
            {text: 'OK', onPress: () => { } },
        ],
        { cancelable: true }
    );
    } else {

    }
  }
  onValueChange(coin){
    this.setState({
      selectedCoin: coin
    });
  }

  renderPickerItems(){
    const pickerItems = []
    let coins = this.props.appCoinsStore.coins
    coins = coins.filter(c => c.isAdded === true)
    
    if(coins != null){
      coins.forEach(c => {
        const item = <Picker.Item key={c.token_symbol} label={c.token_symbol} value={c} />
        pickerItems.push(item)
      })
    }
    return pickerItems
  }

  onChangeAmountField(btcValue){
    const { selectedCoin } = this.state
    let gbpValue = selectedCoin.gbpPrice * btcValue
    gbpValue = gbpValue + ''
    this.setState({btcValue, gbpValue})
  }
  onChangeAmountGBPField(gbpValue){
    const { selectedCoin } = this.state
    let btcValue = gbpValue / selectedCoin.gbpPrice
    btcValue = btcValue + ''
    console.log(btcValue)
    this.setState({gbpValue, btcValue})
  }
  onUseAllFunds(){
    const { selectedCoin } = this.state
    let btcValue = selectedCoin.balance
    let gbpValue = selectedCoin.balance * selectedCoin.gbpPrice
    btcValue = btcValue + ''
    gbpValue = gbpValue + ''
    this.setState({gbpValue, btcValue})
  }

  render() {
    const {goBack} = this.props.navigation;
    const { selectedCoin, btcValue, gbpValue } = this.state
    const pickerItems = this.renderPickerItems()
    let cost = 0
    let balance = 0
    let symbol = ''
    if(selectedCoin != null){
      cost = selectedCoin.gbpPrice * selectedCoin.balance;
      balance = selectedCoin.balance
      symbol = selectedCoin.token_symbol
    }

    return (
      <Container>
        <ScrollView style={ styles.ScrollViewContainer}>
          <View style={ styles.container }>
            <ImageBackground source={require('../assets/images/inner-header-bg2.jpg')} style={styles.backgroundImage}>            
              <View style={styles.HeaderTop}>
                <TouchableOpacity onPress={() => goBack()}>
                  <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
                </TouchableOpacity>
                <View style={ styles.HeaderPicker}>
                  <Picker
                    mode="dropdown"
                    iosHeader="Select Coin"
                    iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                    style={ styles.PageTitle}
                    selectedValue={this.state.selectedCoin}
                    onValueChange={this.onValueChange.bind(this)}
                    textStyle={{ fontSize:18,color:"#fff" }}
                    >                
                    { pickerItems }
                  </Picker> 
                </View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                  <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
                </TouchableOpacity>
              </View>
              <View style={styles.HeaderBottom}>
                <Text style={styles.BalanceTitle}>{balance.toFixed(4)} {symbol}</Text>
                <View style={styles.BalanceValue}>
                  <Text style={styles.BalanceValueText}> £ {cost.toFixed(2)}</Text>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.BTCContent}>
              <Grid style={styles.BTCGrid}>
                <Row style={styles.BTCTextRow}>
                  <Col>
                    <Text style={styles.BTCPayText}>Pay to</Text>
                  </Col>
                  <Col>
                    {/* <TouchableOpacity style={styles.BTCTextRight}>
                      <Text style={styles.BTCLink}>Scan QR Code</Text>
                    </TouchableOpacity> */}
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input 
                      value = {this.state.toAddress}
                      onChangeText={(toAddress) => this.setState({toAddress})}
                      style={styles.BTCTextInput} placeholder="Address" 
                    />
                  </Col>          
                </Row>
              </Grid>
              <Grid style={styles.BTCGrid}>
                <Row style={styles.BTCTextRow}>
                  <Col><Text style={styles.BTCPayText}>Amount</Text></Col>
                  <Col>
                    <TouchableOpacity style={styles.BTCTextRight} onPress={() => this.onUseAllFunds()} >
                      <Text style={styles.BTCLink}>Use all funds</Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Input
                      value={btcValue}
                      onChangeText={(btcValue) => this.onChangeAmountField(btcValue)}
                      keyboardType={'numeric'}
                      style={styles.BTCTextInput} 
                      placeholder={symbol} />
                  </Col>          
                </Row>
                <Row>
                  <Col>
                    <Input
                      value={gbpValue}
                      onChangeText={(gbpValue) => this.onChangeAmountGBPField(gbpValue)}
                      keyboardType={'numeric'}
                      style={styles.BTCTextInput} 
                      placeholder="GBP" />
                  </Col>          
                </Row>
              </Grid>
              <Grid>
                <Col>
                  <Button style={styles.SendButton} onPress={()=>this.onSend()}>
                    <Text style={styles.SendButtonText}>Send</Text>
                  </Button>
                </Col>
              </Grid>
            </View>
          </View>
        </ScrollView>
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
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  backgroundImage: { width:"100%", height:200, resizeMode: 'cover',},
  HeaderTop:{ flexDirection: 'row', justifyContent:"space-between", },
  HeaderPicker:{ display:"flex",  borderColor:"#fff", borderWidth:1, borderRadius:3, paddingLeft:0, paddingRight:0, 
                  marginTop:40, marginBottom:30, height:35, width:100 }, 
  PageTitle:{ fontFamily:"LatoRegular", lineHeight:0, width:"100%", height:"100%",  margin: 0, alignItems:"center", 
              textAlign:"center", fontSize: 50, color:"#fff" },
  rightbutton:{ marginLeft:20, marginTop:40},
  leftbutton:{ marginRight:20, marginTop:40},
  HeaderBottom:{ textAlign:"center",},
  BalanceTitle:{ textAlign:"center", textTransform:"uppercase", color:"#fff", fontSize:30, },
  BalanceValue:{ textAlign:"center",  width:"100%",  flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', },
  BalanceValueText:{ color:"#fff", fontSize:14,},
  DownIcon:{ display:"flex", },
  BalanceValueImage:{ marginRight:5, marginTop:10},
  Tabbackground:{ display:"flex", flexDirection: 'row', width:"100%", resizeMode: 'cover', padding:0, },
  TabButton:{ width:"25%", height:"100%", padding:0, borderRadius:0, backgroundColor:"transparent"  },
  tabBarActiveTextColor:{ backgroundColor:"#fff"},
  TabButtonText:{ color:"#fff", fontSize:10, fontWeight:"500",    },
  Footer:{ height:75, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1,  elevation: 10,},
  TabButtonImage:{ marginBottom:5,},
  DownArrow:{ color:"#fff", fontSize:18, marginLeft:-8, marginTop:-2},
  BTCContent:{ paddingTop:40, paddingRight:20, paddingLeft:20, },
  BTCTextRow:{ flexDirection: 'row', justifyContent:"space-between", marginBottom:15,  },
  BTCPayText:{ color:"#333333", fontSize:16, },
  BTCLink:{ textAlign:"right", color:"#2c32b2", fontSize:16,  },
  BTCTextInput:{ backgroundColor:"#fff",  borderRadius:8, elevation: 5, height:50, color:"#757575", fontSize:16, marginBottom:20, paddingTop:5, paddingLeft:20, paddingRight:20,  shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, },
  BTCGrid:{ marginBottom:15,},
  SendButton:{ width:170, height:60, marginLeft:"auto", marginRight:"auto", marginBottom:50, borderRadius:30, backgroundColor:"#5536aa", borderColor:"#fff", borderWidth:1,   shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.50, },
  SendButtonText:{ textAlign:"center", color:"#fff", fontSize:16, letterSpacing:0.25, width:"100%", },
});