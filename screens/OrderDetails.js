import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, Alert, FlatList, AsyncStorage } from 'react-native';
import { OrderDetailsHeader } from "../components/header_components";
import { ConfirmOrder } from "../components/bottom_buttons";
import { Cart3, Card3 } from "../components/card";
import {Entypo} from '@expo/vector-icons';
import axios from 'axios';

const width = Dimensions.get('screen').width

export default class Completed extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products_list: [], 
            total_amount: 0,
            order_value: 0,
            discount: 0
         };
      }


    confirmOrder = async(total_amount) => {

        // Confirming the order 7) API

        // console.log('\n\nOrder Confirmed')
        // console.log('userId: ', userId)
        // console.log('total_Cost: ', total_Cost)

        // generating reference ID
        var referenceId = Math.floor(Math.random() * 9000000000) + 1000000000;
        // console.log(referenceId)
        var userId = await AsyncStorage.getItem('userId')
        console.log(userId)
        try {
            axios.post('https://server.dholpurshare.com/api/order', {
                userid: userId ,
                referenceid: referenceId,
                totalcost: total_amount
            })
            .then(function (response) {
                console.log(response);
            })
            Alert.alert('Order Confirmed')
            this.props.navigation.navigate('Completed')
            
        } catch (error) {
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
                console.log(list[i].sellingprice)
                order_value += parseInt(list[i].costprice,10)
                total_amount += parseInt(list[i].sellingprice,10)
            }
            this.setState({total_amount})
            this.setState({order_value})
            
            var discount = ((order_value - total_amount) / order_value) *100
            this.setState({discount: Math.ceil(discount)})
        }
    }

    componentDidMount() {
        this.setState({
            products_list: Object.values(this.props.route.params)
        })
        this.calculate()
    }

  render() {
    
    // console.log('\n\nOrder Details:\n',this.state.products_list)

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
                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ {this.state.total_amount}</Text>
            </View>
        </View>
        
        <View style={{marginTop:25, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Items in this cart ({this.state.products_list.length})</Text>
        </View>

            {/* Ordered Products List */}
        <FlatList
                data={this.state.products_list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => 
                        <Card3
                            id={item._id}    productid={item.productid}    title={item.title} 
                            sellingprice={item.sellingprice}
                            imageurl={item.imageurl}
                        />
                }
              /> 

        <View style={{marginTop:15, marginHorizontal:20 ,height:30, alignItems:"center", justifyContent:"center",  backgroundColor:"#D3D3D3"}}>
            <Text style={{fontSize:18}}>Payment Summary</Text>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:15}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Order Value</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>₹ {this.state.order_value}</Text>
            </View>
        </View>

        <View style={{flexDirection:"row", paddingHorizontal:35, marginTop:3}}>
            <View style={{flex:1, marginRight:40}}>
                <Text style={{fontSize:15}}>Discount</Text>
            </View>
            <View style={{flex:1, alignItems:"flex-end"}}>
                <Text style={{fontSize:15, color:"#76BA1B"}}>{this.state.discount}%</Text>
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
                <Text style={{fontSize:20, color:"#76BA1B"}}>₹ {this.state.total_amount}</Text>
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
        <ConfirmOrder    confirm={ () => this.confirmOrder(this.state.total_amount) }
        
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
