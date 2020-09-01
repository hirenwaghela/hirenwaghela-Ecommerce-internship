import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, BackHandler, ScrollView, FlatList, AsyncStorage, ActivityIndicator, NativeModules } from 'react-native';
import { Swiper2 } from "../components/Swiper" ;
import  { Card1, SmallCategoryCards } from "../components/card"
import Header_Search from "../components/header_search";
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

let Name = ''
let Mobile = ''

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            //refreshing: false,
            Error: null,
            userId: '',
            swiper: [],
            category: [], 
            category_products: null,
            latest_products: [],
            cart_list: []

         };
      }

      localstoragevariables = async() => {
        let isLogIn = await AsyncStorage.getItem('isLogIn')
        let mobile = await AsyncStorage.getItem('mobile')
        let name = await AsyncStorage.getItem('name')
        let token = await AsyncStorage.getItem('token')
        let userId = await AsyncStorage.getItem('userId')
        // let isLogIn = await AsyncStorage.getItem('isLogIn')
        console.log('\n\nHome\n')
        console.log('isLogIn ', isLogIn)
        console.log('mobile ', mobile)
        console.log('token ',token)
        console.log('userId ',userId)
        // console.log('isLogIn\n',isLogIn)

        Name = name
        Mobile = mobile
        
        //fetching Cart List
        
        axios.get('https://server.dholpurshare.com/api/cart/'+ userId)
        .then((res)=>{
            this.setState({cart_list: res.data.data})
        }).catch(err => {
            console.log(err)
            this.setState({Error: err})
        })
        // AsyncStorage.setItem('cart_list_length', this.state.cart_list.length);

        this.callapis()

      }

    callapis = () => {
        // fetching swiper list
        axios.get('https://server.dholpurshare.com/api/brand')
            .then((res)=>{
                // console.log('\n\nSwiper');
                console.log(res.data.data)
                this.setState({swiper: res.data.data})
            }).catch(err => {
                console.log(err)
                this.setState({Error: err})
            })

        // fetching all category 1) API
        axios.get('https://server.dholpurshare.com/api/category')
            .then((res)=>{
                // console.log('\n\nCategory');
                // console.log(res.data.data)
                this.setState({category: res.data.data})
            }).catch(err => {
                console.log(err)
                this.setState({Error: err})
            })
        
        // fetching all latest product 3) API
        // this.setState({refreshing: true})
        axios.get('https://server.dholpurshare.com/api/product')

            .then((res)=>{
                // console.log('\n\n\n Latest Products')
                // console.log(res.data.data)
                this.setState({latest_products: res.data.data})
                this.setState({refreshing: false})
            }).catch(err => {
                console.log(err)
                // this.setState({refreshing: false})
                this.setState({Error: err})
            })

            console.log('\n\n'+this.state.cart_list.length)
    }

    componentDidMount() {
        this._refresh()
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      }
    
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.navigate('Home');
    return true;
    }

    _refresh = () => {
        this.localstoragevariables()           // getting the localStorage variable
         
    }

render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            
                <Header_Search  navigation={ () => this.props.navigation.openDrawer()}
                                search={ () => this.props.navigation.navigate('Search')}  
                                cartIcon = { () => this.props.navigation.navigate('MyCart')}
                                cart_list_length = {this.state.cart_list.length}
                />
                <PTRView onRefresh={this._refresh} >
                <ScrollView>
    
                    {/* Showing Error */}
                    <Modal isVisible={this.state.Error != null}>
                    <View style={{height: height-680, width:width-160, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                        <View style={{alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:17, textAlign:'center'}}>Oops!</Text>
                        <Text style={{fontSize:17, textAlign:'center'}}>Something went wrong</Text>
                        </View>
                    </View>
                    </Modal>

                    <Swiper2 swiper_array={this.state.swiper}   navigation={this.props.navigation}/>

                    <View style={{flex:1, marginVertical:20, justifyContent:'center'}}>
                        <FlatList
                            data={this.state.category.slice(0,6)}
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
                            data={this.state.latest_products.slice(0,20)}
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
                            // refreshing={this.state.refreshing}
                            // onRefresh={this._refresh}

                        />
                        
                </ScrollView>
                </PTRView>
        </View>
      );
  }
    
}

export {Name , Mobile}