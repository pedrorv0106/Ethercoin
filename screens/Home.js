import React, { Component } from 'react';
import { StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col  } from 'native-base';
import MainStore from '../appstores/MainStore';

export default class LandingComponent extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    coins: null,
    balance: 0
  }

  async componentWillMount() {
    this.loadCoinData()
  }
  async loadCoinData(){
    let coins = await MainStore.appState.appCoinsStore.getCoinFromDS()
    coins = coins.filter(c => c.isAdded === true)
    let balance = 0
    coins.forEach(c => {
      balance = balance + c.gbpPrice * c.balance
    })
    this.setState({ coins, balance })
    try {
      const response = await fetch('https://api.coinmarketcap.com/v2/ticker/?limit=100&convert=GBP')
      const posts = await response.json()
      for(var k in posts.data) {
        let index = this.getIndexCoin(posts.data[k].symbol)
        if(index >= 0){
          coins[index].gbpPrice = posts.data[k].quotes.GBP.price
          this.setState({ coins })
        }
      }
    } catch (e) { }
  }
  
  getIndexCoin(symbol){
    const { coins } = this.state
    let ret = -1
    coins.forEach((c, index) =>{
      if(c.token_symbol === symbol){
        ret = index
      }
    })
    return ret;
  }

  renderList(){
    let { coins } = this.state

    let contents = []
    if(coins !== null ) {
      coins.forEach((c, index) =>{
        let cost = c.gbpPrice * c.balance;
        
        item = <Row key={c.token_name} style={styles.CryptoListRow} 
                onPress={() => this.props.navigation.navigate('CoinDetail', {coins, selectedCoin: c})}>
          <Col style={styles.CryptoList}>
            <Image style={styles.CryptoListImage} source={c.icon_path} />
            <Grid style={styles.ListContentBox}>
              <Col style={styles.ListContentLeft}>
                <Text style={styles.ListContentTop}>{c.token_name}</Text>
                <Text style={styles.ListContentBottom}>= £ {cost.toFixed(2)}</Text>
              </Col>
              <Col style={styles.ListContentRight}>
                <Text style={styles.ListRightTop}>{c.gbpPrice.toFixed(4)} GBP</Text>
                <Text style={styles.ListRightBottom}>{c.balance} {c.token_symbol}</Text>
              </Col>
            </Grid>
          </Col>
        </Row>

        contents.push(item)
      })
    }
    return contents
  }

  render() {
    const listContents = this.renderList()
    const { balance, coins } = this.state
    return (
      <Container>
        <ScrollView style={ styles.ScrollViewContainer}>
          <View style={ styles.container }>
            {/* Header start */}
            <ImageBackground source={require('../assets/images/inner-header-bg2.jpg')} style={styles.backgroundImage}>            
              <View style={styles.HeaderTop}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('DApps')}>
                  <Image style={styles.rightbutton} source={require('../assets/images/icon1.png')} />
                </TouchableOpacity>
                <Text style={ styles.PageTitle}>Ether Coin</Text>      
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
                  <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
                </TouchableOpacity>
              </View>

              <View style={styles.HeaderBottom}>
                  <Text style={styles.BalanceTitle}>BALANCE</Text>
                  <View style={styles.BalanceValue}>
                    <Text style={styles.BalanceValueText}> £ {balance.toFixed(2)}</Text>
                  </View>
              </View>
            </ImageBackground>
            {/* Header End */}
          
            {/* button */}
            <View style={styles.HomeButtonBox}>
              <Button style={styles.HomeButton} onPress={() => this.props.navigation.navigate('BuyCrypto', {coins})}>
                <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.HomeButtonBackground}>
                  <Text style={styles.HomeButtonText}>BUY CRYPTO</Text>
                </ImageBackground>
              </Button>

              <Button style={styles.HomeButton} onPress={() => this.props.navigation.navigate('AddCoinToken', {
                onGoBack: () => this.loadCoinData(),
              })}>
                <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.HomeButtonBackground}>
                  <Text style={styles.HomeButtonText}>ADD COIN</Text>
                </ImageBackground>
              </Button>
            </View>
            {/* button */}
          
            {/* Grid start */}
            <Grid style={styles.CryptoListBox}>
              {/* Crypto List */}
              { listContents }
            </Grid>
            {/* Grid End */}
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
  container:{ flex: 1, backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:200, resizeMode: 'cover',},
  HeaderTop:{ flexDirection: 'row', justifyContent:"space-between", },
  PageTitle:{ textAlign:"center", lineHeight: 120, color:"#fff", fontSize:20, fontWeight:"700", fontFamily:"LatoRegular", },
  rightbutton:{ marginLeft:20, marginTop:40},
  leftbutton:{ marginRight:20, marginTop:40},
  HeaderBottom:{ textAlign:"center",},
  BalanceTitle:{ textAlign:"center", textTransform:"uppercase", color:"#fff", fontSize:18, fontFamily:"LatoRegular", },
  BalanceValue:{ textAlign:"center",  width:"100%",  flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', },
  BalanceValueText:{ color:"#fff", fontSize:34, fontWeight:"600",},
  DownIcon:{ display:"flex"},
  BalanceValueImage:{ marginRight:5, marginTop:10},
  Tabbackground:{ display:"flex", flexDirection: 'row', width:"100%", resizeMode: 'cover', padding:0, },
  TabButton:{ width:"25%", height:"100%", padding:0, borderRadius:0, backgroundColor:"transparent"  },
  tabBarActiveTextColor:{ backgroundColor:"#fff"},
  TabButtonText:{ color:"#fff", fontSize:10, fontWeight:"500",    },
  Footer:{ height:75, elevation: -10, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1, },
  TabButtonImage:{ marginBottom:5,},
  HomeButtonBox:{ flexDirection: 'row', justifyContent:"space-between", paddingLeft:20, paddingRight:20, paddingTop:20,},
  HomeButton:{ width:"48%", height:60, borderRadius:40, overflow:"hidden", textAlign:"center", padding:0, },
  HomeButtonText:{ textAlign:"center", width:"100%", height:40, lineHeight: 60, color:"#fff", fontSize:18, },
  HomeButtonBackground:{ width:"100%", height:60,  },
  CryptoListBox:{ paddingTop:20, paddingRight:20, paddingLeft:20, paddingBottom:10, },
  CryptoListRow:{ marginBottom:10,},
  CryptoList:{ height:80, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.20, borderRadius:8, backgroundColor:"#fff", paddingLeft:80, paddingEnd:20, paddingTop:0, paddingRight:20, position:"relative",  },
  CryptoListImage:{ position:"absolute", left:10, top:15,},
  ListContentBox:{  justifyContent:"space-between", alignItems:"center", },
  ListContentRight:{ textAlign:"right", },
  ListRightTop:{ textAlign:"right", color:"#000000", fontSize:18, marginBottom:3, fontFamily:"LatoRegular",},
  ListRightBottom:{ textAlign:"right", color:"#000000", fontSize:13, fontFamily:"LatoRegular", },
  ListContentTop:{  color:"#000000", fontSize:18, marginBottom:3, fontFamily:"LatoRegular",},
  ListContentBottom:{ color:"#000000", fontSize:13, fontFamily:"LatoRegular", },
});