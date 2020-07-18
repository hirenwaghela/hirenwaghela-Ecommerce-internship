import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions } from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')

export const MyCartHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <View style={{flexDirection:"row", paddingLeft:73}}>
                    <AntDesign name="shoppingcart" size={32} color="white"/>
                    <Text style={{fontSize:22, paddingLeft:10, color:"white"}}>My Cart</Text>
                </View>
                
            </View>
        </View>
      );

}


export const MyOrdersHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <View style={{flexDirection:"row", paddingLeft:73}}>
                    <AntDesign name="filetext1" size={24} color="white" />
                    <Text style={{fontSize:22, paddingLeft:10, color:"white"}}>My Orders</Text>
                </View>
                
            </View>
        </View>
      );

}

export const MyProfileHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <View style={{flexDirection:"row", paddingLeft:70}}>
                    <FontAwesome5 name="user-alt" size={24} color="white" style={{marginTop:3}} />
                    <Text style={{fontSize:22, paddingLeft:10, color:"white"}}>My Profile</Text>
                </View>
                
            </View>
        </View>
      );

}


export const MyAddressHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <View style={{flexDirection:"row", paddingLeft:55}}>
                    <MaterialIcons name="location-on" size={24} color="#fff" style={{ marginTop:2}} />
                    <Text style={{fontSize:22, paddingLeft:7, color:"white"}}>My Address</Text>
                </View>
                
            </View>
        </View>
      );

}

export const OrderDetailsHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <View style={{flexDirection:"row", paddingLeft:60}}>
                    <MaterialCommunityIcons name="file-document-outline" size={22} color="white" style={{ marginTop:5}}/>
                    <Text style={{fontSize:22, paddingLeft:3, color:"white"}}>Order Details</Text>
                </View>
                
            </View>
        </View>
      );

}


export const CompletedHeader = (props) => {
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flexDirection:"row",
                marginTop:8
            }}>
                <TouchableOpacity onPress={props.goback}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
            </View>
        </View>
      );

}

export const DrawerHeader = () => {
    return (
        <View style={{
            marginTop: -Constant.statusBarHeight,
            paddingTop: Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{ flexDirection:"row" }}>
                <View style={{height:46,width:46, borderRadius:23, marginLeft:15, backgroundColor:"#fff"}}></View>
                <View style={{ marginLeft:15}}>
                    <Text style={{fontSize:22, color:"#fff"}}>Srijan Singh</Text>
                    <Text style={{fontSize:15, color:"#fff"}}>8979778966</Text>
                </View>
            </View>
        </View>
      );

}