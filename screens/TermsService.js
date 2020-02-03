import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Button } from 'react-native';


export default class TermsServiceComponent extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const {goBack} = this.props.navigation;
   
    return (
      <View style={ styles.container }>
        <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
           <Text style={ styles.PageTitle}>Terms of Service</Text>            
        </ImageBackground>
        <ScrollView style={ styles.ScrollViewContainer}>    
        <View style={ styles.TarmsContainer}>
            <Text style={ styles.TarmsText}>There is considerable exposure to risk in any crypto-currency exchange transaction. Any transaction involving currencies involves risks including, but not limited to, the potential for changing economic conditions that may 
substantially affect the price or liquidity of a currency. Investments in crypto-currency exchange speculation may also be susceptible to sharp rises and falls as the relevant market values fluctuate. It is for this reason that when speculating in such markets it is advisable to use only risk capital.</Text>
            <Text style={ styles.TarmsText}>3. Electric Trading Risks</Text>
            <Text style={ styles.TarmsText}>Before you engage in transactions using an electronic system, you should carefully review</Text>
        </View>
        <View style={ styles.Buttoncontainer }>
          <TouchableOpacity style={ styles.TarmsButton} onPress={() => goBack()}>
            <Text style={ styles.TarmsButtonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ styles.TarmsButton} onPress={() => this.props.navigation.navigate('RecoveryStepOne')}>
            <Text style={ styles.TarmsButtonText}>Accept</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:100, resizeMode: 'cover',},
  PageTitle:{ textAlign:"center", lineHeight:120, color:"#fff", fontSize:20, fontWeight:"600", },
  TarmsContainer:{ paddingTop:40,  paddingLeft:30, paddingRight:30, backgroundColor:"#fff", textAlign:"center" },
  TarmsText:{ color:"#333333", fontSize:18, lineHeight:26, textAlign:"center", marginBottom:30},
  Buttoncontainer:{ paddingLeft:40, paddingRight:40, paddingBottom:50, flexDirection: 'row', justifyContent:"space-between" },
  TarmsButton:{ width:120, height:50, borderRadius:5, backgroundColor:"#dbdbdb", elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35,},
  TarmsButtonText:{ textAlign:"center", lineHeight:50, color:"#2c32b2", fontSize:20},
});