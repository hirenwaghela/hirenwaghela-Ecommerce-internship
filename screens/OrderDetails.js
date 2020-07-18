import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { OrderDetailsHeader } from "../components/header_components";
import { Bottom2 } from "../components/bottom_buttons";
import { Cart3, Card3 } from "../components/card";
import {Entypo} from '@expo/vector-icons';
const width = Dimensions.get('screen').width

export default class Completed extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <OrderDetailsHeader goback={ () => this.props.navigation.goBack()}/>    
        <ScrollView>
        <View style={{marginTop:40, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Order Summary</Text>
        </View>
        
        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:15}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Order Date</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>06 Feb 2020</Text>
            </View>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Bag ID</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>134562</Text>
            </View>
        </View>
        
        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Payment Mode</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>Cash on Delivery</Text>
            </View>
        </View>
        
        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Total Amount</Text>
            </View>
            <View style={{flex:1}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ 150</Text>
            </View>
        </View>
        
        <View style={{marginTop:25, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Items in this cart (2)</Text>
        </View>

        <Card3/>
        <Card3/>

        <View style={{marginTop:15, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Payment Summary</Text>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:15}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Order Value</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ 300</Text>
            </View>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Discount</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>50%</Text>
            </View>
        </View>
        
        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3, marginBottom:7}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Delivery Fee</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>0</Text>
            </View>
        </View>
        <View style={{marginHorizontal:20 ,borderBottomWidth:1, borderColor:"#D3D3D3"}}></View>
        
        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:20}}>Total Amount</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:20, color:"#76BA1B"}}>₹ 150</Text>
            </View>
        </View>


        <View style={{marginTop:25, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Delivery Address</Text>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}> 
            <Entypo name="location-pin" size={24} color="#76BA1B" />
            <Text style={{fontSize:16}}>10 C Sikka Colony Sonepat Delhi Road 140021</Text>
        </View>

        <View style={{height:90}}></View>
        </ScrollView>
        <Bottom2 confirm={ () => this.props.navigation.navigate('Completed')}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
