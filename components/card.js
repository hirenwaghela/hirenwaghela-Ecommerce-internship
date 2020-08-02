import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image, TouchableOpacity} from 'react-native';
import { Card } from "react-native-paper" ;
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
const { width } = Dimensions.get('window')

export const Card1 = (props) => (
            <View style={{marginVertical:5, backgroundColor:"#fff", elevation:4}}>
                <View style={{ flexDirection:"row",width: '100%', height:220, }} > 
                    <View style={{paddingVertical:25, paddingLeft:15}}>
                        <View style={{width:110, height:160}}>
                            <Image
                                style={styles.image}
                                // source={require("./../assets/swiper-1.png")}
                                source={{uri:`${props.imageurl}`}}
                            />
                        </View>
                    </View>    
                    <View style={{paddingVertical:25, paddingLeft:25}}>
                        {/* <Text style={{width:200, fontSize:20}}>Taj Mahal Tea - 1 kg</Text> */}
                        <Text style={{width:200, fontSize:20}}>{props.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{marginTop:10, color:"#76BA1B", fontSize:17}}>₹ {props.sellingprice}</Text> 
                            <Text style={{paddingLeft:20, marginTop:10, textDecorationLine: 'line-through', fontSize:17}}>MRP {props.costprice}</Text>
                        </View>
                        <TouchableOpacity onPress={props.BuyNow} activeOpacity={0.8} style={{marginTop:70, height:32,width:100}}>
                                <LinearGradient colors={["#76BA1B", "#4C9A2A"]} style={{height:32,width:100,alignItems:"center",justifyContent:"center", borderRadius:20, elevation:5}}>
                                    <Text style={{fontSize:17, color:"#fff", }}>Buy Now</Text>
                                </LinearGradient>
                        </TouchableOpacity>
                    </View>         
                </View>
            </View>
    
  );

export const Card2 = (props) => (
    <View style={{marginVertical:5, backgroundColor:"#fff", elevation:4}}>
        <View style={{ flexDirection:"row",width: '100%', height:230, }} > 
            <View>
                <View style={{paddingTop:25, paddingLeft:43}}>
                    <View style={{width:80, height:120}}>
                        <Image
                            style={styles.image}
                            source={{uri:`${props.imageurl}`}}
                        />
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.8} style={{marginTop:18, marginLeft:33}}>
                        <LinearGradient colors={["#848482","#5E5E5E"]} style={{height:28,width:100,flexDirection:"row", alignItems:"center",justifyContent:"center", borderRadius:20, elevation:5}}>
                            <Ionicons name="ios-trash" size={20} color="white" style={{marginLeft:-3,marginRight:5}}/>
                            <Text style={{fontSize:14, color:"#fff", }}>Remove</Text>
                        </LinearGradient>
                </TouchableOpacity>
            </View>    

            <View style={{paddingVertical:25, paddingLeft:25}}>
                <Text style={{width:200, fontSize:20, marginBottom:5}}>{props.title}</Text>
                <View style={{ height:20, width:40, alignItems:"center", borderRadius:10, elevation:5, backgroundColor:'#fff'}}>
                    <Text style={{ fontSize:12 }}>Qty-1</Text>
                </View>
                
                <Text style={{  textDecorationLine: 'line-through', fontSize:14, marginTop:3}}>MRP {props.sellingprice}</Text>
                
                <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:15, marginTop:5}}>
                    <Text style={{fontSize:14}}>Price/pc</Text>
                    <Text style={{fontSize:14}}>₹ {props.costprice}</Text>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:15, marginTop:5}}>
                    <Text style={{fontSize:14, color:"#76BA1B"}}>Discount</Text>
                    <Text style={{fontSize:14, color:"red"}}>50% Off</Text>
                </View>

                <View style={{flexDirection:"row", justifyContent:"space-between", marginRight:15, marginTop:25}}>
                    <Text style={{fontSize:20}}>You Pay</Text>
                    <Text style={{fontSize:20, color:"#76BA1B"}}>₹ {props.costprice}</Text>
                </View>
            </View>         
        </View>
    </View>

);

export const Card3 = (props) => (
        <View style={{ flexDirection:"row",width: '100%', height:150, marginVertical:5, backgroundColor:"#fff", elevation:4 }} > 
            <View style={{paddingVertical:25, paddingLeft:35}}>
                <View style={{width:60, height:100}}>
                    <Image
                        style={styles.image}
                        source={{uri:`${props.imageurl}`}}
                    />
                </View>
            </View>    
            <View style={{paddingVertical:25, paddingLeft:25}}>
                <Text style={{width:200, fontSize:20}}>{props.title}</Text>
                <Text style={{fontSize:12, marginTop:5}}>Qty-1</Text>
                <View style={{flexDirection:'row'}}>
                    <Text style={{fontSize:12}}>Orser ID-</Text>
                    <Text style={{paddingLeft:20, fontSize:12}}>#DGHSHBDHS</Text>
                </View>
                <View style={{marginTop:10 ,alignItems:"flex-end"}}>
                    <Text style={{fontSize:24, color:"#76BA1B"}}>₹ {props.sellingprice}</Text>
                </View>
            </View>         
        </View>

);


export const MyOrdersCard = (props) => (
    <View style={{ flexDirection:"row",width: '100%', minHeight:150, marginVertical:5, backgroundColor:"#fff", elevation:4 }} > 
        <View style={{paddingVertical:25, paddingLeft:35}}>
            <View style={{width:60, height:100}}>
                <Image
                    style={styles.image}
                    source={require("./../assets/swiper-1.png")}
                />
            </View>
        </View>    
        <View style={{paddingVertical:25, paddingLeft:25}}>
            <Text style={{width:200, fontSize:20}}>{props.titles}</Text>
            <Text style={{fontSize:12, marginTop:5}}>Qty-1</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:12}}>Orser ID-</Text>
                <Text style={{fontSize:12}}>#DGHSHBDHS</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:11}}>Expected delivery</Text>
                <Text style={{fontSize:11}}>20th June 2020</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={{fontSize:13, color:props.status=='processing'?(props.status!=='shipped'?'red':'blue'):(props.status!=='shipped'?'#76BA1B':'blue')}}>{props.status}</Text>
                <Text style={{fontSize:16, color:"#76BA1B"}}>₹ {props.totalcost}</Text>
            </View>
            
        </View>         
    </View>

);


export const SmallCategoryCards = (props) => (
    <View style={{alignItems:"center"}}>
        <TouchableOpacity activeOpacity={0.8} 
                          style={{ width: width/3 - 20, height: width/3 - 20,  
                                   borderRadius:205, backgroundColor:"#fff", justifyContent:"center", 
                                   alignItems:"center", elevation:10}}
                                   onPress={props.onPress}
        >
                <Image
                    style={{ width: width/3 - 20, height: width/3 - 20,  borderRadius:205, resizeMode:"cover"}}
                    // source={require("./../assets/swiper-1.png")}
                    source={{uri:`${props.imageurl}`}}
                />    
        </TouchableOpacity>
        <Text style={{fontSize:15}}>{props.category}</Text>
    </View>
); 

  const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
        borderColor: '#D3D3D3'
    },
  })
  
 

//   {props.status=='Processing'?(props.status!=='Shipped'?'red':'blue'):'#76BA1B'}