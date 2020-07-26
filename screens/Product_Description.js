import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constant from 'expo-constants';
import { AddToCart } from "../components/bottom_buttons";
import axios from 'axios';


export default class MyCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_details: [],

         };
      }

      componentDidMount() {
        // fetching all product details
        axios.get('https://server.dholpurshare.com/api/product/' + this.props.route.params.category_products_id)
        .then((res)=>{
            console.log('\n\nProduct details');
            console.log(res.data.data)
            this.setState({product_details: res.data.data})
        }).catch(err => {
            console.log(err)
        })
      }

  render() {
    return (
      <View style={styles.containerMain}>
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
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <AntDesign name="left" size={30} color="white" style={{ marginLeft:15 }} />
                </TouchableOpacity>
                <Text style={{fontSize:22, paddingLeft:10, color:"white"}}>{this.state.product_details.title}</Text>
                                
            </View>
        </View>
        <ScrollView style={{backgroundColor:'#fff', marginBottom:50, paddingBottom:10}}>
            <View style={{height:230, backgroundColor:"#fff", elevation:3, alignItems:'center', justifyContent:'center', elevation:5}}>
                <View style={{width:150, height:200}}>
                    <Image
                        style={styles.image}
                        source={require("./../assets/salt.jpg")}
                    />
                    </View>
            </View>
            <View style={{height:230, backgroundColor:"#fff"}}>
                <View style={{paddingVertical:15, paddingLeft:25}}>
                    <Text style={{width:320, fontSize:20}}>Category name not Defined</Text>
                    <Text style={{width:320, fontSize:20}}>{this.state.product_details.title}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:20, color:"#76BA1B"}}>₹ {this.state.product_details.sellingprice}</Text>   
                        <Text style={{fontSize:12, marginTop:10, marginLeft:5}}>MRP </Text>
                        <Text style={{fontSize:12, marginTop:10, textDecorationLine:'line-through'}}>{this.state.product_details.costprice} </Text>
                        <Text style={{fontSize:14, color:'red', marginTop:9}}>  ₹ {this.state.product_details.discount * 100}  Off </Text>
                    </View>                
                    <View style={{ marginTop:10, height:20, width:40, alignItems:"center", borderRadius:10, elevation:5, backgroundColor:'#fff'}}>
                        <Text style={{ fontSize:12 }}>Qty-1</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={{marginTop:20, height:32,width:100}}>
                        <LinearGradient colors={["#76BA1B", "#4C9A2A"]} style={{height:32,width:100,alignItems:"center",justifyContent:"center", borderRadius:20, elevation:5}}>
                            <Text style={{fontSize:17, color:"#fff", }}>Buy Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', marginTop:15, marginRight:25, justifyContent:'space-between'}}>
                        <Text style={{fontSize:20}}>You Pay</Text>
                        <Text style={{fontSize:20}}>₹ {this.state.product_details.sellingprice}</Text>
                    </View>
                </View>
            </View>
            <View style={{backgroundColor:'#D3D3D3', height:1, marginHorizontal:25}}></View>
            <View style={{backgroundColor:'#fff', paddingHorizontal:25, paddingVertical:5}}>
                <Text style={{fontSize:16, color:'grey'}}>Free delivery and cash on delivery available</Text>
                <Text style={{fontSize:20, marginTop:10}}>Description</Text>
                <Text style={{fontSize:16, color:'grey'}}>{this.state.product_details.description}.</Text>
            </View>
        </ScrollView>
        <AddToCart movetoCart={ () => this.props.navigation.navigate('MyCart')}/>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  image:{
    flex: 1,
    height: null, 
    width: null, 
    resizeMode: 'contain', 
    borderWidth: 0.1, 
    borderColor: '#fff'
},
});
