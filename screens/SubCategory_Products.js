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
        sub_category_products: []

     };
  }

  componentDidMount() {

        // fetching all sub-category products 
        axios.get('https://server.dholpurshare.com/api/product/sub/' + this.props.route.params.sub_category_products_id)
            .then((res)=>{
                this.setState({sub_category_products: res.data.data})
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
                        <Text style={{fontSize:25 }}>{this.props.route.params.sub_category_title}</Text>
                    </View> 
                </View>

                <FlatList
                    data={this.state.sub_category_products}
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

