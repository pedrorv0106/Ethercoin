import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView,  } from 'react-native';
import { Container, Grid, Input, Col, Row, Footer, FooterTab, Button } from 'native-base';


export default class DAppsComponent extends Component {

  
  static navigationOptions = {
      header: null,
  };

  render() {

    const {goBack} = this.props.navigation;

  return (
    <Container> 
      <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
            <TouchableOpacity onPress={() => goBack()}>
              <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
            </TouchableOpacity>
            <Text style={ styles.PageTitle}>Dapp Store</Text>      
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
            <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
            </TouchableOpacity>      
        </ImageBackground>

       <ScrollView style={ styles.ScrollViewContainer}>
    <View style={ styles.container }>

        
       

        <Grid style={ styles.Searchbox}>
          <Col style={ styles.SearchInnerbox}>
            <Input style={ styles.SearchInput} placeholder="Search Dapp" />  
            <Image style={styles.SearchIcon} source={require('../assets/images/search-icon.png')} />     
          </Col>
        </Grid>

        <Grid style={ styles.CatBox}>
        <Row style={ styles.CatBoxRow}>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image1.jpg')} />
            <Text style={styles.CatBoxText}>
            Nutshell Small Busine. 
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image2.jpg')} />
            <Text style={styles.CatBoxText}>
            Flint - Accept Cards Invoic.
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image3.jpg')} />
            <Text style={styles.CatBoxText}>
            Shopify POS Point of Sale
            </Text>
            </Col>
            </Row>

            <Row style={ styles.CatBoxRow}>
            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image4.jpg')} />
            <Text style={styles.CatBoxText}>
            Nutshell Small Busine. 
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image5.jpg')} />
            <Text style={styles.CatBoxText}>
            Flint - Accept Cards Invoic.
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image6.jpg')} />
            <Text style={styles.CatBoxText}>
            Shopify POS Point of Sale
            </Text>
            </Col>
            </Row> 


            <Row style={ styles.CatBoxRow}>
            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image7.jpg')} />
            <Text style={styles.CatBoxText}>
            Nutshell Small Busine. 
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image8.jpg')} />
            <Text style={styles.CatBoxText}>
            Flint - Accept Cards Invoic.
            </Text>
            </Col>

            <Col style={ styles.CatCol}>
            <Image style={styles.CatBoxImage} source={require('../assets/images/cat-image9.jpg')} />
            <Text style={styles.CatBoxText}>
            Shopify POS Point of Sale
            </Text>
            </Col>
            </Row>
            
          
        
        </Grid>
          

        

        
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
);}
}

const styles = StyleSheet.create({


backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
PageTitle:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 90 : 120, color:"#fff", fontSize:20, fontWeight:"600", },
rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
ScrollViewContainer:{ paddingTop:30, paddingLeft:20, paddingRight:20, },
Searchbox:{ marginBottom:20, },
SearchInnerbox:{ borderColor:"#6137a7", borderWidth:1, height:60, width:"100%", borderRadius:30, paddingLeft:10, paddingRight:40, position:"relative",  },
SearchInput:{ color:"#333333", fontSize:16,  },
SearchIcon:{ position:"absolute", right:5, top:4, },
CatBox:{ marginBottom:40,},
CatBoxRow:{ marginLeft:-7, marginRight:-7, },
CatCol:{ paddingLeft:7, paddingRight:7, width:"33.333%", marginBottom:20,  shadowColor: '#000', shadowOffset: { width: 0, height:1 },shadowOpacity: 0.30,  },
CatBoxImage:{ borderRadius:10, borderWidth:2, borderColor:"#fff", maxWidth:"100%", height:110, },
CatBoxText:{ textAlign:"center", color:"#000000", fontSize:14, marginTop:10, },
Tabbackground:{ display:"flex", flexDirection: 'row', width:"100%", resizeMode: 'cover', padding:0, },
TabButton:{ width:"25%", height:"100%", padding:0, borderRadius:0, backgroundColor:"transparent"  },
tabBarActiveTextColor:{ backgroundColor:"#fff"},
TabButtonText:{ color:"#fff", fontSize:10, fontWeight:"700",  fontWeight:"700",  fontFamily:"LatoRegular",  },
Footer:{ height:75, shadowColor: '#fff', shadowOffset: { width: 0, height: -20 }, shadowOpacity:1, },
TabButtonImage:{ marginBottom:5,},


});