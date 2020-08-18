import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, AsyncStorage } from 'react-native';
import { DrawerHeader } from "./header_components";
import { DrawerBottom } from "./bottom_buttons";
import {Fontisto} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const width = Dimensions.get('screen').width

export default class Drawer_Component extends Component {

  constructor(props) {
    super(props);
    this.state = {
        mobile: '',
     };
  }


changeLogIn = async() => {
    console.log('\n\nLogout')
    await AsyncStorage.removeItem('isLogIn')
    await AsyncStorage.removeItem('mobile')
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userId')

    let isLogIn = await AsyncStorage.getItem('isLogIn')
    let mobile = await AsyncStorage.getItem('mobile')
    let token = await AsyncStorage.getItem('token')
    let userId = await AsyncStorage.getItem('userId')

    console.log('Outside app\n')
    console.log('isLogIn ', isLogIn)
    console.log('mobile ', mobile)
    console.log('token ', token)
    console.log('userId ', userId)

    this.props.navigation.navigate('AuthStack')
}

  fetchMobile = async() => {
    try{
        let mobile = await AsyncStorage.getItem('mobile')
        console.log('Drawer\nMobile: ',mobile)
        this.setState({mobile})
    }
    catch(err){
        console.log(err)
    }
  }

  componentDidMount() {
    this.fetchMobile()
  }

  render() {
    return (
        <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
        <DrawerHeader mobile={this.state.mobile}/>
        <ScrollView style={{paddingTop:25}}>

          <TouchableOpacity onPress={ () => this.props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.13 }}></View>
            <View style={{ flex:0.87, flexDirection:'row', }}>
              <Fontisto name="shopping-bag" size={20} color="#76BA1B" />
              <Text style={{fontSize:20, textAlign:'center'}}>   Dashboard</Text>
            </View>
          </TouchableOpacity>

          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>

          <TouchableOpacity onPress={ () => this.props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.12 }}></View>
            <View style={{ flex:0.88, flexDirection:'row', }}>
              <Ionicons name="md-cart" size={28} color="#76BA1B" />
              <Text style={{fontSize:20, textAlign:'center'}}>  My Orders</Text>
            </View>     
          </TouchableOpacity>

          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
          
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('MyCart') } activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.12 }}></View>
            <View style={{ flex:0.88, flexDirection:'row', }}>
              <Ionicons name="md-cart" size={28} color="#76BA1B" />
              <Text style={{fontSize:20, textAlign:'center'}}>  My Cart</Text>
            </View>
          </TouchableOpacity>
          
          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>

          <TouchableOpacity onPress={ () => this.props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.12 }}></View>
            <View style={{ flex:0.88, flexDirection:'row', }}>
              <FontAwesome name="user-circle" size={22} color="#76BA1B"/>
              <Text style={{fontSize:20, textAlign:'center'}}>  My Profile</Text>
            </View>
          </TouchableOpacity>

          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
          <TouchableOpacity activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.12 }}></View>
            <View style={{ flex:0.88, flexDirection:'row', }}>
              <FontAwesome name="phone-square" size={24} color="#76BA1B"/>
              <Text style={{fontSize:20, textAlign:'center'}}>  Contact Us</Text>
            </View>
          </TouchableOpacity>
          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
          <TouchableOpacity activeOpacity={0.4} 
                            style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
            <View style={{ flex:0.12 }}></View>
            <View style={{ flex:0.88, flexDirection:'row', }}>
              <FontAwesome name="share" size={24} color="#76BA1B"/>
              <Text style={{fontSize:20, textAlign:'center'}}>  Share</Text>
            </View>
          </TouchableOpacity>
          <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
        </ScrollView>
        <DrawerBottom navigation={()=>this.changeLogIn()}/>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({

});


// const CustomDrawer = (props) => {
    
//     return(
//           <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
//               <DrawerHeader/>
//               <ScrollView style={{paddingTop:25}}>
  
//                 <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.13 }}></View>
//                   <View style={{ flex:0.87, flexDirection:'row', }}>
//                     <Fontisto name="shopping-bag" size={20} color="#76BA1B" />
//                     <Text style={{fontSize:20, textAlign:'center'}}>   Dashboard</Text>
//                   </View>
//                 </TouchableOpacity>
  
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
  
//                 <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.12 }}></View>
//                   <View style={{ flex:0.88, flexDirection:'row', }}>
//                     <Ionicons name="md-cart" size={28} color="#76BA1B" />
//                     <Text style={{fontSize:20, textAlign:'center'}}>  My Orders</Text>
//                   </View>     
//                 </TouchableOpacity>
  
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
                
//                 <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.12 }}></View>
//                   <View style={{ flex:0.88, flexDirection:'row', }}>
//                     <Ionicons name="md-cart" size={28} color="#76BA1B" />
//                     <Text style={{fontSize:20, textAlign:'center'}}>  My Cart</Text>
//                   </View>
//                 </TouchableOpacity>
                
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
  
//                 <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.12 }}></View>
//                   <View style={{ flex:0.88, flexDirection:'row', }}>
//                     <FontAwesome name="user-circle" size={22} color="#76BA1B"/>
//                     <Text style={{fontSize:20, textAlign:'center'}}>  My Profile</Text>
//                   </View>
//                 </TouchableOpacity>
  
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//                 <TouchableOpacity activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.12 }}></View>
//                   <View style={{ flex:0.88, flexDirection:'row', }}>
//                     <FontAwesome name="phone-square" size={24} color="#76BA1B"/>
//                     <Text style={{fontSize:20, textAlign:'center'}}>  Contact Us</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//                 <TouchableOpacity activeOpacity={0.4} 
//                                   style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
//                   <View style={{ flex:0.12 }}></View>
//                   <View style={{ flex:0.88, flexDirection:'row', }}>
//                     <FontAwesome name="share" size={24} color="#76BA1B"/>
//                     <Text style={{fontSize:20, textAlign:'center'}}>  Share</Text>
//                   </View>
//                 </TouchableOpacity>
//                 <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               </ScrollView>
//               <DrawerBottom navigation={()=>changeLogIn(props)}/>
//             </SafeAreaView>
            
  
  
  
//     )
//   }