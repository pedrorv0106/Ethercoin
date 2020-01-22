import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Button, Image } from 'react-native';


export default class TransactionDetailSentComponent extends Component {

  static navigationOptions = {
    //To hide the ActionBar/NavigationBar
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
              <Text style={ styles.PageTitle}>Transaction</Text>
              <Text style={ styles.SubPageTitle}>Details</Text>
            </View>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}>
              <Image style={styles.leftbutton} source={require('../assets/images/icon2.png')} />
            </TouchableOpacity>      
        </ImageBackground>
        <ScrollView style={ styles.ScrollViewContainer}>    
        <View style={ styles.TarmsContainer}>
        
            <Text style={ styles.TarmsText}>Date {"\n"} September 28, 2018, 19:43</Text>
            <Text style={ styles.TarmsText}>Status {"\n"} 41025 confirmations</Text>
            <Text style={ styles.TarmsText}><Text style={ styles.TarmsTextLink}>Sent to</Text> {"\n"} 0.170985152849162011 ETH 29.16 £ 0x320 7898 3864 E062 636B fBAB 453c 7c5B 709C 756c2</Text>
            <Text style={ styles.TarmsText}>Transction id e8841daaefaf504a952577bd8cf5bbf55 97d835265e3934148fe1d78e57c4e8a</Text>
           
        </View>

        <View style={ styles.Buttoncontainer }>
          <TouchableOpacity style={ styles.TarmsButton}>
            <Text style={ styles.TarmsButtonText}>View on Blockchain Explorer</Text>
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
TarmsText:{ color:"#333333", fontSize:18, lineHeight:26, textAlign:"left", marginBottom:30},
TarmsTextLink:{color:"#2c32b2", fontSize:18, lineHeight:26, textAlign:"left",},
Buttoncontainer:{ paddingLeft:40, paddingRight:40, paddingBottom:50, textAlign:"center",  },
TarmsButton:{ paddingLeft:10, paddingRight:10,  height:50, borderRadius:5, elevation: 10, backgroundColor:"#dbdbdb", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35,},
TarmsButtonText:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 40 : 46, color:"#2c32b2", fontSize:20},

});