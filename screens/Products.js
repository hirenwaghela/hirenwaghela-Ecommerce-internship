import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import  { Card1 } from "../components/card";
import Header from "../components/header_search";
import axios from 'axios';
const width = Dimensions.get('screen').width

export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        category_products: [],

     };
  }

  componentDidMount() {
        
        // fetching all category products
        axios.get('https://server.dholpurshare.com/api/product/category/' + this.props.route.params.category_products_id)
            .then((res)=>{
                // console.log('\n\nProducts By Category');
                // console.log(res.data.data)
                this.setState({category_products: res.data.data})
            }).catch(err => {
                console.log(err)
            })  
  }

  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
            <Header navigation={ () => this.props.navigation.openDrawer()}/>
            <ScrollView>
                <View style={{paddingLeft:20, paddingTop:20, paddingBottom:10, height:40, justifyContent:"center"}}>
                    <Text style={{fontSize:25 }}>{this.props.route.params.category_title}</Text>
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
                        //<Card1  BuyNow={ () => this.props.navigation.navigate('Product_Description')}/>
                    }

                />

            </ScrollView>
        </View>
      );
  }
    
}

