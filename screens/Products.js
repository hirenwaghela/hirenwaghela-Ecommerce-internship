import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import  { Card1, SmallCategoryCards } from "../components/card"
import Header_Search from "../components/header_search";
import axios from 'axios';
const width = Dimensions.get('screen').width

export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        category_products: [],
        sub_categories: []

     };
  }

  componentDidMount() {
        
        // fetching all category products 2) API
        axios.get('https://server.dholpurshare.com/api/product/category/' + this.props.route.params.category_products_id)
            .then((res)=>{
                console.log('\n\nProducts By Category');
                console.log(res.data.data)
                this.setState({category_products: res.data.data})
            }).catch(err => {
                console.log(err)
            })  

        // fetching all sub-categories 
        axios.get('https://server.dholpurshare.com/api/category/' + this.props.route.params.category_products_id)
            .then((res)=>{
                this.setState({sub_categories: res.data.data})
            }).catch(err => {
                console.log(err)
            })  
        
  }

  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Header_Search navigation={ () => this.props.navigation.openDrawer()}
                           cartIcon = { () => this.props.navigation.navigate('MyCart')}
            />
            <ScrollView>
                
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
                            <View style={{flex:1, justifyContent:'space-around'}}>
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
                    data={this.state.category_products}
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

            </ScrollView>
        </View>
      );
  }
    
}

