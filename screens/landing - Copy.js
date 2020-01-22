import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, Image} from 'react-native';
import { Container, Footer, FooterTab, Button, Text, Row, Grid, Col  } from 'native-base';

export default class LandingComponent extends Component {
static navigationOptions = {
    header: null,
};
  render() {
  return (
    <View style={ styles.container }>
        <ImageBackground source={require('../assets/images/main-bg.jpg')} style={styles.backgroundImage}>
            
            <Image style={ styles.logo } source={require('../assets/images/logo.png')} />

            <View style={ styles.Buttoncontainer }>
            <Button style={styles.IntroButton} 
            onPress={() => this.props.navigation.navigate('TermsService')}
            >
            <ImageBackground source={require('../assets/images/CreateButton-bg.png')} style={styles.Buttonbackground}>
            <Text style={ styles.CreateButton}>Create a New Wallet</Text>
            </ImageBackground>
            </Button>

            <Button style={styles.IntroButton} onPress={() => this.props.navigation.navigate('RestoreWallet')}>
            <ImageBackground source={require('../assets/images/RestoreButton-bg.png')} style={styles.Buttonbackground}>
              <Text style={ styles.CreateButton}>Restore a Wallet</Text>
            </ImageBackground>
            </Button>
            </View>
            
        </ImageBackground>
    </View>
);}
}

const styles = StyleSheet.create({

    container:{ flex: 1, fontFamily:'OpenSans' },
    backgroundImage: { flex: 1, resizeMode: 'cover',},
    logo:{width: 180, height: 205, marginLeft:"auto", marginRight:"auto", marginTop:"30%"},
    Buttoncontainer:{ paddingLeft:30, paddingRight:30, textAlign:"center", marginTop:"30%"},
    CreateButton:{ width:"100%", textAlign:"center", flex:1, justifyContent:"center", alignItems:"center",  borderRadius:8, color:"#2f0078", fontSize:20, letterSpacing:0.25, fontFamily:'OpenSans',},
    Buttonbackground:{ width:"100%", paddingTop: Platform.OS === 'ios' ? 12 : 16, height:60,   borderRadius:8, },
    IntroButton:{ padding:0, marginBottom:40, backgroundColor:"transparent",  shadowColor: '#000', shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.40,elevation: 10, alignItems:"center", },

});