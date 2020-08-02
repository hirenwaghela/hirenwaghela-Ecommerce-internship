import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { CompletedHeader } from "../components/header_components";
import {Fontisto} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('screen').width

export default class Completed extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <CompletedHeader goback={ () => this.props.navigation.goBack()}/>    
        <View style={{ marginTop:45, alignItems:"center"}}>
            <View style={{ height:width-130, width:width-130, borderRadius:width/2 - 65, borderWidth:5, borderColor:"#76BA1B", alignItems:"center", justifyContent:"center"}}>
                <Fontisto name="shopping-basket-add" size={100} color="#76BA1B" />
            </View>
        </View>

        <View style={{ marginTop:40, alignItems:"center"}}>
            <Text style={{fontSize:24, color:"#76BA1B"}}>Order Successfull</Text>
        </View>

        <View style={{ marginTop:40, alignItems:"center"}}>
            <Text style={{fontSize:38, color:"#76BA1B"}}>Thank you!</Text>
        </View>

        
        <View style={{alignItems:"center"}}>
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home1')}
                              style={{width:width-70, height:45, marginTop:40, alignItems:"center", 
                                      justifyContent:"center" ,backgroundColor:"#76BA1B", borderRadius:25}}>
                <Text style={{fontSize:22, color:"#fff"}}>Continue Your Shopping</Text>
            </TouchableOpacity>
        </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
