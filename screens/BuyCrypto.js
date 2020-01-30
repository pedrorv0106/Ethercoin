import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col, Input,  Icon, Picker  } from 'native-base';

export default class BuyCryptoComponent extends Component {
  static navigationOptions = {
      header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: "key0"
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  render() {
    const {goBack} = this.props.navigation;
    
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
                  <Image style={styles.WalletIcon} source={require('../assets/images/crypto-icon6.png')} />
                  <Text style={styles.WalletTitle}>My Wallet</Text>
                  <Text style={styles.WalletDetail}>...aX0jYnvFr5tEgG7kLqO</Text>
                  <Text style={styles.WalletAmount}>£ 1428.00</Text>
                    <TouchableOpacity style={styles.WalletButton} onPress={this._onPressButton}>
                      <Text style={styles.WalletButtonText}>CHANGE</Text>
                    </TouchableOpacity>
                </Col>
              </ImageBackground>
            </Grid>
            <Grid style={ styles.CryptoGrid}>
              <Col style={ styles.CryptoCol}>
                <Input placeholder="" value="0.00" style={ styles.CryptoInput} />
                <View style={ styles.CryptoSelect}>
                  <ImageBackground source={require('../assets/images/WalletBackground.png')} style={styles.SelectBackground}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                      style={ styles.colPicker}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                      textStyle={{ fontSize:18,color:"#fff",}}
                    >
                      <Picker.Item label="GBP" value="key0" />
                      <Picker.Item label="BTC" value="key1" />
                    </Picker> 
                  </ImageBackground>
                </View>
                
              </Col>
            </Grid>
            <Grid style={ styles.CryptoGrid}>
              <Col style={ styles.CryptoCol}>
                <Input placeholder="" value="0.00" style={ styles.CryptoInput} />
                <View style={ styles.CryptoSelect}>
                  <ImageBackground source={require('../assets/images/WalletBackground.png')} style={styles.SelectBackground}>
                    <Picker
                      mode="dropdown"
                      iosHeader="Select your SIM"
                      iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                      style={ styles.colPicker}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}
                      textStyle={{ fontSize:Platform.OS === 'ios' ? 18 : 30,color:"#fff",}}
                    >                
                      <Picker.Item label="GBP" value="key0" />
                      <Picker.Item label="BTC" value="key1" />
                    </Picker> 
                  </ImageBackground>
                </View>
              </Col>
            </Grid>

            <TouchableOpacity style={ styles.BackupButtonBox}>
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
});