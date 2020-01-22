import React, { Component } from 'react';
import { Platform, StyleSheet, Image, View, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col, Input, CheckBox  } from 'native-base';


export default class AddCoinTokenComponent extends Component {

  static navigationOptions = {
    header: null,
  };

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
            
            <Text style={ styles.PageTitle}>Add Coin | Token</Text>  

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
            </TouchableOpacity>      
        </ImageBackground>
        <ScrollView style={ styles.ScrollViewContainer}> 
        {/* Header End */}   
        
        
        {/* Search start */}
        <Grid style={ styles.Searchbox}>
          <Col style={ styles.SearchInnerbox}>
            <Input style={ styles.SearchInput} placeholder="Search Dapp" />  
            <Image style={styles.SearchIcon} source={require('../assets/images/search-icon.png')} />     
          </Col>
        </Grid>
        {/* Search start */}

        {/* Content start */}
        <Grid style={styles.CryptoListBox}>

            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon1.png')} />
              <CheckBox checked={true}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Bitcoin</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 4734.27</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon2.png')} />
              <CheckBox checked={false}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>CoinMarket</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 328.41</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon3.png')} />
              <CheckBox checked={false}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Dogecoin</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 01.27</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}


            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon4.png')} />
              <CheckBox checked={false}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>NEO</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 4.27</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}

            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon5.png')} />
              <CheckBox checked={false}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Dashcoin</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 18004</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}

            {/* Crypto List */}
            <Row style={styles.CryptoListRow}>
            <Col style={styles.CryptoList}>
           
              <Image style={styles.CryptoListImage} source={require('../assets/images/crypto-icon7.png')} />
              <CheckBox checked={false}  style={styles.CryptoListCheckbox} color="#2fc800" />
              <Grid style={styles.ListContentBox}>
                  <Col style={styles.ListContentLeft}>
                    <Text style={styles.ListContentTop}>Litecoin</Text>
                  </Col>
                  <Col style={styles.ListContentRight}>
                    <Text style={styles.ListRightTop}>£ 14.27</Text> 
                    
                  </Col>
              </Grid>
              

            </Col>
            </Row>
            {/* Crypto List */}

           

          </Grid>
          {/* Content end */}
           
        

        
        </ScrollView>

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
   
);}
}

const styles = StyleSheet.create({

container:{ flex: 1, backgroundColor:"#fff"},
backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
PageTitleBox:{ paddingTop:30,},
PageTitle:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 90 : 120, color:"#fff", fontSize:20, fontWeight:"600", },
rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
ScrollViewContainer:{ paddingTop:20,  paddingLeft:15, paddingRight:15,},

Searchbox:{ marginBottom:20, },
SearchInnerbox:{ borderColor:"#6137a7", borderWidth:1, height:60, width:"100%", borderRadius:30, paddingLeft:10, paddingRight:40, position:"relative",  },
SearchInput:{ color:"#333333", fontSize:16,  },
SearchIcon:{ position:"absolute", right:5, top:4, },

Tabbackground:{ display:"flex", flexDirection: 'row', width:"100%", resizeMode: 'cover', padding:0, },
TabButton:{ width:"25%", height:"100%", padding:0, borderRadius:0, backgroundColor:"transparent"  },
tabBarActiveTextColor:{ backgroundColor:"#fff"},
TabButtonText:{ color:"#fff", fontSize:10, fontWeight:"500",    },
Footer:{ height:75, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1, },
TabButtonImage:{ marginBottom:5,},
CryptoListBox:{paddingBottom:30, },
CryptoListRow:{ marginBottom:20,},
CryptoList:{ height:80,elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.20, borderRadius:8, backgroundColor:"#fff", paddingLeft:80, paddingBottom:20, paddingTop:23, paddingRight:50, position:"relative",  },
CryptoListImage:{ position:"absolute", left:10, top:15,},
ListContentBox:{  justifyContent:"space-between", alignItems:"center", },
ListContentRight:{ textAlign:"right", },
ListRightTop:{ textAlign:"right", color:"#000000", fontSize:18, marginBottom:3,},
ListContentTop:{  color:"#000000", fontSize:18, marginBottom:3,},
CryptoListCheckbox:{ position:"absolute", right:15, top:29, left:"auto", borderRadius:0, borderColor:"#2fc800", borderWidth:2, color:"#2fc800" },


});