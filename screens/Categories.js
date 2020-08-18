import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView, FlatList, AsyncStorage } from 'react-native';
import  { SmallCategoryCards } from "../components/card"
import { CategoriesHeader } from './../components/header_components';
import Constant from 'expo-constants';
import axios from 'axios';
const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: [], 
            isloading: false, 

         };
      }

      localstoragevariables = async() => {
        let isLogIn = await AsyncStorage.getItem('isLogIn')
        let mobile = await AsyncStorage.getItem('mobile')
        let token = await AsyncStorage.getItem('token')
        let userId = await AsyncStorage.getItem('userId')
        // let isLogIn = await AsyncStorage.getItem('isLogIn')
        console.log('Categories')
        console.log('isLogIn ', isLogIn)
        console.log('mobile ', mobile)
        console.log('token ',token)
        console.log('userId ',userId)
        // console.log('isLogIn\n',isLogIn)
      }

    componentDidMount() {

        this.localstoragevariables()           // getting the localStorage variables

        this.setState({isloading: true})
        
        // fetching all category 1) API
        axios.get('https://server.dholpurshare.com/api/category')
            .then((res)=>{
                console.log('\n\nCategory');
                console.log(res.data.data)
                this.setState({category: res.data.data})
            }).catch(err => {
                console.log(err)
            })
        
}

render(){
    var toggle = this.state.category !== [] 
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
            <ScrollView>
                {toggle}                
            </ScrollView>
        </View>
      );
  }
    
}

