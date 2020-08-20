import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Alert, AsyncStorage, ActivityIndicator } from 'react-native';
import {AntDesign, MaterialCommunityIcons, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constant from 'expo-constants';
import { AddToCart } from "../components/bottom_buttons";
import axios from 'axios';
import PTRView from 'react-native-pull-to-refresh';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


export default class Product_Description extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            isModalVisible: false,
            product_details: [],
            quantity: 1,
            userId:'',
            Error: null

         };
      }

      componentDidMount() {
        this._refresh()
      }


      _refresh = () => {
          // fetching userId
        this.UserId()
        // fetching all product details 4) API
        axios.get('https://server.dholpurshare.com/api/product/' + this.props.route.params.category_products_id)
        .then((res)=>{
            // console.log('\n\nProduct details');
            // console.log(res.data.data)
            this.setState({product_details: res.data.data})
        }).catch(err => {
            console.log(err)
            this.setState({Error: err})
        })
      }

      UserId = async() => {
        try{
            let userId = await AsyncStorage.getItem('userId')
            console.log('Product Description\nUSER__ID: ',userId)
            this.setState({userId})
        }
        catch(err){
            console.log(err)
            this.setState({Error: err})
        }
      }

      addTocart = (userId,productId) => {

        // Adding Product to Cart 5) API

        // console.log('Product Added')
        // console.log('userId: ', userId)
        // console.log('productId: ', productId)
        this.setState({isModalVisible:true})
        axios.post('https://server.dholpurshare.com/api/cart', {
            userid: userId ,
            productid: productId ,
            quantity: this.state.quantity
          })
          .then(response => {
//            console.log(response);
            setTimeout(() => {
                this.setState({isModalVisible:false})   
            }, 1000);
          })
          .catch(err => {
            this.setState({isModalVisible:false})
            console.log(err);
            this.setState({Error:err})
        });
          
      }

  render() {
    return (
      <View style={styles.containerMain}>
        
        <View style={{
            paddingTop:Constant.statusBarHeight,
            top:0,
            left:0,
            right:0,
            height:55 + Constant.statusBarHeight,
            backgroundColor:"#76BA1B",            
        }}>
            <View style={{
                flex:1,
                flexDirection:"row",
                alignItems:'center',
               
            }}>
                <TouchableOpacity style={{flex:0.12, alignItems:'center'}}
                                  onPress={() => this.props.navigation.goBack()}>
                    <AntDesign name="left" size={30} color="white" />
                </TouchableOpacity>
                <View style={{flex:0.88, alignItems:'flex-start'}}>
                    <Text style={{fontSize:22, textAlign:'center', color:"white"}}>{this.state.product_details.title}</Text>
                </View>

            </View>
        </View>
            
            {/* Add Modal */}
            <Modal isVisible={this.state.isModalVisible}>
              <View style={{height: height-600, width:width-150, borderRadius:20, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                <ActivityIndicator size='large' color='#76BA1B'/>
                <Text style={{fontSize:20, textAlign:'center', marginTop:5}}>Adding to cart . . .</Text>
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

        <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
        <PTRView onRefresh={this._refresh} >
            {/* {this.state.isloading ?
                <View style={{height:32, alignItems:'center', justifyContent:'center', backgroundColor:'#fff', elevation:3}}>
                    <Text style={{fontSize:18, color:'#76BA1B'}}>Adding to cart . . .</Text>
                </View>
            :null
            } */}
            <View style={{flex:1, height:230, backgroundColor:"#fff", elevation:3, alignItems:'center', justifyContent:'center'}}>
                <View style={{width:150, height:200}}>
                    <Image
                        style={styles.image}
                        source={{uri:`${this.state.product_details.imageurl}`}}
                    />
                    </View>
            </View>
            <View style={{flex:1, minHeight:200, backgroundColor:"#fff"}}>
                <View style={{flex:0.2, marginTop:10}}>
                    <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                        <View style={{flex:0.05}}></View>
                        <View style={{flex:0.95}}><Text style={{width:'100%', fontSize:20}}>{this.state.product_details.title}</Text></View>
                    </View>
                </View>
                <View style={{flex:0.2}}>
                    <View style={{flex:1,flexDirection:'row',}}>
                        <View style={{flex:0.05}}></View>
                        <View style={{flex:0.95}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.2}}><Text style={{fontSize:20, color:"#76BA1B"}}>₹ {this.state.product_details.sellingprice}</Text></View>
                                <View style={{flex:0.8}}>
                                    <View style={{flex:1}}>
                                        <View style={{flex:0.5, alignItems:'center', flexDirection:'row'}}>
                                            <Text style={{fontSize:12,}}>MRP </Text>
                                            <Text style={{fontSize:12, textDecorationLine:'line-through'}}>{this.state.product_details.costprice} </Text>
                                            <Text style={{fontSize:14, color:'red'}}>  ₹ {this.state.product_details.costprice-this.state.product_details.sellingprice}  Off </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                    </View>
                </View>                
               
                <View style={{flex:0.2}}>
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{flex:0.05}}></View>
                        <View style={{flex:0.95, flexDirection:'row'}}>
                            {this.state.quantity < 2
                                ?
                                (
                                    <TouchableOpacity activeOpacity={0.8}
                                                style={{height:'100%', width:40, alignItems:"center", justifyContent:'center', borderRadius:3, elevation:5, backgroundColor:'#D3D3D3'}}>
                                        <AntDesign name="minus" size={24} color="black" />
                                    </TouchableOpacity>
                                )
                                :
                                (
                                    <TouchableOpacity   activeOpacity={0.8}   
                                                        onPress={()=>this.setState({quantity: this.state.quantity - 1})}
                                                style={{height:'100%', width:40, alignItems:"center", justifyContent:'center', borderRadius:3, elevation:5, backgroundColor:'#fff'}}>
                                        <AntDesign name="minus" size={24} color="black" />
                                    </TouchableOpacity>
                                )
                            }
                            
                            <View 
                                style={{height:'100%', width:40, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', borderColor:'#D3D3D3', borderRightWidth:1, borderLeftWidth:1, elevation:5}}>
                                    <Text style={{fontSize:17, textAlign:'center'}}>{this.state.quantity}</Text>
                            </View>
                            <TouchableOpacity   activeOpacity={0.8}
                                                onPress={()=>this.setState({quantity: this.state.quantity + 1})} 
                                                style={{height:'100%', width:40, alignItems:"center", justifyContent:'center', borderRadius:3, elevation:5, backgroundColor:'#fff'}}>
                                <AntDesign name="plus" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{flex:0.2}}>
                    <View style={{flex:1}}>
                        {/* <View style={{flex:0.6}}> */}
                            {/* <View style={{flex:1, flexDirection:'row'}}>
                                <View style={{flex:0.05}}></View>
                                <View style={{flex:0.95}}>
                                    <LinearGradient colors={["#76BA1B", "#4C9A2A"]} style={{height:32,width:'35%', borderRadius:20, elevation:5}}>
                                        <TouchableOpacity  onPress={() => this.addTocart(this.state.userId, this.state.product_details._id)}
                                                           activeOpacity={0.8} style={{ justifyContent:"center", height:32}}>
                                            <Text style={{fontSize:17, color:"#fff", textAlign:'center' }}>Buy Now</Text>
                                        </TouchableOpacity>
                                    </LinearGradient>
                                </View>
                            </View> */}
                        {/* </View> */}
                        <View style={{flex:1}}>
                            <View style={{flex:1, flexDirection:'row', alignItems:'flex-end'}}>
                                <View style={{flex:0.05}}></View>
                                <View style={{flex:0.9}}>
                                    <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                                        <Text style={{fontSize:20}}>You Pay</Text>
                                        <Text style={{fontSize:20}}>₹ {parseInt(this.state.product_details.sellingprice,10) * this.state.quantity}</Text>
                                    </View>
                                </View>
                                <View style={{flex:0.05}}></View>
                            </View>
                        </View>
                    </View>
                </View>
                
            </View>
                
            <View style={{backgroundColor:'#D3D3D3', height:1}}></View>
            <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                <View style={{flex:0.05}}></View>
                <View style={{flex:0.9, marginBottom:50}}>
                    <Text style={{fontSize:16, color:'grey'}}>Free delivery and cash on delivery available</Text>
                    <Text></Text>
                    <Text style={{fontSize:20}}>Description</Text>
                    <Text style={{fontSize:16, color:'grey'}}>{this.state.product_details.description}</Text>
                </View>
                <View style={{flex:0.05}}></View>
            </View>
            </PTRView>
        </ScrollView>
        <AddToCart  addProduct={ () => this.addTocart(this.state.userId, this.state.product_details._id)} />        
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
  image:{
    flex: 1,
    height: null, 
    width: null, 
    resizeMode: 'contain', 
    borderWidth: 0.1, 
    borderColor: '#fff'
},
});
