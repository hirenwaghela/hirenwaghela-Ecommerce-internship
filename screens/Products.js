import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, AsyncStorage, 
         ScrollView, FlatList, ActivityIndicator } from 'react-native';
import  { Card1, SmallCategoryCards } from "../components/card"
import Header_Search from "../components/header_search";
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        userId: '',
        isModalVisible: false,
        Error: null,
        category_products: [],
        sub_categories: [],
        cart_list: []

     };
  }

  componentDidMount() {  
        // fetching all category products 2) API

        this.setState({isModalVisible: true})
        axios.get('https://server.dholpurshare.com/api/product/category/' + this.props.route.params.category_products_id)
        .then((res)=>{
            // console.log('\n\nProducts By Category');
            // console.log(res.data.data)
            this.setState({isModalVisible:false})
            this.setState({category_products: res.data.data})
        }).catch(err => {
            console.log('1')
            this.setState({isModalVisible:false})
            this.setState({Error:err})
        })  
        this.UserId()
        
  }

  UserId = async() => {
    try{
        let userId = await AsyncStorage.getItem('userId')
        console.log('My Profile\nUSER__ID: ',userId)
        this.setState({userId})
    }
    catch(err){
        console.log('2 hai')
        this.setState({Error: err})
    }
    this._refresh()
  }

  _refresh = () => {
            //fetching Cart List
                
            axios.get('https://server.dholpurshare.com/api/cart/'+ this.state.userId)
            .then((res)=>{
                this.setState({cart_list: res.data.data})
            }).catch(err => {
                console.log('3')
                this.setState({Error: err})
            })
            
          // fetching all category products 2) API

          axios.get('https://server.dholpurshare.com/api/product/category/' + this.props.route.params.category_products_id)
              .then((res)=>{
                  // console.log('\n\nProducts By Category');
                  // console.log(res.data.data)
                  this.setState({category_products: res.data.data})
              }).catch(err => {
                  console.log('4')
                  this.setState({Error:err})
              })  
  
          // fetching all sub-categories 
          axios.get('https://server.dholpurshare.com/api/category/' + this.props.route.params.category_products_id)
              .then((res)=>{
                  this.setState({sub_categories: res.data.data})
              }).catch(err => {
                  console.log('5')
                  this.setState({Error:err})
              })
  }

  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            
                <Header_Search navigation={ () => this.props.navigation.openDrawer()}
                               search={ () => this.props.navigation.navigate('Search')}
                               cartIcon = { () => this.props.navigation.navigate('MyCart')}
                               cart_list_length = {this.state.cart_list.length}
                />
                <ScrollView>
                <PTRView onRefresh={this._refresh} >
                    {/* Showing Loader */}
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={{height: height-680, width:width-270, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                            <View style={{alignItems:'center', justifyContent:'center'}}>
                            <ActivityIndicator size='large' color='#76BA1B'/>
                            </View>
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
                    
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.05}}></View>
                        <View style={{flex:0.95, height:40, justifyContent:'center'}}>
                            <Text style={{fontSize:25 }}>{this.props.route.params.category_title}</Text>
                        </View> 
                    </View>
                    
                    <View style={{flex:1, marginVertical:20, justifyContent:'center'}}>
                        <FlatList
                            data={this.state.sub_categories}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => 
                                <View style={{justifyContent:'space-around'}}>
                                    <SmallCategoryCards 
                                            id={item._id} title={item.subcategory} 
                                            imageurl={item.imageurl}
                                            onPress={() => this.props.navigation.navigate('SubCategory_Products',
                                                                {
                                                                    sub_category_title: item.subcategory,
                                                                    sub_category_products_id: item._id
                                                                })}
                                    />
                                </View>
                            }
                            numColumns={3}
                        />
                    </View>

                    <FlatList
                        data={this.state.category_products.slice(0,10)}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => 
                            <Card1  id={item._id}    title={item.title}    imageurl={item.imageurl}    
                                    costprice={item.costprice}    sellingprice={item.sellingprice}
                                    BuyNow={ () => this.props.navigation.navigate('Product_Description',
                                                                {
                                                                category_products_id:item._id
                                                                })
                                            }
                            />
                        }

                    />
                </PTRView>
                </ScrollView>
            
        </View>
      );
  }
    
}

