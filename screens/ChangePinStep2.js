import React, {Component} from 'react';
import { StyleSheet, View, ImageBackground,  TouchableOpacity, Image } from 'react-native';
import { Text,Input, Grid, Col, Row, Button  } from 'native-base';

export default class ChangePinTwoComponent extends Component{
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        this.state = {
            pinValue:''
        };
    }
    onPressNumericPad(value){
        let { pinValue } = this.state
        if(pinValue.length < 4){
            pinValue = pinValue + '' + value
        }
        this.setState({pinValue})

        if(pinValue.length == 4){
            this.nextScreen(pinValue)
        }
    }
    nextScreen(pinValue){
        this.props.navigation.goBack()
        this.props.navigation.navigate('ChangePinThree', {pinValue})
    }
    onPressBackSpace(){
        let { pinValue } = this.state
        if(pinValue.length > 0){
            pinValue = pinValue.substring(0, pinValue.length - 1)
        }
        this.setState({pinValue})
    }
    render() {
        const {goBack} = this.props.navigation;
        const {pinValue} = this.state
        let pin1 = ''
        let pin2 = ''
        let pin3 = ''
        let pin4 = ''
        if(pinValue.length > 0){
            pin1 = pinValue.substring(0, 1)
        }
        if(pinValue.length > 1){
            pin2 = pinValue.substring(1, 2)
        }
        if(pinValue.length > 2){
            pin3 = pinValue.substring(2, 3)
        }
        if(pinValue.length > 3){
            pin4 = pinValue.substring(3, 4)
        }

        return (
            <View style={ styles.container }>
                <ImageBackground source={require('../assets/images/inner-header-bg.jpg')} style={styles.backgroundImage}>      
                    <TouchableOpacity onPress={() => goBack()}>
                    <Image style={styles.rightbutton} source={require('../assets/images/backbutton.png')} />
                    </TouchableOpacity>      
                    <Text style={ styles.PageTitle}>Create New PIN</Text> 
                    <TouchableOpacity>
                    </TouchableOpacity>             
                </ImageBackground>
                <Grid style={ styles.checkboxcontainer}>
                    <Col style={ styles.PasswordInputCol}>
                        <Input value={pin1} secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} />
                        </Col>
                    <Col style={ styles.PasswordInputCol}>
                        <Input value={pin2} secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} />
                        </Col>
                    <Col style={ styles.PasswordInputCol}>
                        <Input value={pin3} secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} />
                        </Col>
                    <Col style={ styles.PasswordInputCol}>
                        <Input value={pin4} secureTextEntry={true} keyboardType={'numeric'} maxLength={1} style={ styles.PasswordInput} />
                        </Col>
                </Grid>
                <View style={ styles.KeybordMainBox}>
                    <Grid style={ styles.KeybordInnerBox}>
                        <Row>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(1)}>
                                    <Text style={ styles.KeybordColText}>1</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(2)}>
                                    <Text style={ styles.KeybordColText}>2</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(3)}>
                                    <Text style={ styles.KeybordColText}>3</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(4)}>
                                    <Text style={ styles.KeybordColText}>4</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(5)}>
                                    <Text style={ styles.KeybordColText}>5</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(6)}>
                                    <Text style={ styles.KeybordColText}>6</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(7)}>
                                    <Text style={ styles.KeybordColText}>7</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(8)}>
                                    <Text style={ styles.KeybordColText}>8</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(9)}>
                                    <Text style={ styles.KeybordColText}>9</Text>
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton}>
                                    <Text style={ styles.KeybordColText}></Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressNumericPad(0)}>
                                    <Text style={ styles.KeybordColText}>0</Text>
                                </Button>
                            </Col>
                            <Col style={ styles.KeybordCol}>
                                <Button style={ styles.KeybordButton} onPress={()=>this.onPressBackSpace()}>
                                    <Image style={styles.Backbutton} source={require('../assets/images/backicon.png')} />
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container:{ flex: 1, backgroundColor:"#fff"},
    backgroundImage: { width:"100%", height:100, resizeMode: 'cover', flexDirection: 'row', justifyContent:"space-between"},
    PageTitle:{ paddingRight:40, textAlign:"center", lineHeight:120, color:"#fff", fontSize:20, fontWeight:"600", },
    rightbutton:{ marginLeft:20, marginTop:45},
    leftbutton:{ marginRight:20, marginTop:45},
    checkboxcontainer:{ paddingTop:80, paddingLeft:10, paddingRight:10, flexDirection: 'row', justifyContent:"center", },
    PasswordInputCol:{ width:40, height:40, marginLeft:15, marginRight:15, },
    PasswordInput:{  color:'#000', borderRadius:20, borderWidth: 2, borderColor:"#343434", margin:0 , fontSize:0, width:"100%", height:"100%", textAlign:"center", fontSize:26, },

    KeybordMainBox:{ padding:20, position:"absolute", left:0, bottom:0, width:"100%", },
    KeybordInnerBox:{ borderRadius:8, borderWidth:1, borderColor:"#cacaca", padding:20,},
    KeybordCol:{ textAlign:"center", },
    KeybordButton:{ width:"100%", height:"100%", backgroundColor:"transparent", textAlign:"center",  height:80,  justifyContent:"center", },
    KeybordColText:{ color:"#333333", fontFamily:"LatoRegular", fontSize:30, lineHeight:70, height:80, textAlign:"center",  },
    Backbutton:{ width:49, height:30, marginLeft:"auto", marginRight:"auto", marginTop:10,  }
});