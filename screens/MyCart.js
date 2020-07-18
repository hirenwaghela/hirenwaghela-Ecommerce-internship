import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import  { Card2 } from "../components/card"
import { MyCartHeader } from "../components/header_components";
import { Bottom1 } from "../components/bottom_buttons"

export default class MyCart extends Component {
  render() {
    return (
      <View style={styles.containerMain}>
        <MyCartHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
            <View style={{height:8, backgroundColor:"#fff"}}></View>
            <Card2/>
            <Card2/>
            <Card2/>
            <Card2/>
            <Card2/>
            <View style={{height:50, backgroundColor:"#fff"}}></View>
        </ScrollView>        
        <Bottom1 checkout={ () => this.props.navigation.navigate('OrderDetails')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
