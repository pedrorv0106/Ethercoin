import React, {Component} from 'react';
import { Platform, StyleSheet, View, ImageBackground,  TouchableOpacity, Image } from 'react-native';
import { Text,Input, Grid, Col, Row, Button  } from 'native-base';


export default class PinComponent extends Component{

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
            <Text style={ styles.PageTitle}>Create a PIN</Text> 
            <TouchableOpacity>
            </TouchableOpacity>             
        </ImageBackground>
        
        <Grid style={ styles.checkboxcontainer}>
            <Col style={ styles.PasswordInputCol}><Input secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} /></Col>
            <Col style={ styles.PasswordInputCol}><Input secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} /></Col>
            <Col style={ styles.PasswordInputCol}><Input secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} /></Col>
            <Col style={ styles.PasswordInputCol}><Input secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} /></Col>
        </Grid>


        <View style={ styles.KeybordMainBox}>

            <Grid style={ styles.KeybordInnerBox}>
                <Row>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>1</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>2</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>3</Text></Button></Col>
                </Row>

                <Row>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>4</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>5</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>6</Text></Button></Col>
                </Row>

                <Row>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>7</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>8</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>9</Text></Button></Col>
                </Row>

                <Row>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}></Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Text style={ styles.KeybordColText}>0</Text></Button></Col>
                    <Col style={ styles.KeybordCol}><Button style={ styles.KeybordButton}><Image style={styles.Backbutton} source={require('../assets/images/backicon.png')} /></Button></Col>
                </Row>
                    

            </Grid>

        </View>
    

        
    </View>
   
);}
}



const styles = StyleSheet.create({

container:{ flex: 1, backgroundColor:"#fff"},
backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
PageTitle:{ textAlign:"center", lineHeight:Platform.OS === 'ios' ? 90 : 120, color:"#fff", fontSize:20, fontWeight:"600", },
rightbutton:{ marginLeft:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
leftbutton:{ marginRight:20, marginTop:Platform.OS === 'ios' ? 40 : 45},
checkboxcontainer:{ paddingTop:50, paddingLeft:10, paddingRight:10, flexDirection: 'row', justifyContent:"center", },
PasswordInputCol:{ width:40, height:40, marginLeft:15, marginRight:15, },
PasswordInput:{  color:'#000', borderRadius:20, borderWidth: 2, borderColor:"#343434", margin:0 , fontSize:0, width:"100%", height:"100%", textAlign:"center", fontSize:26, },
KeybordMainBox:{ padding:20, position:"absolute", left:0, bottom:0, width:"100%", },
KeybordInnerBox:{ borderRadius:8, borderWidth:1, borderColor:"#cacaca", padding:20,},
KeybordCol:{ textAlign:"center", },
KeybordButton:{ width:"100%", height:"100%", backgroundColor:"transparent", textAlign:"center",  height:80,  justifyContent:"center", },
KeybordColText:{ color:"#333333", fontFamily:"LatoRegular", fontSize:30, lineHeight:70, height:80, textAlign:"center",  },
Backbutton:{ width:49, height:30, marginLeft:"auto", marginRight:"auto", marginTop:10,  }

});