import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity , Dimensions, Alert, AsyncStorage } from 'react-native';
import Constant from 'expo-constants';
import { Input, Item } from 'native-base';
import Storage from 'react-native-storage';
const { width } = Dimensions.get('window');
import axios from 'axios' ;

export default class EnterDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobile: '',
            name: '',
            email: '',
            address: '',
            pincode: '',
            city: '',
            state: ''
         };
      }

    submit = () => {
        
        axios.put('https://server.dholpurshare.com/api/signup', {
            mobile: this.state.mobile,
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            pincode: this.state.pincode,
            city: this.state.city,
            state: this.state.state
          })
          .then(response => {
              console.log('\nEnterDetails\n')
              console.log(response.data)

            //   AsyncStorage.setItem('isLogIn', 'true')
            //   AsyncStorage.setItem('token', response.data.token) // assigning token
            //   AsyncStorage.setItem('userId', response.data.userId) // assigning userId
          })
        // console.log(this.state)
        this.props.navigation.navigate('Home')
        
    }

    componentDidMount() {
        this.fetchMobile()
    }


    fetchMobile = async() => {
        try {
            let mobile = await AsyncStorage.getItem('mobile')
            this.setState({mobile})
            console.log('EnterDetails fetch ', mobile)
            
        } catch (error) {
            console.log(error)
        }
    }



  render() {
    return (
      <View style={styles.containerMain}>
        <View style={{height:55 + Constant.statusBarHeight, width:width, backgroundColor:'#76BA1B', 
                      alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'#fff', fontSize:20, fontWeight:'bold', marginTop:25}}>Sign Up</Text>
        </View>
        <View style={{marginTop:10, alignItems:'center', justifyContent:'center'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Name' keyboardType='default' 
                        onChangeText={name => this.setState({name})}
                        value={this.state.name}
                    />
                </Item>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Email' keyboardType='email-address' 
                        onChangeText={email => this.setState({email})}
                        value={this.state.email}
                    />
                </Item>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Address' keyboardType='default' 
                        onChangeText={address => this.setState({address})}
                        value={this.state.address}
                    />
                </Item>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='Pincode' keyboardType='number-pad' 
                        onChangeText={pincode => this.setState({pincode})}
                        value={this.state.pincode}
                    />
                </Item>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='City' keyboardType='default' 
                        onChangeText={city => this.setState({city})}
                        value={this.state.city}
                    />
                </Item>
                <Item regular
                    style={{width:width-80, marginTop:30}}
                >
                    <Input placeholder='State' keyboardType='default' 
                        onChangeText={state => this.setState({state})}
                        value={this.state.state}
                    />
                </Item>
                <TouchableOpacity onPress={ () => this.submit()} 
                                style={{height:50, width:width-80, justifyContent:'center', alignItems:'center', 
                                        marginLeft:2, marginTop:30, borderRadius:5, backgroundColor:'#76BA1B'}}>
                    <Text style={{color:'#fff', fontSize:17, fontWeight:'bold'}}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
