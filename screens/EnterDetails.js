import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity , Dimensions, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import Constant from 'expo-constants';
import { Input, Item } from 'native-base';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


export default class EnterDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            Error: null,
            token: '',
            userId: '',
            mobile: '',
            name: '',
            email: '',
            address: '',
            pincode: '',
            city: '',
            state: ''
         };
      }


    //   signUpHandler = () => {

    //     fetch('https://server.dholpurshare.com/api/signup', {
    //         method: 'PUT',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             mobile: this.state.mobile,
    //             email: this.state.email,
    //             name: this.state.name,
    //             address: this.state.address,
    //             pincode: this.state.pincode,
    //             city: this.state.city,
    //             state: this.state.state
    //         })
    //       })
    //         .then(res => {
    //             console.log(JSON.stringify(res))
    //             return res.json();
    //         })
    //         .then( resData => {
    //             console.log(resData);
    //             this.setState({
    //                 token: resData.token,
    //                 userId: resData.userId
    //                 })
    //         })
    //         .then(async() =>{
    //             AsyncStorage.setItem('isLogIn', 'true')
    //             AsyncStorage.setItem('token', this.state.token) // assigning token
    //             AsyncStorage.setItem('userId', this.state.userId) // assigning userId
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    //     this.props.navigation.navigate('Home')        
    
    //   }

    submit = () => {

        this.setState({isModalVisible: true})
        fetch('https://server.dholpurshare.com/api/signup', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mobile: this.state.mobile,
                email: this.state.email,
                name: this.state.name,
                address: this.state.address,
                pincode: this.state.pincode,
                city: this.state.city,
                state: this.state.state
            })
          })
            .then(res => {
                console.log(JSON.stringify(res))
                return res.json();
            })
            .then( resData => {
                console.log('\nEnter Details submit:\n',resData);
                this.setState({
                    token: resData.token,
                    userId: resData.userId
                    })
            })
            .then(async() =>{
                AsyncStorage.setItem('isLogIn', 'true')
                AsyncStorage.setItem('token', this.state.token) // assigning token
                AsyncStorage.setItem('userId', this.state.userId) // assigning userId
                AsyncStorage.setItem('mobile', this.state.mobile)
                AsyncStorage.setItem('name', this.state.name) 
                this.setState({isModalVisible: false})
                setTimeout(()=>{
                    this.props.navigation.navigate('DrawerApp')
                },1000)
            })
            .catch(err => {
                console.log(err);
                this.setState({isModalVisible: false})
                this.setState({Error: err})
                setTimeout(()=>{
                    this.props.navigation.navigate('SignUpOTP')
                },1000)
            });
        
    }

    componentDidMount() {
        this.fetchMobile()
    }


    fetchMobile = async() => {
        try {
            let mobile = await AsyncStorage.getItem('mobile')
            this.setState({mobile})
            
        } catch (error) {
            console.log(error)
            this.setState({Error: err})
        }
        console.log('EnterDetails fetch ', this.state.mobile)
    }



  render() {
    return (
      <View style={styles.containerMain}>
        <View style={{height:55 + Constant.statusBarHeight, width:width, backgroundColor:'#76BA1B', 
                      alignItems:'center', justifyContent:'center'}}>
                <Text style={{color:'#fff', fontSize:20, fontWeight:'bold', marginTop:25}}>Sign Up</Text>
        </View>

                {/* Showing Loader */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{height: height-680, width:width-270, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                        <ActivityIndicator size='large' color='#76BA1B'/>
                        </View>
                    </View>
                </Modal>
                
                {/* Showing Error */}
                <Modal isVisible={this.state.Error != null}>
                    <View style={{height: height-680, width:width-160, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:17, textAlign:'center'}}>Oops!</Text>
                        <Text style={{fontSize:17, textAlign:'center'}}>Something went wrong</Text>
                        </View>
                    </View>
                </Modal>


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
