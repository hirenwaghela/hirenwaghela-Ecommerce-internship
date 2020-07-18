import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import  { Card1 } from "../components/card"
import Header from "../components/header_search"
const width = Dimensions.get('screen').width

export default class Products extends React.Component {
  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Header navigation={ () => this.props.navigation.openDrawer()}/>
            <ScrollView>
                <View style={{paddingLeft:20, paddingTop:20, paddingBottom:10, height:40, justifyContent:"center"}}>
                    <Text style={{fontSize:25 }}>Tea</Text>
                </View> 
                <Card1  BuyNow={ () => this.props.navigation.navigate('MyCart')}/>
                <Card1  BuyNow={ () => this.props.navigation.navigate('MyCart')}/>
                <Card1  BuyNow={ () => this.props.navigation.navigate('MyCart')}/>
                <Card1  BuyNow={ () => this.props.navigation.navigate('MyCart')}/>
            </ScrollView>
        </View>
      );
  }
    
}

