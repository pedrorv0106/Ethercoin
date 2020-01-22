import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col  } from 'native-base';

export default class LandingComponent extends Component {
  static navigationOptions = {
    header: null,
  };
  render() {

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
                <Text style={styles.BalanceValueImage}><Image style={styles.DownIcon} source={require('../assets/images/down.png')} /></Text>
                <Text style={styles.BalanceValueText}> £ 1428.00</Text>
              </View>
          </View>

        </ImageBackground>
        {/* Header End */}
       
          {/* button */}
          <View style={styles.HomeButtonBox}>
          <Button style={styles.HomeButton} onPress={() => this.props.navigation.navigate('BuyCrypto')}>
            <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.HomeButtonBackground}>
              <Text style={styles.HomeButtonText}>BUY CRYPTO</Text>
            </ImageBackground>
          </Button>

          <Button style={styles.HomeButton} onPress={() => this.props.navigation.navigate('AddCoinToken')}>
            <ImageBackground source={require('../assets/images/button-bg.png')} style={styles.HomeButtonBackground}>
              <Text style={styles.HomeButtonText}>ADD COIN</Text>
            </ImageBackground>
          </Button>
          </View>
          {/* button */}

          
         

       
{/* Grid start */}
          <Grid style={styles.CryptoListBox}>

            {/* Crypto List */}
            <Row style={styles.CryptoListRow} onPress={() => this.props.navigation.navigate('CoinDetail')}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon1.png')} />
              <Grid style={styles.ListContentBox}>

                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Bitcoin</Text>
                    <Text style={styles.ListContentBottom}>= £ 4734.27</Text>
                  </Col>

                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>108.06 GBP</Text>
                    <Text style={styles.ListRightBottom}>0.0074 BTC</Text>
                  </Col>

              </Grid>
            </Col>
            </Row>
            {/* Crypto List */}

            {/* Crypto List */}
            <Row style={styles.CryptoListRow} onPress={() => this.props.navigation.navigate('CoinDetail')}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon2.png')} />
              <Grid style={styles.ListContentBox}>

                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Ethereum</Text>
                    <Text style={styles.ListContentBottom}>= £ 328.41</Text>
                  </Col>

                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>44.59 GBP</Text>
                    <Text style={styles.ListRightBottom}>0.2470 ETH</Text>
                  </Col>

              </Grid>

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow} onPress={() => this.props.navigation.navigate('CoinDetail')}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon3.png')} />
              <Grid style={styles.ListContentBox}>

                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Dogecoin</Text>
                    <Text style={styles.ListContentBottom}>= £ 4734.27</Text>
                  </Col>

                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>108.06 GBP</Text>
                    <Text style={styles.ListRightBottom}>0.0074 DOGE</Text>
                  </Col>

              </Grid>

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow} onPress={() => this.props.navigation.navigate('CoinDetail')}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon4.png')} />
              <Grid style={styles.ListContentBox}>

                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>NEO</Text>
                    <Text style={styles.ListContentBottom}>= £ 4734.27</Text>
                  </Col>

                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>42.06 GBP</Text>
                    <Text style={styles.ListRightBottom}>0.1254 NEO</Text>
                  </Col>

              </Grid>

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow} onPress={() => this.props.navigation.navigate('CoinDetail')}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon5.png')} />
              <Grid style={styles.ListContentBox}>

                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Dashcoin</Text>
                    <Text style={styles.ListContentBottom}>= £ 4734.27</Text>
                  </Col>

                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>108.06 GBP</Text>
                    <Text style={styles.ListRightBottom}>2.0074 DASH</Text>
                  </Col>

              </Grid>

            </Col>
            </Row>
            {/* Crypto List */}

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
  PageTitle:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 90 : 120, color:"#fff", fontSize:20, fontWeight:"700", fontFamily:"LatoRegular", },
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
  HomeButtonText:{ textAlign:"center", width:"100%", height:Platform.OS === 'ios' ? 60 : 40, lineHeight: Platform.OS === 'ios' ? 50 : 60, color:"#fff", fontSize:18, },
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