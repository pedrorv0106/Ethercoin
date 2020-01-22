import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button,  Icon, Grid, Col, Text, Row, Tabs, Tab,  TabHeading, Picker  } from 'native-base';

import Tab1 from './tabOne';
import Tab2 from './tabTwo';
import Tab3 from './tabthree';

export default class CoinDetailReceiveComponent extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value){
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
            <TouchableOpacity  onPress={() => goBack()}>
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
            <TouchableOpacity onPress={this._onPressButton}>
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
            <Col><Text style={styles.BTCPayText}>My Address</Text></Col>
          </Row>
          <Row>
            <Col><Text style={styles.AddText}>bclq  0d59  5vlp  5pql  pc3e9  ax1f     whiq   41d7   rh2n   kyfi</Text></Col>          
          </Row>
        </Grid>

        <Grid>
          <Row>
            <Col>
                <Tabs style={styles.BTCTab} tabBarUnderlineStyle={{ backgroundColor:Platform.OS === 'ios' ? "#4a35ac" : "#9b3c9c", }}>
                  <Tab style={styles.BTCTabCol} heading={ <TabHeading><Text style={styles.BTCTabColText}>Default</Text></TabHeading>}><Tab1 /></Tab>
                  <Tab style={styles.BTCTabCol} heading={ <TabHeading><Text style={styles.BTCTabColText}>Compatibility</Text></TabHeading>}><Tab2 /></Tab>
                  <Tab style={styles.BTCTabCol} heading={ <TabHeading><Text style={styles.BTCTabColText}>Legacy</Text></TabHeading>}><Tab3 /></Tab>
                </Tabs>
             </Col>
            </Row>
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

  container:{ flex: 1, backgroundColor:"#fff"},
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
  Footer:{ height:75, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1, elevation: 10, },
  TabButtonImage:{ marginBottom:5,},
  DownArrow:{ color:"#fff", fontSize:18, marginLeft:-8, marginTop:-2},
  BTCContent:{ paddingTop:40, paddingRight:20, paddingLeft:20, },
  BTCTextRow:{ flexDirection: 'row', justifyContent:"space-between", marginBottom:5,  },
  BTCPayText:{ color:"#333333", fontSize:16, },
  AddText:{ color:"#000000", fontSize:16, lineHeight:24, },
  BTCGrid:{ marginBottom: 20,},
  BTCTab:{ borderColor:"#4a35ac", borderWidth:1, borderRadius:4, overflow:"hidden", marginBottom:50,  },
  BTCTabCol:{ borderRightColor:"#4a35ac", borderRightWidth:1, position:"relative", zIndex:99, backgroundColor:"#fff",  },
  BTCTabColText:{ color:Platform.OS === 'ios' ? "#4a35ac" : "#fff", fontSize:Platform.OS === 'ios' ? 14 : 15, fontWeight:"300",},

  });