import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, AsyncStorage } from 'react-native';
import  { MyOrdersCard } from "../components/card"
import { MyOrdersHeader } from "../components/header_components";
import axios from 'axios';

export default class MyOrders extends Component {

  constructor(props) {
    super(props);
    this.state = {
        orders_list: [], 
        
     };
  }

  fetchOrders = async() => {
    try {

      let userId = await AsyncStorage.getItem('userId')
      console.log('fetchUserId', userId)
      //this.setState({userId})

      // Getting Orders List 8) API

      axios.get('https://server.dholpurshare.com/api/order/'+ userId)
      .then((res)=>{
          console.log('\n\nOrders List:');
          console.log(res.data.data)
          this.setState({orders_list: res.data.data})
      }).catch(err => {
          console.log(err)
      })

    } catch (error) {
      console.log(err)     
    }
}

  componentDidMount() {
    this.fetchOrders()
}

  render() {
    return (
      <View style={styles.containerMain}>
        <MyOrdersHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
            <View style={{height:8, backgroundColor:"#fff"}}></View>

            {/* Orders List */}
            <FlatList
                data={this.state.orders_list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => 
                  <MyOrdersCard status={item.status} titles={item.titles} totalcost={item.totalcost}
                                imageurls={item.imageurls} createdDate={item.updatedAt}
                  />
                        // <Card3
                        //     id={item._id}    productid={item.productid}    title={item.title} 
                        //     sellingprice={item.sellingprice}
                        //     imageurl={item.imageurl}
                        // />
                }
              /> 

            {/* <MyOrdersCard status='Processing'/>
            <MyOrdersCard status='Shipped'/>
            <MyOrdersCard status='Delivered'/>
            <MyOrdersCard status='Processing'/>
            <MyOrdersCard status='Delivered'/> */}
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
