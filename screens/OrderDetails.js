import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Alert, FlatList, AsyncStorage, TouchableOpacity, ActivityIndicator } from 'react-native';
import { OrderDetailsHeader } from "../components/header_components";
import { ConfirmOrder } from "../components/bottom_buttons";
import { Cart3, Card3 } from "../components/card";
import {Entypo, Octicons} from '@expo/vector-icons';
import Modal from 'react-native-modal';
import PTRView from 'react-native-pull-to-refresh';
import axios from 'axios';
var moment = require('moment');

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            isModalVisible: false,
            Error: null,
            products_list: [], 
            total_amount: 0,
            referenceId: null,
            order_value: 0,
            discount: 0,
            userId: null,
            user_details: []
         };
      }

    fetchDetails = () => {
        
        // fetching User Details  API

        this.setState({isloading: true})
        axios.get('https://server.dholpurshare.com/api/user/' + this.state.userId)
        .then((res)=>{
            // console.log('\n\nUser details');
            // console.log(res.data.data)
            this.setState({user_details: res.data.data})
            this.setState({isloading: false})
        }).catch(err => {
            console.log(err)
            this.setState({isloading: false})
            this.setState({Error: err})
        })
    }

    UserId = async() => {
        try{
            let userId = await AsyncStorage.getItem('userId')
            // console.log('My Profile\nUSER__ID: ',userId)
            this.setState({userId})
        }
        catch(err){
            console.log(err)
            this.setState({Error: err})
        }
        this.fetchDetails()
    }


    confirmOrder = (total_amount) => {

        // Confirming the order 7) API

        // console.log('\n\nOrder Confirmed')
        // console.log('userId: ', userId)
        // console.log('total_Cost: ', total_Cost)

        console.log(this.state.userId)
        try {

            this.setState({isModalVisible: true})
            axios.post('https://server.dholpurshare.com/api/order', {
                userid: this.state.userId ,
                referenceid: this.state.referenceId,
                totalcost: total_amount
            })
            .then(response => {
                console.log(response);
                setTimeout(() => {
                    this.setState({isModalVisible: false})        
                }, 1000);
                setTimeout(() => {
                    this.props.navigation.navigate('Completed', {referenceId:this.state.referenceId})
                }, 1400)

                // Alert.alert('Order Confirmed')
            })
             
        } catch (error) {
            this.setState({isModalVisible: false})
            this.setState({Error:err})
            console.log(error)
        }
    }

    calculate = () => {
        let list = Object.values(this.props.route.params)
        if(list.length > 0){
            var total_amount = 0;
            var order_value = 0;
            for(var i=0 ; i < list.length ; i++){
                //console.log(list[i].sellingprice)
                order_value += (parseInt(list[i].costprice,10)*parseInt(list[i].quantity,10))
                total_amount += (parseInt(list[i].sellingprice,10)*parseInt(list[i].quantity,10))
            }
            this.setState({total_amount})
            this.setState({order_value})
            
            var discount = ((order_value - total_amount) / order_value) *100
            this.setState({discount: Math.ceil(discount)})
        }
    }

    componentDidMount() {
        this._refresh()
    }

    _refresh = () => {
        // generating reference ID

        this.setState({
            products_list: Object.values(this.props.route.params),
            referenceId: 'REF'+ (Math.floor(Math.random() * 9000000000) + 1000000000)
        })
        this.UserId()
        this.calculate()
    }

  render() {
    
    //console.log('\n\nOrder Details:\n',this.state.products_list)

    return (
      <View style={{flex:1}}>
            
            <OrderDetailsHeader goback={ () => this.props.navigation.goBack()}/> 
                
                {/* Confirm Modal */}
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{height: height-600, width:width-100, borderRadius:20, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                        <Octicons name="checklist" size={45} color="#76BA1B" />
                        <Text style={{fontSize:20, textAlign:'center'}}>Ordered Successfully!</Text>
                    </View>
                </Modal>
                
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
        <PTRView onRefresh={this._refresh} >
            <View style={{height:20}}></View>
            <View style={{flex:1, height:30, width:'100%', alignItems:'center'}}>
                <View style={{flex:1, width:'95%', backgroundColor:"#D3D3D3"}}>
                <View style={{ flex:1, alignItems:"center", justifyContent:"center"}}>
                    <Text style={{fontSize:18, textAlign:'center'}}>Order Summary</Text>
                </View>

                </View>
            </View>
            
            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Order Date</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>{moment().format("Do MMM YY")}</Text>
                    </View>
            </View>

            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Bag ID</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>{this.state.referenceId}</Text>
                    </View>
            </View>

            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Payment Mode</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>Cash on Delivery</Text>
                    </View>
            </View>

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
                    <Text style={{fontSize:18, textAlign:'center'}}>Items in this cart ({this.state.products_list.length})</Text>
                </View>

                </View>
            </View>

            
            <FlatList
                    data={this.state.products_list}
                    keyExtractor={item => item._id}
                    renderItem={({ item }) => 
                            <Card3
                                id={item._id}    productid={item.productid}    title={item.title} 
                                sellingprice={item.sellingprice}    quantity={item.quantity}
                                imageurl={item.imageurl}
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

            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Order Value</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>₹ {this.state.order_value}</Text>
                    </View>
            </View>
            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Discount</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>{this.state.discount}%</Text>
                    </View>
            </View>
            <View style={{flex:1, width:'100%', marginTop:5, alignItems:'center'}}>
                    <View style={{flex:1, width:'80%', flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontSize:15}}>Delivery Fee</Text>
                        <Text style={{fontSize:15, color:"#76BA1B"}}>0</Text>
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
                <View style={{flex:1,width:'85%', flexDirection:"row"}}> 
                    <Entypo name="location-pin" size={24} color="#76BA1B" />
                    <Text style={{fontSize:16}}>{this.state.user_details.address} {this.state.user_details.city}  {this.state.user_details.state} {this.state.user_details.pincode}</Text>
                </View>
                <View style={{flex:1, width:'85%', alignItems:'flex-end'}}>
                <TouchableOpacity   onPress={() => this.props.navigation.navigate('MyAddress',this.state)} >
                    <Text style={{color:'#76BA1B'}}>Change Address</Text>
                </TouchableOpacity>
                </View>
            </View>
            </PTRView>
        </ScrollView>
        <ConfirmOrder    confirm={ () => this.confirmOrder(this.state.total_amount) }/>
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
