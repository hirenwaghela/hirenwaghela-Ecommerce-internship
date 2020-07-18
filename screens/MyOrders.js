import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import  { MyOrdersCard } from "../components/card"
import { MyOrdersHeader } from "../components/header_components";

export default class MyCart extends Component {
  render() {
    return (
      <View style={styles.containerMain}>
        <MyOrdersHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
            <View style={{height:8, backgroundColor:"#fff"}}></View>
            <MyOrdersCard status='Processing'/>
            <MyOrdersCard status='Shipped'/>
            <MyOrdersCard status='Delivered'/>
            <MyOrdersCard status='Processing'/>
            <MyOrdersCard status='Delivered'/>
        </ScrollView>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
