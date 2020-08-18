import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, FlatList, AsyncStorage } from 'react-native';
import  { MyOrdersCard } from "../components/card"
import { MyOrdersHeader } from "../components/header_components";
import axios from 'axios';
import Constant from 'expo-constants';
const height = Dimensions.get('screen').height;
var moment = require('moment');

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
    var toggle = this.state.orders_list.length > 0  
            ?
            (
              <View style={{flex:1}}>
              <FlatList
                  data={this.state.orders_list}
                  keyExtractor={item => item._id}
                  renderItem={({ item }) => 
                    <MyOrdersCard status={item.status} titles={item.titles} totalcost={item.totalcost}
                                  imageurls={item.imageurls} createdDate={moment(item.updatedAt).add('2','days').format('Do MMM YYYY')}
                                  referenceid={item.referenceid}
                    />

                  }
                /> 
            </View>
            )
          :
          (
            <View style={{flex:1,height:height-(55 + Constant.statusBarHeight), alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:20, color:'#76BA1B', textAlign:'center'}}>No Orders</Text>
            </View>
          )

    return (
      <View style={styles.containerMain}>
        <MyOrdersHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
          {/* Orders List */}
          {toggle}  
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
