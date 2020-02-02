import React, { Component } from 'react';
import { StyleSheet, Image, View, ImageBackground, TouchableOpacity } from 'react-native';
import { Container, Content, Text, Icon,  } from 'native-base';
import MainStore from '../appstores/MainStore';

export default class SettingComponent extends Component {
  static navigationOptions = {
    header: null,
  };  

  gotoRecoveryPhrase(){
    const pinCode = MainStore.appState.pinCode
    if(pinCode){
      this.props.navigation.navigate('ShowRecoveryPhraseStepOne')
    } else {
      this.props.navigation.navigate('ShowRecoveryPhraseStepTwo')
    }
  }
  render() {
    const {goBack} = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>            
            <TouchableOpacity onPress={() => goBack()}>
              <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
            </TouchableOpacity>
            <Text style={ styles.PageTitle}>Setting</Text>      
          <TouchableOpacity onPress={this._onPressButton}/>
        </ImageBackground>

        <Content>  
          <View style={styles.SettingList}>
            <TouchableOpacity style={styles.SettingListButton} onPress={() => this.gotoRecoveryPhrase()}>
              <Text style={styles.SettingListText}>Show Recovery Phrase</Text>
              <Icon name="angle-right" type="FontAwesome" style={styles.SettingListArrow}></Icon>
          </TouchableOpacity>
          </View>
          <View style={styles.SettingList}>
          <TouchableOpacity style={styles.SettingListButton} onPress={() => this.props.navigation.navigate('ChangePinOne')}>
              <Text style={styles.SettingListText}>Change PIN</Text>
              <Icon name="angle-right" type="FontAwesome" style={styles.SettingListArrow}></Icon>
          </TouchableOpacity>
          </View>     
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{ padding:0, margin:0,  backgroundColor:"#fff"},
  backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
  PageTitle:{ textAlign:"center", paddingRight:40, lineHeight:120, color:"#fff", fontSize:20, fontWeight:"600", },
  rightbutton:{ marginLeft:20, marginTop:45},
  leftbutton:{ marginRight:20, marginTop:45},
  ScrollViewContainer:{ paddingTop:30, paddingLeft:20, paddingRight:20,},
  SettingList:{ padding:0, margin:0,},
  SettingListItem:{ padding:0,},
  SettingListButton:{ marginTop:15, borderTopColor:"#d5d5d5", borderTopWidth:1, borderBottomColor:"#d5d5d5", borderBottomWidth:1, paddingLeft:15, paddingRight:50, position:"relative", },
  SettingListText:{ color:"#333333", fontSize:18, paddingTop:14, paddingBottom:16, },
  SettingListArrow:{ position:"absolute", right:20, top:10, color:"#666666", fontSize:36,}
  
  });