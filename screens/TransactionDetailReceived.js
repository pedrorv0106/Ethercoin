import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';

export default class TransactionDetailReceivedComponent extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      transaction: props.navigation.state.params.transactionItem,
      selectedCoin: props.navigation.state.params.selectedCoin
    };
  }
  openURL(){
    const {transaction} = this.state
    Linking.openURL(transaction.url) 
  }
  render() {
    const {goBack} = this.props.navigation;
    const {transaction, selectedCoin} = this.state
    const cost = selectedCoin.gbpPrice * transaction.amount

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
            <Text style={ styles.TarmsText}>Date {"\n"} {transaction.date}</Text>
            <Text style={ styles.TarmsText}>Status {"\n"} {transaction.confirmations} confirmations</Text>
            <Text style={ styles.TarmsText}><Text style={ styles.TarmsTextLink}>Received From</Text> {"\n"} {transaction.amount} {selectedCoin.token_symbol} {cost.toFixed(2)} £ {transaction.from}</Text>
            <Text style={ styles.TarmsText}>Transction id {transaction.hash}</Text>
          </View>
          <View style={ styles.Buttoncontainer }>
            <TouchableOpacity style={ styles.TarmsButton} onPress={()=> this.openURL()}>
              <Text style={ styles.TarmsButtonText}>View on Blockchain Explorer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container:{ flex: 1, backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
  PageTitleBox:{ paddingTop:36,},
  PageTitle:{ textAlign:"center", color:"#fff", fontSize:20, fontWeight:"600", },
  SubPageTitle:{ textAlign:"center", color:"#fff", fontSize:14 },
  rightbutton:{ marginLeft:20, marginTop:45},
  leftbutton:{ marginRight:20, marginTop:45},
  TarmsContainer:{ paddingTop:40,  paddingLeft:30, paddingRight:30, backgroundColor:"#fff", textAlign:"center" },
  TarmsText:{ color:"#333333", fontSize:18, lineHeight:26, textAlign:"left", marginBottom:30},
  TarmsTextLink:{color:"#2c32b2", fontSize:18, lineHeight:26, textAlign:"left",},
  Buttoncontainer:{ paddingLeft:40, paddingRight:40, paddingBottom:50, textAlign:"center",  },
  TarmsButton:{ paddingLeft:10, paddingRight:10,  height:50, borderRadius:5, elevation: 10, backgroundColor:"#dbdbdb", shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.35,},
  TarmsButtonText:{ textAlign:"center", lineHeight:46, color:"#2c32b2", fontSize:20},
});