import React from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';
import Home from "./screens/Home";
import Products from "./screens/Products";
import Product_Description from "./screens/Product_Description"
import MyCart from "./screens/MyCart";
import MyProfile from "./screens/MyProfile";
import Completed from "./screens/Completed";
import OrderDetails from "./screens/OrderDetails";
import { DrawerHeader } from "./components/header_components";
import { DrawerBottom } from "./components/bottom_buttons";
import MyAddress from './screens/MyAddress';
import MyOrders from "./screens/MyOrders"
import SignInOTP from "./screens/SignInOTP";
import SignUpOTP from "./screens/SignUpOTP";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import EnterDetails from "./screens/EnterDetails";

// import search header component
import Header_Search from './components/header_search'


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const HomeStack = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="SignUpOTP" component={SignUpOTP}  options={navOptionHandler}/>
        <Stack.Screen name="SignInOTP" component={SignInOTP}  options={navOptionHandler}/>
        {/* <Stack.Screen name="SignUp" component={SignUp}  options={navOptionHandler}/> */}
        {/* <Stack.Screen name="SignIn" component={SignIn}  options={navOptionHandler}/> */}
        <Stack.Screen name="EnterDetails" component={EnterDetails}  options={navOptionHandler}/>
        <Stack.Screen name="Home" component={Home}  options={navOptionHandler}/>
        <Stack.Screen name="Products" component={Products} options={navOptionHandler}/>
        <Stack.Screen name="Header_Search" component={Header_Search} options={navOptionHandler}/>
        <Stack.Screen name="Product_Description" component={Product_Description} options={navOptionHandler}/>
        <Stack.Screen name="MyCart" component={MyCart} options={navOptionHandler}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={navOptionHandler}/>
        <Stack.Screen name="Completed" component={Completed} options={navOptionHandler}/>
      </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="MyProfile2" component={MyProfile}  options={navOptionHandler}/>
      <Stack.Screen name="MyAddress" component={MyAddress} options={navOptionHandler}/>
      <Stack.Screen name="MyOrders" component={MyOrders} options={navOptionHandler}/>
      <Stack.Screen name="MyCart" component={MyCart} options={navOptionHandler}/>
    </Stack.Navigator>
)
}

const changeLogIn = async(props) => {
    console.log('\n\nLogout')
    await AsyncStorage.removeItem('isLogIn')
    await AsyncStorage.removeItem('mobile')
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userId')

    console.log('Outside app\n')
    console.log('isLogIn ', isLogIn)
    console.log('mobile ', mobile)
    console.log('token ', token)
    console.log('userId ', userId)

    props.navigation.navigate('SignInOTP')
}


const CustomDrawer = (props) => {
    //  let isLogIn = await AsyncStorage.getItem('isLogIn')
    //  let toggle = isLogIn=='true'?
    //     <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
    //         <DrawerHeader/>
    //         <ScrollView style={{paddingTop:25}}>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <Fontisto name="shopping-bag" size={20} color="#76BA1B" style={{marginTop:5, marginRight:10}} />
    //             <Text style={{fontSize:20}}>Dashboard</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
    //             <Text style={{fontSize:20}}>My Orders</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
    //             <Text style={{fontSize:20}}>My Cart</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <FontAwesome name="user-circle" size={22} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
    //             <Text style={{fontSize:20}}>My Profile</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //           <TouchableOpacity activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <FontAwesome name="phone-square" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
    //             <Text style={{fontSize:20}}>Contact Us</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //           <TouchableOpacity activeOpacity={0.4} 
    //                             style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
    //             <FontAwesome name="share" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
    //             <Text style={{fontSize:20}}>Share</Text>
    //           </TouchableOpacity>
    //           <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
    //         </ScrollView>
    //         <DrawerBottom navigation={()=>changeLogIn(props)}/>
    //       </SafeAreaView>
    //     :
    //       <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
    //         <DrawerHeader/>
    //         <View  style={{ marginTop:15, paddingTop:25, marginBottom:20, alignItems:'center', }}>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('SignInOTP') } activeOpacity={0.4} 
    //                     style={{  width:180, alignItems:'center', borderWidth:1, borderColor:'#76BA1B'}}>
        
    //             <Text style={{fontSize:20}}>Log In</Text>
    //           </TouchableOpacity>
    //         </View>
    //         <View  style={{ marginBottom:10, alignItems:'center', }}>
    //           <TouchableOpacity onPress={ () => props.navigation.navigate('SignInOTP') } activeOpacity={0.4} 
    //                     style={{  width:180, alignItems:'center', borderWidth:1, borderColor:'#76BA1B'}}>
        
    //             <Text style={{fontSize:20}}>Sign Up</Text>
    //           </TouchableOpacity>
    //         </View>
    //   </SafeAreaView>

  return(
        <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
            <DrawerHeader/>
            <ScrollView style={{paddingTop:25}}>
              <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <Fontisto name="shopping-bag" size={20} color="#76BA1B" style={{marginTop:5, marginRight:10}} />
                <Text style={{fontSize:20}}>Dashboard</Text>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
                <Text style={{fontSize:20}}>My Orders</Text>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
                <Text style={{fontSize:20}}>My Cart</Text>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <FontAwesome name="user-circle" size={22} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
                <Text style={{fontSize:20}}>My Profile</Text>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              {/* <TouchableOpacity activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <FontAwesome name="phone-square" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
                <Text style={{fontSize:20}}>Contact Us</Text>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              <TouchableOpacity activeOpacity={0.4} 
                                style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
                <FontAwesome name="share" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
                <Text style={{fontSize:20}}>Share</Text>
              </TouchableOpacity> */}
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
            </ScrollView>
            <DrawerBottom navigation={()=>changeLogIn(props)}/>
          </SafeAreaView>
          



  )
}

export default class App extends React.Component {
  render() {
    
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => CustomDrawer(props)}>
          <Drawer.Screen name="Dashboard" component={HomeStack} />
          <Drawer.Screen name="MyOrders" component={MyOrders} />
          <Drawer.Screen name="MyCart" component={MyCart} />
          <Drawer.Screen name="MyProfile" component={ProfileStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}







// let isLogIn = await AsyncStorage.getItem('isLogIn')
//     let toggle = isLogIn=='true'?
//           <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
//             <DrawerHeader/>
//             <ScrollView style={{paddingTop:25}}>
//               <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <Fontisto name="shopping-bag" size={20} color="#76BA1B" style={{marginTop:5, marginRight:10}} />
//                 <Text style={{fontSize:20}}>Dashboard</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
//                 <Text style={{fontSize:20}}>My Orders</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <Ionicons name="md-cart" size={28} color="#76BA1B" style={{ marginRight:5}} />
//                 <Text style={{fontSize:20}}>My Cart</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <FontAwesome name="user-circle" size={22} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
//                 <Text style={{fontSize:20}}>My Profile</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               <TouchableOpacity activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <FontAwesome name="phone-square" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
//                 <Text style={{fontSize:20}}>Contact Us</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//               <TouchableOpacity activeOpacity={0.4} 
//                                 style={{flexDirection:"row", marginTop:15, marginBottom:10, paddingLeft:35}}>
//                 <FontAwesome name="share" size={24} color="#76BA1B" style={{ marginTop:2, marginRight:7}}/>
//                 <Text style={{fontSize:20}}>Share</Text>
//               </TouchableOpacity>
//               <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
//             </ScrollView>
//             <DrawerBottom navigation={()=>changeLogIn(props)}/>
//           </SafeAreaView>
//           :