import React from 'react';
import { StyleSheet, TextInput, View, Dimensions } from 'react-native';
import {AntDesign, Feather,EvilIcons,MaterialIcons} from '@expo/vector-icons';
import Constant from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width } = Dimensions.get('window')

export default class Header extends React.Component {
    state={
        searchtext:""
    }
  render(){
    return (
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",
            //flexDirection:"row",
            // justifyContent:"space-between",
            // elevation:4,
            
        }}>
          <View style={{
              flexDirection:"row",
              marginVertical:5,
              marginHorizontal:10,
              width:width-20,
              justifyContent:"space-between",
          }}>
             <TouchableOpacity onPress={this.props.navigation} activeOpacity={0.8}>
               <Feather name="menu" size={30} color="white" />
             </TouchableOpacity>
             <View style={{flexDirection:"row" ,height: 35, width:250, borderRadius: 25, backgroundColor: "#fff"}}>
                <TextInput
                    style={{
                        height: 35,
                        width:230,
                        fontSize: 17,
                        color: "#010101",
                        borderRadius: 25,
                        backgroundColor: "#fff",
                        paddingHorizontal:15}}
                        autoCapitalize="none"
                        placeholder="Search"
                        onChangeText={searchtext => this.setState({ searchtext })}
                        value={this.state.searchtext}
                ></TextInput>
                <EvilIcons name="search" size={28} color="#A9A9A9" style={{marginTop:5, marginLeft:-13}} />
             </View>
             <AntDesign name="shoppingcart" size={30} color="white" />
          </View>
        </View>
      );
  }
}
