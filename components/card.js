import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image, TouchableOpacity} from 'react-native';
import { Card } from "react-native-paper" ;
import { LinearGradient } from 'expo-linear-gradient';
import {Ionicons} from '@expo/vector-icons';
const { width } = Dimensions.get('window')

export const Card1 = (props) => (
            <View style={{flex:1, marginVertical:3, backgroundColor:"#fff", elevation:4}}>
                <View style={{ flex:1, flexDirection:"row", minHeight:150, marginTop:15, marginBottom:5, alignItems:'center', justifyContent:'center'}} > 
                    <View style={{flex:0.4, alignItems:'center'}}>
                        <View style={{width:110, height:140}}>
                            <Image
                                style={styles.image}
                                source={{uri:`${props.imageurl}`}}
                            />
                        </View>
                    </View>    
                    <View style={{flex:0.6}}>
                        <View style={{flex:0.7, justifyContent:'center'}}>
                            <View style={{flex:0.1, width:'100%'}}></View>
                            <View style={{flex:0.3, justifyContent:'flex-start'}}><Text style={{width:'95%', fontSize:17}}>{props.title}</Text></View>
                            <View style={{flex:0.6, flexDirection:'row'}}>
                                <Text style={{ color:"#76BA1B", fontSize:17}}>₹ {props.sellingprice}  </Text> 
                                <Text style={{ textDecorationLine: 'line-through', fontSize:13, marginTop:4}}>MRP {props.costprice}</Text>
                                {props.costprice == 0
                                    ?
                                    <Text style={{ color:"red", fontSize:17}}>  0%</Text>
                                    :
                                    <Text style={{ color:"red", fontSize:17}}>  {parseInt((props.costprice - props.sellingprice)*100/props.costprice,10)}%</Text>
                                }
                            </View>
                        </View>
                        <View style={{flex:0.3}}>
                                <LinearGradient colors={["#76BA1B", "#4C9A2A"]} style={{height:32,width:'65%', borderRadius:20, elevation:5}}>
                                    <TouchableOpacity onPress={props.BuyNow} activeOpacity={0.8} style={{ justifyContent:"center", height:32}}>
                                        <Text style={{fontSize:17, color:"#fff", textAlign:'center' }}>Buy Now</Text>
                                    </TouchableOpacity>
                                </LinearGradient>
                        </View>
                    </View>         
                </View>
            </View>
    
  );

export const Card2 = (props) => (
    <View style={{flex:1, marginVertical:3, backgroundColor:"#fff", elevation:4}}>
        <View style={{flex:1, flexDirection:"row",width: '100%', minHeight:170, marginVertical:10 }} > 
            <View style={{flex:0.4}}>
                <View style={{flex:1}}>
                    <View style={{flex:0.7, justifyContent:'center', alignItems:'center'}}>
                        <View style={{width:80, height:120}}>
                            <Image
                                style={styles.image}
                                source={{uri:`${props.imageurl}`}}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={props.Remove} activeOpacity={0.8} style={{flex:0.3, alignItems:'center'}}>
                            <LinearGradient colors={["#848482","#5E5E5E"]} style={{height:28,width:100,flexDirection:"row", alignItems:"center",justifyContent:"center", borderRadius:20, elevation:5}}>
                                <Ionicons name="ios-trash" size={20} color="white"/>
                                <Text style={{fontSize:14, color:"#fff", }}> Remove</Text>
                            </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>    

            <View style={{flex:0.6}}>
                <View style={{flex:1}}>
                    <View style={{flex:0.7}}>
                        <View style={{flex:1}}>
                            <View style={{flex:0.4, justifyContent:'center'}}><Text style={{width:200, fontSize:20}}>{props.title}</Text></View>

                            {/* <View style={{ height:20, width:40, alignItems:"center", borderRadius:10, elevation:5, backgroundColor:'#fff'}}>
                                <Text style={{ fontSize:12 }}>Qty-1</Text>
                            </View> */}
                            
                            {/* <View style={{flex:0.2, justifyContent:'center'}}><Text style={{textDecorationLine: 'line-through', fontSize:14,}}>MRP {props.sellingprice}</Text></View> */}
                            
                            <View style={{flex:0.2}}>
                                <View style={{flex:1, width:'90%', flexDirection:"row", justifyContent:"space-between"}}>
                                <Text style={{textDecorationLine: 'line-through', fontSize:14,}}>MRP {props.costprice}</Text>
                                    <Text style={{fontSize:14, color:"#76BA1B"}}>{Math.round(((parseInt(props.costprice,10) - parseInt(props.sellingprice,10))/parseInt(props.costprice,10)) * 100) + '%'}</Text>
                                </View>
                            </View>

                            <View style={{flex:0.2}}>
                                <View style={{flex:1, width:'90%', flexDirection:"row", justifyContent:"space-between"}}>
                                    <Text style={{fontSize:14}}>Price/pc</Text>
                                    <Text style={{fontSize:14}}>₹ {props.sellingprice}</Text>
                                </View>
                            </View>

                            {/* <View style={{flex:0.2}}>
                                <View style={{flex:1, width:'90%', flexDirection:"row", justifyContent:"space-between"}}>
                                    <Text style={{fontSize:14, color:"#76BA1B"}}>Discount</Text>
                                    <Text style={{fontSize:14, color:"red"}}>50% Off</Text>
                                </View>
                            </View> */}

                        </View>

                    </View>

                    <View style={{flex:0.3, justifyContent:'center'}}>
                        <View style={{flex:1, width:'90%',flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style={{fontSize:20}}>You Pay</Text>
                            <Text style={{fontSize:20, color:"#76BA1B"}}>₹ {parseInt(props.sellingprice,10) * parseInt(props.quantity,10)}</Text>
                        </View>
                    </View>
                </View>
            </View>         
        </View>
    </View>

);

export const Card3 = (props) => (
        <View style={{flex:1, flexDirection:"row", width:'100%', minHeight:100, marginVertical:2, paddingVertical:5, backgroundColor:"#fff", elevation:4 }} > 
            <View style={{flex:0.25, alignItems:'center', justifyContent:'center'}}>
                <View style={{width:60, height:100}}>
                    <Image
                        style={styles.image}
                        source={{uri:`${props.imageurl}`}}
                    />
                </View>
            </View>    
            <View style={{flex:0.75, justifyContent:'center'}}>
                <View style={{flex:1, flexDirection:'row',}}>
                    <View style={{flex:0.1}}></View>
                    <View style={{flex:0.9}}>
                        <Text style={{width:220, fontSize:16, marginTop:10}}>{props.title}</Text>
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop:5, height:25, width:45, backgroundColor:'#fff',  justifyContent:'center', alignItems:'center', elevation:3}}>
                                <Text style={{fontSize:13, textAlign:'center'}}>Qty : {props.quantity}</Text>
                            </View>
                            <View style={{flex:1, justifyContent: 'center', alignItems:'flex-end', flexDirection:'row'}}>
                                <Text>Price/pc:  </Text>
                                <Text>₹ {props.sellingprice}</Text>
                            </View>
                        </View>
                        
                        <View style={{marginTop:10, alignItems:"flex-end"}}>
                            <Text style={{fontSize:24, color:"#76BA1B"}}>₹ {props.sellingprice * props.quantity}</Text>
                        </View>
                    </View>
                    <View style={{flex:0.1}}></View>
                </View>
            </View>         
        </View>

);


export const MyOrdersCopy = (props) => (
<View style={{flex:1, flexDirection:"row", minHeight:150, paddingVertical:10, marginVertical:2, backgroundColor:"#fff", elevation:4 }} > 
                <View style={{flex:0.3, alignItems:'center'}}>
                    <View style={{width:60, height:100}}>
                        {/* <Image
                            style={styles.image}
                            source={{uri:`${props.imageurls.split(',')[0]}`}}
                        /> */}
                    </View>
                </View>    
                <View style={{flex:0.7, alignItems:'center', justifyContent:'center'}}>
                    {/* <Text style={{width:220, fontSize:15}}>{props.titles.split(',').map((index,item)=>{
                        return '• '+ props.titles.split(',')[item] + '\n'
                        })}</Text> */}
                    <View style={{width:'85%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:16}}>Total Cost</Text>
                        {/* <Text style={{fontSize:16, color:"#76BA1B"}}>₹ {props.totalcost}</Text> */}
                    </View>
                    <View style={{width:'85%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:12}}>Orser ID-</Text>
                        {/* <Text style={{fontSize:12}}>{props.referenceid}</Text> */}
                    </View>
                    <View style={{width:'85%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:11}}>Expected delivery</Text>
                        {/* <Text style={{fontSize:11}}>{props.createdDate}</Text> */}
                    </View>
                    <View style={{width:'85%', justifyContent:'space-between'}}>
                        {/* <Text style={{fontSize:16, fontWeight:'bold', marginTop:7, color:props.status=='processing'?(props.status!=='shipped'?'orange':'#76BA1B'):(props.status!=='shipped'?'#76BA1B':'#76BA1B')}}>{props.status.charAt(0).toUpperCase() + props.status.slice(1)}</Text> */}
                    </View>
                    
                </View>         
            </View>


);


export const MyOrdersCard = (props) => (
            <TouchableOpacity   onPress={props.navigation}
                                activeOpacity={0.8}
                                style={{flex:1, flexDirection:"row", minHeight:80, paddingVertical:10, marginVertical:2, backgroundColor:"#fff", elevation:4 }} > 
                <View style={{flex:0.3, alignItems:'center'}}>
                        <View style={{width:60, height:60, borderRadius:30, borderColor:'#D3D3D3', borderWidth:1, justifyContent:'center'}}>
                            <View style={{width:56, height:56, borderRadius:28, alignSelf:'center', justifyContent: 'center',}}>
                                <Image
                                    style={{
                                        flex: 1,
                                        height: null, 
                                        width: null, 
                                        resizeMode: 'contain', 
                                        borderRadius:45
                                    }}
                                    source={require('./../assets/apple-icon.png')}
                                />
                            </View>
                        </View>
                </View>    
                <View style={{flex:0.7}}>
                    <View style={{flex:0.65, justifyContent:'flex-end'}}>
                        <View style={{width:'85%', flexDirection:'row'}}>
                            <Text style={{fontSize:16}}>Order ID    </Text>
                            <Text style={{fontSize:16}}>#{props.referenceid}</Text>
                        </View>
                    </View>         
                    <View style={{flex:0.35}}>
                        <Text style={{color:'grey', fontSize:12}}>Tap to View Order</Text>
                    </View>
                </View>
            </TouchableOpacity>

);


export const SmallCategoryCards = (props) => (
    <View style={{flex:1, alignItems:"center", marginBottom:10}}>
        <TouchableOpacity activeOpacity={0.8} 
                          style={{ width: width/3 - 20, height: width/3 - 20,  
                                   borderRadius:205, backgroundColor:"#fff", justifyContent:"center", 
                                   alignItems:"center", elevation:10}}
                                   onPress={props.onPress}
        >
                <Image
                    style={{ width: width/3 - 20, height: width/3 - 20,  borderRadius:205, resizeMode:"cover"}}
                    source={{uri:`${props.imageurl}`}}
                />    
        </TouchableOpacity>
        <Text style={{fontSize:15, marginTop:5, textAlign:'center', width:width/3}}>{props.title}</Text>
    </View>
); 

  const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
        borderColor: '#fff'
    },
  })
  
 

//   {props.status=='Processing'?(props.status!=='Shipped'?'red':'blue'):'#76BA1B'}
