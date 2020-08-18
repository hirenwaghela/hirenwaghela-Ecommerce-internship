import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, FlatList, AsyncStorage, Dimensions } from 'react-native';
import  { Card2 } from "../components/card"
import { MyCartHeader } from "../components/header_components";
import { Bottom1, Bottom2 } from "../components/bottom_buttons";
import axios from 'axios';
const height = Dimensions.get('screen').height;
import Constant from 'expo-constants';

export default class MyCart extends Component {

  constructor(props) {
    super(props);
    this.state = {
        userId: '',
        cart_list: [],
        refreshing: false, 

     };
  }

  fetchUserId = async() => {
      try {
      
        let userId = await AsyncStorage.getItem('userId')
        console.log('fetchUserId', userId)
        this.setState({userId})

        // Getting CartProducts List 6) API

        axios.get('https://server.dholpurshare.com/api/cart/'+ userId)
        .then((res)=>{
            // console.log('\n\nCart List:');
            // console.log(res.data.data)
            this.setState({cart_list: res.data.data})
            this.setState({refreshing:false})
        }).catch(err => {
            console.log(err)
        })
        // AsyncStorage.setItem('cart_list_length', this.state.cart_list.length);

      } catch (error) {
        console.log(err)     
      }
  }


  removeItem = (cart_id) => {
    // deleting product
    console.log('\n\nCart Id: ', cart_id)

    fetch('https://dhol.herokuapp.com/api/singlecart/' + cart_id , {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          })
            .then(response => {
              console.log('DELETED successfully')
                console.log(JSON.stringify(response))
                // this.props.navigation.navigate('MyCart')
            })
            .catch(err => {
              console.log(err);
          });
    this.handleRefresh()
  }

  componentDidMount() {
    this.setState({
      refreshing:true
    })

    this.fetchUserId()
  }

  handleRefresh = () => {
    this.setState({
      refreshing:true
    })
  this.fetchUserId()
  }


  render() {
    let toggle = this.state.cart_list.length > 0 
          ?
          (<View>
            <FlatList
                data={this.state.cart_list}
                keyExtractor={item => item._id}
                renderItem={({ item }) => 
                  <Card2 
                        id={item._id}    productid={item.productid}    title={item.title} 
                        costprice={item.costprice}   sellingprice={item.sellingprice}
                        imageurl={item.imageurl}
                        Remove={() => this.removeItem(item._id)}
                  />
                }
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
              /> 
          </View>)
          :
          (<View style={{flex:1, height:height-(55 + Constant.statusBarHeight), justifyContent:'center', alignItems:'center'}}>
              <Text style={{fontSize:20, color:'#76BA1B', textAlign:'center'}}>No Items In Cart</Text>
          </View>) 
  
    return (
      <View style={styles.containerMain}>
        <MyCartHeader goback={ () => this.props.navigation.goBack()}/>
        <ScrollView>
              {toggle}
        </ScrollView>        
        <View style={{height:50, backgroundColor:"#fff"}}></View>
        {
          this.state.cart_list.length > 0
          ?
          <Bottom1 checkout={ () => this.props.navigation.navigate('OrderDetails', this.state.cart_list)}/>
          :
          <Bottom2 addToCart={ () => this.props.navigation.navigate('Home')}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
