import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList, AsyncStorage, ActivityIndicator } from 'react-native';
import  { SmallCategoryCards } from "../components/card"
import { CategoriesHeader } from './../components/header_components';
import Constant from 'expo-constants';
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Modal from 'react-native-modal';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



export default class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [], 
            isModalVisible: false,
            Error: null 

         };
        }

    componentDidMount() {
        // fetching all category 1) API
        this.setState({isModalVisible:true})
        axios.get('https://server.dholpurshare.com/api/category')
            .then((res)=>{
                // console.log('\n\nCategory');
                // console.log(res.data.data)
                this.setState({isModalVisible:false})
                this.setState({category: res.data.data})
            }).catch(err => {
                console.log(err)
                this.setState({isModalVisible:false})
                this.setState({Error: err})
            })
}

    _refresh = () => {
        
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
        
    }

render(){
    var toggle = this.state.category.length > 0
            ?
            (<View style={{flex:1, marginVertical:20, justifyContent:'center'}}>
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
        </View>)
        :
        (
            <View style={{flex:1,height:height-(55 + Constant.statusBarHeight), alignItems:'center', justifyContent:'center'}}>
                <Text style={{fontSize:18, color:'#76BA1B', textAlign:'center'}}>No Items in Categories</Text>
            </View>
        )
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
                <CategoriesHeader/>
                    
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
                    
                <ScrollView>
                    <PTRView onRefresh={this._refresh} >
                        {toggle}
                    </PTRView>                
                </ScrollView>
        </View>
      );
  }
    
}

