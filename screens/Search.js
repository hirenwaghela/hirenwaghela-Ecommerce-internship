import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, AsyncStorage, BackHandler, ScrollView, ActivityIndicator } from 'react-native';
import { CompletedHeader } from "../components/header_components";
import Constant from 'expo-constants';
import  { Card1, SmallCategoryCards } from "../components/card"
import { Fontisto, EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import PTRView from 'react-native-pull-to-refresh';
import axios from "axios";
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default class Search extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
        isModalVisible: false,
        userId: '',
        Error: null,
        products:[],
        searchtext:"",
        search_product:[],
     };
  }

  componentDidMount(){
    // fetching all latest product 3) API
    this.setState({isModalVisible: true})
    axios.get('https://server.dholpurshare.com/api/product')
    .then((res)=>{
        // console.log('\n\n\n Search Products')
        // console.log(res.data.data)
        var products = res.data.data
        this.setState({isModalVisible: false})
        this.setResult(products)
    }).catch(err => {
        console.log(err)
        this.setState({isModalVisible: false})
        this.setState({Error:err})
    })
    
  }


  _refresh = () => {
    
      // fetching all latest product 3) API
      axios.get('https://server.dholpurshare.com/api/product')
        .then((res)=>{
            // console.log('\n\n\n Search Products')
            // console.log(res.data.data)
            var products = res.data.data
            this.setResult(products)
        }).catch(err => {
            console.log(err)
            this.setState({Error:err})
        })
  }

  setResult = data => {
    this.setState({
        products: [...this.state.products, ...data] ,
        search_product: [...this.state.search_product, ...data]
    })
}

  updateSearch = searchtext => {
    this.setState({searchtext}, () => {
        if('' == searchtext){
            this.setState({
                products: [...this.state.search_product] ,
            });
            return;
        }
        this.state.products = this.state.search_product
                                .filter(function(item) {
                                    return item.title.toUpperCase().includes(searchtext.toUpperCase());
                                })
                                .map(function({ _id,title,costprice,sellingprice,imageurl }) {
                                    return { _id,title,costprice,sellingprice,imageurl } ;
                                })
    })
}

  render() {

    let _productList = this.state.products.map(item=>
      <Card1 key={item._id} id={item._id}    title={item.title}    imageurl={item.imageurl}    
                                    costprice={item.costprice}    sellingprice={item.sellingprice}
                                    BuyNow={ () => this.props.navigation.navigate('Product_Description',
                                                                {
                                                                    category_products_id:item._id
                                                                }
                                    )}
                            />
      )

    return (
      <View>
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
          <View style={{
              width:'100%',
              marginVertical:5,
              alignItems: 'center',
          }}>
             
            <View style={{flexDirection:"row" ,height: 35, width:width-60, borderRadius: 25, backgroundColor: "#fff"}}>
              <TextInput
                  style={{
                      flex:0.88,
                      height: 35,
                      width:width-70,
                      fontSize: 17,
                      color: "#010101",
                      borderRadius: 25,
                      backgroundColor: "#fff",
                      paddingHorizontal:15}}
                      autoCapitalize="none"
                      placeholder="Search"
                      onChangeText={this.updateSearch}
                      value={this.state.searchtext}
                      autoFocus={false}
              ></TextInput>
              <View style={{flex:0.12, justifyContent:'center'}}>
                  <EvilIcons name="search" size={28} color="#A9A9A9" />
              </View>
            </View>
             
          </View>
        </View>

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
        <PTRView onRefresh={this._refresh} >
          <ScrollView>
            <View style={{flex:1}}>
              {_productList}
            </View> 
          </ScrollView> 
        </PTRView>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
