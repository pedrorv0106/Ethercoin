import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button,  Icon, Grid, Col, Text, Row, Textarea, Picker  } from 'native-base';



export default class CoinDetailSendComponent extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
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
                iosHeader="Select your SIM"
                iosIcon={<Icon name="caret-down" type="FontAwesome" style={styles.DownArrow} />}
                style={ styles.PageTitle}
                selectedValue={this.state.selected}
                onValueChange={this.onValueChange.bind(this)}
                textStyle={{ fontSize:18,color:"#fff" }}
                >                
                <Picker.Item label="GBP" value="key0" />
                <Picker.Item label="BTC" value="key1" />
                
            </Picker> 
            </View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.HeaderBottom}>
              <Text style={styles.BalanceTitle}>0.0074 BTC</Text>
              <View style={styles.BalanceValue}>
                <Text style={styles.BalanceValueImage}><Image style={styles.DownIcon} source={require('../assets/images/down2.png')} /></Text>
                <Text style={styles.BalanceValueText}> £ 4749.80</Text>
              </View>
          </View>

        </ImageBackground>

        <View style={styles.BTCContent}>
        <Grid style={styles.BTCGrid}>
          <Row style={styles.BTCTextRow}>
          <Col><Text style={styles.BTCPayText}>Pay to</Text></Col>
          <Col><TouchableOpacity style={styles.BTCTextRight}><Text style={styles.BTCLink}>Scan QR Code</Text></TouchableOpacity></Col>
          </Row>
          <Row>
            <Col><Textarea style={styles.BTCTextarea} placeholder="Address" /></Col>          
          </Row>
        </Grid>

        <Grid style={styles.BTCGrid}>
          <Row style={styles.BTCTextRow}>
          <Col><Text style={styles.BTCPayText}>Amount</Text></Col>
          <Col><TouchableOpacity style={styles.BTCTextRight}><Text style={styles.BTCLink}>Use all funds</Text></TouchableOpacity></Col>
          </Row>
          <Row>
            <Col><Textarea style={styles.BTCTextarea} placeholder="BTC" /></Col>          
          </Row>

          <Row>
            <Col><Textarea style={styles.BTCTextarea} placeholder="GBP" /></Col>          
          </Row>
        </Grid>


        <Grid>
          <Col>
          <Button style={styles.SendButton}>
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
  HeaderPicker:{ display:"flex",  borderColor:"#fff", borderWidth:1, borderRadius:3, paddingLeft:0, paddingRight:0, marginTop:40, marginBottom:30, height:35, width:100,   }, 
  PageTitle:{  fontFamily:"LatoRegular", lineHeight:0, width:"100%", height:"100%",  margin:Platform.OS === 'ios' ? 0 : 0, alignItems:"center", textAlign:"center", fontSize:Platform.OS === 'ios' ? 20 : 50, color:"#fff", padding:0, fontWeight:"700", },
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
  BTCTextarea:{ backgroundColor:"#fff",  borderRadius:8, elevation: 10, height:60, color:"#757575", fontSize:16, marginBottom:20, paddingTop:15, paddingLeft:20, paddingRight:20,  shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.35, },
  BTCGrid:{ marginBottom:15,},
  SendButton:{ width:170, height:60, marginLeft:"auto", marginRight:"auto", marginBottom:50, borderRadius:30, backgroundColor:"#5536aa", borderColor:"#fff", borderWidth:1,   shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.50, },
  SendButtonText:{ textAlign:"center", color:"#fff", fontSize:16, letterSpacing:0.25, width:"100%", },


  });