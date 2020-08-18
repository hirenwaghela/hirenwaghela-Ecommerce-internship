import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList, AsyncStorage } from 'react-native';
import  { Swiper2 } from "../components/Swiper" ;
import  { Card1, SmallCategoryCards } from "../components/card"
import Header_Search from "../components/header_search"
import axios from 'axios';
const width = Dimensions.get('screen').width


export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            category: [], 
            category_products: null,
            latest_products: [],
            cart_list: []

         };
      }

      localstoragevariables = async() => {
        let isLogIn = await AsyncStorage.getItem('isLogIn')
        let mobile = await AsyncStorage.getItem('mobile')
        let token = await AsyncStorage.getItem('token')
        let userId = await AsyncStorage.getItem('userId')
        // let isLogIn = await AsyncStorage.getItem('isLogIn')
        console.log('\n\nHome\n')
        console.log('isLogIn ', isLogIn)
        console.log('mobile ', mobile)
        console.log('token ',token)
        console.log('userId ',userId)
        // console.log('isLogIn\n',isLogIn)
        
        //fetching Cart List
        axios.get('https://server.dholpurshare.com/api/cart/'+ userId)
        .then((res)=>{
            this.setState({cart_list: res.data.data})
        }).catch(err => {
            console.log(err)
        })
        // AsyncStorage.setItem('cart_list_length', this.state.cart_list.length);

      }

    componentDidMount() {

        this.localstoragevariables()           // getting the localStorage variables
        
        // fetching all category 1) API
        axios.get('https://server.dholpurshare.com/api/category')
            .then((res)=>{
                // console.log('\n\nCategory');
                // console.log(res.data.data)
                this.setState({category: res.data.data})
            }).catch(err => {
                console.log(err)
            })
        
        // fetching all latest product 3) API
        axios.get('https://server.dholpurshare.com/api/product')

            .then((res)=>{
                // console.log('\n\n\n Latest Products')
                // console.log(res.data.data)
                this.setState({latest_products: res.data.data})
            }).catch(err => {
                console.log(err)
            })

            console.log('\n\n'+this.state.cart_list.length)

}

render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Header_Search  navigation={ () => this.props.navigation.openDrawer()}  
                            cartIcon = { () => this.props.navigation.navigate('MyCart')}
                            cart_list_length = {this.state.cart_list.length}
            />
            <ScrollView>
                <Swiper2 image1=""/>
                <View style={{flex:1, marginVertical:20, justifyContent:'center'}}>
                    <FlatList
                        data={this.state.category}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => 
                            <View style={{flex:1, justifyContent:'space-around'}}>
                                <SmallCategoryCards 
                                        id={item._id} title={item.category} 
                                        imageurl={item.imageurl}
                                        onPress={() => this.props.navigation.navigate('Products',
                                                            {
                                                                category_title: item.category,
                                                                category_products_id:item._id
                                                            })}
                                />
                            </View>
                        }
                        numColumns={3}
                    />
                </View>
                <View style={{paddingLeft:20, height:40, justifyContent:"center"}}>
                    <Text style={{fontSize:20, }}>Latest Product</Text>
                </View>
                
                <FlatList
                        data={this.state.latest_products}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => 
                            <Card1 id={item._id}    title={item.title}    imageurl={item.imageurl}    
                                    costprice={item.costprice}    sellingprice={item.sellingprice}
                                    BuyNow={ () => this.props.navigation.navigate('Product_Description',
                                                                {
                                                                    category_products_id:item._id
                                                                }
                                    )}
                            />
                        }

                    />
            </ScrollView>
        </View>
      );
  }
    
}

