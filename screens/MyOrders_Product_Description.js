import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Alert, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { OrderDetailsHeader } from "../components/header_components";
import { ConfirmOrder } from "../components/bottom_buttons";
import { Cart3, Card3 } from "../components/card";
import {Entypo, Octicons, FontAwesome} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios';
var moment = require('moment');

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class MyOrders_Product_Description extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            Error: null,
            products_list: [], 
            total_amount: 0,
            referenceId: null,
            order_date: null,
            delivery_date: null,
            Address: null,
            mobile: null,
            order_value: 0,
            userId: null,
            user_details: []
         };
      }


    componentDidMount() {
        this._refresh()
    }

    _refresh = () => {
        
        // fetch orders
        axios.get('https://server.dholpurshare.com/api/singleorder/' + this.props.route.params.referenceId)
        .then((res)=>{
            // console.log(res.data.data)
            this.setState({
              products_list: res.data.data,
              Address: res.data.data[0].address,
              total_amount: res.data.data[0].totalcost,
              mobile: res.data.data[0].mobile,
              order_status: res.data.data[0].status,
              order_date: res.data.data[0].createdAt,
              delivery_date: res.data.data[0].updatedAt
            })
        }).catch(err => {
            console.log(err)
            this.setState({Error: err})
        })
    }

  render() {
    
    return (
      <View style={{flex:1}}>
            <PTRView onRefresh={this._refresh} >
                <OrderDetailsHeader goback={ () => this.props.navigation.goBack()}/> 
                        
                        {/* Showing Error */}
                        <Modal isVisible={this.state.Error != null}>
                            <View style={{height: height-680, width:width-160, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                                <View style={{alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontSize:17, textAlign:'center'}}>Oops!</Text>
                                <Text style={{fontSize:17, textAlign:'center'}}>Something went wrong</Text>
                                </View>
                            </View>
                        </Modal>
                <ScrollView>
                    <View style={{height:20}}></View>
                    <View style={{flex:1, height:30, width:'100%', alignItems:'center'}}>
                        <View style={{flex:1, width:'95%', backgroundColor:"#D3D3D3"}}>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"center", justifyContent:"center"}}>
                            <Text style={{fontSize:18, textAlign:'center'}}>Order ID  </Text>
                            <Text style={{fontSize:18, textAlign:'center', fontWeight:'bold'}}>#{this.props.route.params.referenceId}</Text>
                        </View>

                        </View>
                    </View>
                    
                    <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Order Date</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>{moment(`${this.state.order_date}`).format("Do MMM YY")}</Text>
                            </View>
                    </View>

                    <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Order Status</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>{this.state.order_status}</Text>
                            </View>
                    </View>

                    {/* <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Delivery date</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>delivery_date</Text>
                            </View>
                    </View> */}

                    <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Total Amount</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ {this.state.total_amount}</Text>
                            </View>
                    </View>
                    
                    <View style={{height:20}}></View>
                    <View style={{flex:1, height:30, width:'100%', alignItems:'center'}}>
                        <View style={{flex:1, width:'95%', backgroundColor:"#D3D3D3"}}>
                        <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{fontSize:18, textAlign:'center'}}>Orderd Products ({this.state.products_list.length})</Text>
                        </View>

                        </View>
                    </View>

                    
                    <FlatList
                            data={this.state.products_list}
                            keyExtractor={item => item._id}
                            renderItem={({index, item }) => 
                                    <Card3
                                        id={index}    productid={item.productid}    title={item.titles} 
                                        sellingprice={item.sellingprice}    quantity={item.quantity}
                                        imageurl={item.imageurls}
                                    />
                            }
                        /> 
                    <View style={{height:20}}></View>
                    <View style={{flex:1, height:30, width:'100%', alignItems:'center'}}>
                        <View style={{flex:1, width:'95%', backgroundColor:"#D3D3D3"}}>
                        <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{fontSize:18, textAlign:'center'}}>Payment Summary</Text>
                        </View>

                        </View>
                    </View>

                    {/* <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Order Value</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ order_value</Text>
                            </View>
                    </View> */}
                    
                    <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Delivery Fee</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>Free</Text>
                            </View>
                    </View>

                    <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                            <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{fontSize:15}}>Payment Mode</Text>
                                <Text style={{fontSize:15, color:"#76BA1B"}}>Cash on Delivery</Text>
                            </View>
                    </View>
                    

                    <View style={{flex:1, height:1, width:'100%', marginTop:5, alignItems:'center'}}>
                        <View style={{flex:1, width:'85%', backgroundColor:"#D3D3D3"}}></View>
                    </View>
                    
                    <View style={{flex:1, width:'100%', marginTop:10, alignItems:'center'}}>
                        <View style={{flex:1, width:'85%', flexDirection:'row', justifyContent:'space-between'}}>
                            <Text style={{fontSize:20}}>Total Amount</Text>
                            <Text style={{fontSize:20, color:"#76BA1B"}}>₹ {this.state.total_amount}</Text>
                        </View>
                    </View>

                    <View style={{height:20}}></View>
                    <View style={{flex:1, height:30, width:'100%', alignItems:'center'}}>
                        <View style={{flex:1, width:'95%', backgroundColor:"#D3D3D3"}}>
                        <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                            <Text style={{fontSize:18, textAlign:'center'}}>Delivery Address</Text>
                        </View>

                        </View>
                    </View>

                    <View style={{flex:1, minHeight:20, width:'100%', marginTop:10, marginBottom:80, alignItems:'center'}}>
                        <View style={{flex:1,width:'75%', flexDirection:"row"}}> 
                            <Entypo name="location-pin" size={24} color="#76BA1B" />
                            <Text style={{fontSize:16}}>{this.state.Address} , {this.state.mobile}</Text>
                        </View>
                        
                    </View>
                </ScrollView>
            </PTRView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
        borderColor: '#fff'
    }
});
