import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, Dimensions } from 'react-native';
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import  { Card2 } from "../components/card"
import { MyProfileHeader } from "../components/header_components";
import { Bottom1 } from "../components/bottom_buttons";
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')

export default class MyProfile extends Component {
  render() {
    return (
      <View style={styles.containerMain}>
        <MyProfileHeader goback={ () => this.props.navigation.goBack()}/>
        <View style={{height:285, width:'100%', backgroundColor:"#76BA1B"}}>
            <View style={{height:150, marginTop:5, alignItems:'center', justifyContent:'center'}}>
                <View style={{height:130, width:130, borderRadius:65, backgroundColor:'#fff'}}>
                    <Image style={{height:130, width:130, borderRadius:65}} source={require("./../assets/profile-pic.jpg")} />
                </View>
            </View>
            <View style={{ alignItems:'center'}}>
                <Text style={{fontSize:22, color:'#fff'}}>Srijan Singh</Text>
                <Text style={{fontSize:15, color:'#fff'}}>+91 8168181390</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:50, marginLeft: width/2 - 68, width:width/2 + 52}}>
                    <Text style={{fontSize:14, color:'#fff'}}>srijan@techronx.com</Text>
                    <FontAwesome5 name="edit" size={18} color="white" />
                </View>
            </View>
        </View>    
        <View style={{marginBottom:3, paddingTop:10, paddingLeft:15, backgroundColor:'#fff', elevation:3}}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name="location-on" size={18} color="#76BA1B" style={{ marginTop:-2}}/>
                <View style={{ paddingLeft:5 }}>
                    <Text style={{fontSize:12, color:'grey'}}>My Address</Text>
                    <Text style={{fontSize:12, color:'grey', width:200}}>308/117 D Allahabad Uttar Pradesh 114001</Text>
                </View>
            </View>
            <View style={{ height:1, marginLeft:20, backgroundColor:'#D3D3D3' }}></View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyAddress')} style={{alignItems:'flex-end', marginVertical:5}}>
                <FontAwesome5 name="edit" size={18} color="#76BA1B" style={{marginRight:7}}/>
            </TouchableOpacity>
        </View> 
        <View style={{marginBottom:3, paddingTop:10, paddingLeft:15, backgroundColor:'#fff', elevation:3}}>
            <View style={{flexDirection:'row'}}>
                <MaterialIcons name="assignment" size={17} color="#76BA1B" style={{ marginTop:-2}}/>
                <View style={{ paddingLeft:5 }}>
                    <Text style={{fontSize:12, color:'grey'}}>My Order</Text>
                    <Text style={{fontSize:12, color:'grey', width:200}}>308/117 D Allahabad Uttar Pradesh 114001</Text>
                </View>
            </View>
            <View style={{ height:1, marginLeft:20, backgroundColor:'#D3D3D3' }}></View>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('MyOrders')} style={{alignItems:'flex-end', marginVertical:5}}>
                <Text style={{fontSize:12, marginRight:7, color:"#76BA1B"}}>View orders</Text>
            </TouchableOpacity>
        </View> 
        <View style={{marginBottom:3, backgroundColor:'#fff'}}>
            <View style={{marginBottom:40, paddingTop:10, paddingLeft:15, backgroundColor:'#fff', elevation:3}}>
                <View style={{flexDirection:'row'}}>
                    <FontAwesome name="shopping-cart" size={18} color="#76BA1B" style={{ marginTop:-2}}/>
                    <View style={{ paddingLeft:5 }}>
                        <Text style={{fontSize:12, color:'grey'}}>My Cart</Text>
                        <Text style={{fontSize:12, color:'grey', width:200}}>308/117 D Allahabad Uttar Pradesh 114001</Text>
                    </View>
                </View>
                <View style={{ height:1, marginLeft:20, backgroundColor:'#D3D3D3' }}></View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('MyCart')} style={{alignItems:'flex-end', marginVertical:5}}>
                    <Text style={{fontSize:12, marginRight:7, color:"#76BA1B"}}>View cart</Text>
                </TouchableOpacity>
            </View>
        </View> 
        <View style={{paddingTop:10, paddingLeft:15, backgroundColor:'#fff', elevation:3}}>
            <View style={{flexDirection:'row'}}>
            <AntDesign name="logout" size={18} color="#76BA1B" />
                <View style={{ paddingLeft:5 , marginBottom:10}}>
                    <Text style={{fontSize:12, color:'grey', width:200}}>Logout of this App</Text>
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
