import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import  { Swiper2 } from "../components/Swiper" ;
import  { Card1, SmallCategoryCards } from "../components/card"
import Header from "../components/header_search"
const width = Dimensions.get('screen').width

export default class Home extends React.Component {
  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Header navigation={ () => this.props.navigation.openDrawer()}/>
            <ScrollView>
                <Swiper2 image1=""/>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <View style={{height:250,justifyContent:"space-around"}}>
                        <SmallCategoryCards/><SmallCategoryCards/>
                    </View>
                    <View style={{height:250,justifyContent:"space-around"}}>
                        <SmallCategoryCards/><SmallCategoryCards/>
                    </View>
                    <View style={{height:250,justifyContent:"space-around"}}>
                        <SmallCategoryCards/><SmallCategoryCards/>
                    </View>
                </View>
                <View style={{paddingLeft:20, height:40, justifyContent:"center"}}>
                    <Text style={{fontSize:20, }}>Latest Product</Text>
                </View>
                <Card1 onPress={ () => this.props.navigation.navigate('Home2')}/>
                <Card1 onPress={ () => this.props.navigation.navigate('Home2')}/>
                <Card1 onPress={ () => this.props.navigation.navigate('Home2')}/>
                <Card1 onPress={ () => this.props.navigation.navigate('Home2')}/>
            </ScrollView>
        </View>
      );
  }
    
}

