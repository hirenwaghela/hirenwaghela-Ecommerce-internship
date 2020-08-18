import React from 'react';
import { StyleSheet, TextInput, Text, View, Dimensions, AsyncStorage, BackHandler, Image } from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
const { width } = Dimensions.get('window')
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                flex:1,
                flexDirection:"row", 
                justifyContent:'center',
                alignItems:'center'
            }}>
                <AntDesign name="shoppingcart" size={32} color="white"/>
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}>  My Cart</Text>                
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
                flex:1,
                flexDirection:"row",
                alignItems:'center',
                justifyContent:'center'
            }}>
            
                <AntDesign name="filetext1" size={24} color="white" />
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}>  My Orders</Text> 
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
                flex:1,
                flexDirection:"row", 
                justifyContent:'center',
                alignItems:'center'
            }}>
                <FontAwesome5 name="user-alt" size={24} color="white" />
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}> My Profile</Text>                
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
                flex:1,
                flexDirection:"row",
                justifyContent:'center',
                alignItems:'center'
            }}>
                <MaterialIcons name="location-on" size={24} color="#fff" />
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}>  My Address</Text>                
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
                flex:1,
                flexDirection:"row",
                alignItems:'center',
                justifyContent:'center'
            }}>  
                <MaterialCommunityIcons name="file-document-outline" size={22} color="white" />
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}>  Order Details</Text>                
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
                flex:1,
                alignItems:'center'
            }}>
            </View>
        </View>
      );

}

export const CategoriesHeader = (props) => {
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
                flex:1,
                flexDirection:"row",
                alignItems:'center',
                justifyContent:'center'
            }}>  
                <MaterialIcons name="grid-on" size={24} color="white" />
                <Text style={{fontSize:22, color:"white", textAlign:'center'}}>  Categories</Text>                
            </View>
        </View>
      );

}

export const DrawerHeader = (props) => {
    
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
            <View style={{ flex:1 ,flexDirection:"row"}}>
                <View style={{flex:0.10}}></View>
                <View style={{flex:0.90}}>
                    <View style={{flex:1, flexDirection:"row"}}>
                        <View style={{flex:0.25}}>
                            <View style={{height:46,width:46, borderRadius:23, backgroundColor:"#fff" }}>
                            <Image style={{flex: 1, height: null,width: null, borderRadius:65}} source={require("./../assets/profile-pic.jpg")}/>
                            </View>
                        </View>
                        <View style={{flex:0.75, }}>
                            <TouchableOpacity   onPress={props.navigation} >
                                <Text style={{fontSize:22, color:"#fff"}}>Welcome</Text>
                                <Text style={{fontSize:15, color:"#fff"}}>{props.mobile}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
      );

}

