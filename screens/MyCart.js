import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, AsyncStorage } from 'react-native';
import  { Card2 } from "../components/card"
import { MyCartHeader } from "../components/header_components";
import { Bottom1 } from "../components/bottom_buttons";
import axios from 'axios';

export default class MyCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userId: '',
        cart_list: [],
        isloading: false, 

     };
  }

  fetchUserId = async() => {
      try {
        this.setState({isloading: true})

        let userId = await AsyncStorage.getItem('userId')
        console.log('fetchUserId', userId)
        //this.setState({userId})

        // Getting CartProducts List 6) API

        axios.get('https://server.dholpurshare.com/api/cart/'+ userId)
        .then((res)=>{
            console.log('\n\nCart List:');
            console.log(res.data.data)
            this.setState({cart_list: res.data.data})
        }).catch(err => {
            console.log(err)
        })

      } catch (error) {
        console.log(err)     
      }
  }

  componentDidMount() {

    this.fetchUserId()
  }


  render() {
  
    return (
      <View style={styles.containerMain}>
        <MyCartHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
            <View style={{height:8, backgroundColor:"#fff"}}></View>
              <FlatList
                data={this.state.cart_list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => 
                  <Card2 
                        id={item._id}    productid={item.productid}    title={item.title} 
                        costprice={item.costprice}   sellingprice={item.sellingprice}
                        imageurl={item.imageurl}
                  />
                }
              /> 
        </ScrollView>        
        <View style={{height:50, backgroundColor:"#fff"}}></View>
        <Bottom1 checkout={ () => this.props.navigation.navigate('OrderDetails', this.state.cart_list)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
