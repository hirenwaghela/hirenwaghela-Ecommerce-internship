import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Input, Item } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('screen').width

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            otp:'',
            isloading: false,
            toggle: true
         };
      }

    getOtp = () => {
        this.setState({isloading:true})
        this.setState({toggle:false})
        // code for pgetting otp
        
        this.setState({isloading:false})
    }
    
  render() {
      var toggleView = this.state.toggle == true ? 
        <View style={{alignItems:'center'}}>
                <Item regular
                      style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Phone number' keyboardType='number-pad' 
                        onChangeText={phone => this.setState({phone})}
                        value={this.state.phone}
                    />
                </Item>
                <TouchableOpacity onPress={ () => this.getOtp()} 
                                style={{height:45, width:width-80, justifyContent:'center', alignItems:'center', 
                                        marginLeft:2, marginTop:30, borderRadius:5, backgroundColor:'#76BA1B'}}>
                    <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>Get OTP</Text>
                </TouchableOpacity>
                <TouchableOpacity   onPress={ () => this.props.navigation.navigate('SignUp')} 
                                    style={{marginTop:20, flexDirection:'row'}}>
                    <Text>New User?</Text>
                    <Text style={{color:'#76BA1B'}}>Sign Up</Text>
                </TouchableOpacity>
        </View>

        :

        <View>
                <Item regular
                  style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Enter OTP' keyboardType='number-pad'
                        onChangeText={otp => this.setState({otp})}
                        value={this.state.otp}
                    />
                </Item>
                <TouchableOpacity style={{height:45, width:width-80, justifyContent:'center', alignItems:'center', 
                                        marginLeft:2, marginTop:30, borderRadius:5, backgroundColor:'#76BA1B'}}>
                    <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>Verify</Text>
                </TouchableOpacity>
        </View>
      
    return (
      <View style={styles.containerMain}> 
          <View style={{height:40}}></View>
        <View style={{height:140, width:140, borderRadius:70, backgroundColor:'#76BA1B', elevation:5}}></View>
        <View style={{ marginTop:50, justifyContent:'center', alignItems:'center' }}>
            {!this.state.isloading ? (
                <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:17, fontWeight:'bold'}}>Sign In</Text>
                    {toggleView}
                </View>
                )
                :
                (
                <ActivityIndicator size="large" color="#76BA1B" />
                )
        }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
  },
});
