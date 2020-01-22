import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Button, Image } from 'react-native';


export default class ChangellyTCComponent extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    
    const {goBack} = this.props.navigation;

  return (
    
    <View style={ styles.container }>

        <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
            <TouchableOpacity onPress={() => goBack()}>
              <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
            </TouchableOpacity>
            
            <View style={ styles.PageTitleBox}>
              <Text style={ styles.PageTitle}>Changelly</Text>
              <Text style={ styles.SubPageTitle}>Terms of Service</Text>
            </View>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
            </TouchableOpacity>      
        </ImageBackground>
        <ScrollView style={ styles.ScrollViewContainer}>    
        <View style={ styles.TarmsContainer}>
        
            <Text style={ styles.TarmsText}>If you continue, you agree to proceed to Changelly.io, a third party service. All your 
interactions with Changelly.io are outside of Demo wallet’s control and are subject to Changelly’s Terms of Service. Ether Coin’s will not provide any personal information of 
Changelly.io. All information that you may provide to Changelly.io will be subject to Changelly.io’s Privacy Policy and will not collected, stored, or used by Ether Coin.</Text>
            <Text style={ styles.TarmsTextBold}>Ether Coin accepts no responsibility and will not be liable for any loss or damage 
whatsoever suffered as a result of 
accessing, use of, or reliance upon 
Changelly.io’s information and services.</Text>
           
        </View>

        <View style={ styles.Buttoncontainer }>
          <TouchableOpacity style={ styles.TarmsButton}>
            <Text style={ styles.TarmsButtonText}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity style={ styles.TarmsButton}>
            <Text style={ styles.TarmsButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>

    </View>
   
);}
}

const styles = StyleSheet.create({

container:{ flex: 1, backgroundColor:"#fff"},
backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
PageTitleBox:{ paddingTop:Platform.OS === 'ios' ? 30 : 36,},
PageTitle:{ textAlign:"center", color:"#fff", fontSize:20, fontWeight:"600", },
SubPageTitle:{ textAlign:"center", color:"#fff", fontSize:14 },
rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
TarmsContainer:{ paddingTop:40,  paddingLeft:30, paddingRight:30, backgroundColor:"#fff", textAlign:"center" },
TarmsText:{ color:"#333333", fontSize:18, lineHeight:26, textAlign:"center", marginBottom:30},
TarmsTextBold:{ color:"#333333", fontSize:18, lineHeight:26, textAlign:"center", marginBottom:30, fontWeight:"600",  },
Buttoncontainer:{ paddingLeft:40, paddingRight:40, paddingBottom:50, flexDirection: 'row', justifyContent:"space-between" },
TarmsButton:{ width:120, height:50, borderRadius:5, elevation: 10, backgroundColor:"#dbdbdb", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35,},
TarmsButtonText:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 40 : 46, color:"#2c32b2", fontSize:20},

});