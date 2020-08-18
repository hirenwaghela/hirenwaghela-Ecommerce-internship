import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions, AsyncStorage } from 'react-native';
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import  { Card2 } from "../components/card"
import { MyProfileHeader } from "../components/header_components";
import { Bottom1 } from "../components/bottom_buttons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
const { width } = Dimensions.get('window')


export default class MyProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_details: [],
            userId:'',
            pincode: "",
            address: "",
            city: "",
            state: "",
            name: "",
            email: "",

         };
      }

    componentDidMount() {
        this.UserId()
    }

    setUserDetails = () => {
        this.setState({
            pincode: this.props.route.params.pincode,
            address: this.props.route.params.address,
            city: this.props.route.params.city,
            state: this.props.route.params.state,
            name: this.props.route.params.name,
            email: this.props.route.params.email,
        })
    }
    
    fetchDetails = () => {
        
        // fetching User Details  API

        axios.get('https://server.dholpurshare.com/api/user/' + this.state.userId)
        .then((res)=>{
            console.log('\n\nUser details');
            console.log(res.data.data)
            this.setState({user_details: res.data.data})
            this.setState({
                pincode: res.data.data.pincode,
                address: res.data.data.address,
                city: res.data.data.city,
                state: res.data.data.state,
                name: res.data.data.name,
                email: res.data.data.email,
            })
        }).catch(err => {
            console.log(err)
        })

    }

    UserId = async() => {
        try{
            let userId = await AsyncStorage.getItem('userId')
            // console.log('My Profile\nUSER__ID: ',userId)
            this.setState({userId})
        }
        catch(err){
            console.log(err)
        }
        this.fetchDetails()
      }

    logout = async() => {
        console.log('\n\nLogout')
        await AsyncStorage.removeItem('isLogIn')
        await AsyncStorage.removeItem('mobile')
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')

        let isLogIn = await AsyncStorage.getItem('isLogIn')
        let mobile = await AsyncStorage.getItem('mobile')
        let token = await AsyncStorage.getItem('token')
        let userId = await AsyncStorage.getItem('userId')

        // console.log('Outside app from MyProfile\n')
        // console.log('isLogIn ', isLogIn)
        // console.log('mobile ', mobile)
        // console.log('token ', token)
        // console.log('userId ', userId)

        this.props.navigation.navigate('AuthStack')
    }

  render() {
    //   if(this.props.route.params.update_counter == 1){
    //     this.setUserDetails()
    //   }

    return (
      <View style={styles.containerMain}>
        <MyProfileHeader/>
        <View style={{flex:0.35}}>
            <View style={{flex:1, backgroundColor:"#76BA1B"}}>
                <View style={{height:150, alignItems:'center', justifyContent:'center'}}>
                    <View style={{height:100, width:100, borderRadius:55, backgroundColor:'#fff', borderColor:'#fff',borderWidth:4}}>
                        <Image style={{flex: 1, height: null,width: null, borderRadius:65}} source={require("./../assets/profile-pic.jpg")} />
                    </View>
                </View>
                <View style={{flex:1, height:30, alignItems:'center'}}>
                    <View style={{flex:0.3}}>
                        <Text style={{fontSize:15, color:'#fff', textAlign:'center'}}>{this.state.user_details.name}</Text>
                        <Text style={{fontSize:15, color:'#fff', textAlign:'center'}}>+91 {this.state.user_details.mobile}</Text>
                    </View>
                    <View style={{flex:0.7, width:'100%'}}>
                        <View style={{flex:0.9}}>
                            <View style={{flex:1, flexDirection:'row', width:'100%', alignItems:'flex-end'}}>
                                <View style={{flex:0.2}}></View>
                                <View style={{flex:0.6, alignItems:'center'}}>
                                    <Text style={{fontSize:14, color:'#fff', textAlign:'center'}}>{this.state.user_details.email}</Text>
                                </View>
                                <View style={{flex:0.2}}>
                                    <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                                        <TouchableOpacity   onPress={() => this.props.navigation.navigate('MyAddress',this.state)}
                                                            style={{flex:0.88, justifyContent:'flex-end', alignItems:'flex-end'}}>
                                            <FontAwesome5 name="edit" size={18} color="white"/>
                                        </TouchableOpacity>
                                        <View style={{flex:0.12}}></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{flex:0.1}}></View>
                    </View>
                </View>
            </View>
        </View>    

        <View style={{flex:0.65, width:'95%',alignSelf:'center', marginVertical:10, elevation:3}}>
            <View style={{flex:1, minHeight:30}}>
                <View style={{flex:0.28, backgroundColor:'#fff', marginBottom:2, elevation:3}}>
                    <View style={{flex:0.1}}></View>
                    <View style={{flex:0.5}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.05}}></View>
                            <View style={{flex:0.95}}>
                                <View style={{flex:1}}>
                                    <View style={{flex:1, flexDirection:'row'}}>
                                        <MaterialIcons name="location-on" size={18} color="#76BA1B" />
                                        <View style={{flex:1}}>
                                            <Text style={{fontSize:12, color:'grey'}}>My Address</Text>
                                            <Text style={{fontSize:12, color:'grey', width:'70%', marginTop:5}}>{this.state.user_details.address} {this.state.user_details.pincode} {this.state.user_details.state}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 
                    <View style={{flex:0.4}}>
                        <View style={{height:1, backgroundColor:'#D3D3D3', marginTop:5 }}></View>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.7}}></View>
                            <View style={{flex:0.28, justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAddress',this.state)} style={{alignItems:'flex-end'}}>
                                    <FontAwesome5 name="edit" size={18} color="#76BA1B"/>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:0.02}}></View>
                        </View>
                    </View>
                </View> 
                
                <View style={{flex:0.28, backgroundColor:'#fff', marginBottom:2, elevation:3}}>
                    <View style={{flex:0.1}}></View>
                    <View style={{flex:0.5}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.05}}></View>
                            <View style={{flex:0.95}}>
                                <View style={{flex:1}}>
                                    <View style={{flex:0.7, flexDirection:'row'}}>
                                        <MaterialIcons name="assignment" size={17} color="#76BA1B" />
                                        <View style={{flex:1}}>
                                            <Text style={{fontSize:12, color:'grey'}}>My Order</Text>
                                            <Text style={{fontSize:12, color:'grey', width:'70%', marginTop:5}}>You can visit your order here.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 
                    <View style={{flex:0.4}}>
                        <View style={{height:1, backgroundColor:'#D3D3D3', marginTop:5}}></View>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.7}}></View>
                            <View style={{flex:0.28, justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrders')} style={{alignItems:'flex-end'}}>
                                <Text style={{fontSize:12, color:"#76BA1B"}}>View orders</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:0.02}}></View>
                        </View>
                    </View>
                </View> 

                <View style={{flex:0.28, backgroundColor:'#fff', marginBottom:2, elevation:3}}>
                    <View style={{flex:0.1}}></View>
                    <View style={{flex:0.5}}>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.05}}></View>
                            <View style={{flex:0.95}}>
                                <View style={{flex:1}}>
                                    <View style={{flexDirection:'row'}}>
                                        <FontAwesome name="shopping-cart" size={18} color="#76BA1B" />
                                        <View style={{flex:1}}>
                                            <Text style={{fontSize:12, color:'grey'}}> My Cart</Text>
                                            <Text style={{fontSize:12, color:'grey', width:'70%', marginTop:5}}>You can visit your added item here.</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View> 
                    <View style={{flex:0.4}}>
                        <View style={{height:1, backgroundColor:'#D3D3D3', marginTop:5}}></View>
                        <View style={{flex:1, flexDirection:'row'}}>
                            <View style={{flex:0.7}}></View>
                            <View style={{flex:0.28, justifyContent:'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart')} style={{alignItems:'flex-end'}}>
                                    <Text style={{fontSize:12, marginRight:'3%', color:"#76BA1B"}}>View cart</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:0.02}}></View>
                        </View>
                    </View>
                </View> 

                <View style={{flex:0.16, backgroundColor:'#fff', elevation:3}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.05}}></View>
                        <View style={{flex:0.95,justifyContent:'center'}}>
                            <TouchableOpacity onPress={ () => this.logout()} style={{flexDirection:'row',  alignItems:'center'}}>
                                <AntDesign name="logout" size={18} color="#76BA1B" />
                                <View>
                                    <Text style={{fontSize:12, color:'grey', width:'100%'}}>  Logout of this App</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> 
                
            </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor:'#D3D3D3'
  },
});
