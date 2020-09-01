import React from 'react';
import { Text, View, AsyncStorage, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer, Link } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Fontisto, FontAwesome, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import Home from "./screens/Home";
import Products from "./screens/Products";
import SubCategory_Products from './screens/SubCategory_Products'
import Product_Description from "./screens/Product_Description"
import MyCart from "./screens/MyCart";
import Categories from './screens/Categories'
import MyProfile from "./screens/MyProfile";
import Completed from "./screens/Completed";
import OrderDetails from "./screens/OrderDetails";
import { DrawerHeader } from "./components/header_components";
import { DrawerBottom } from "./components/bottom_buttons";
// import CustomDrawer from './components/Drawer_Component';
import MyAddress from './screens/MyAddress';
import MyOrders from "./screens/MyOrders";
import MyOrders_Product_Description from "./screens/MyOrders_Product_Description";
import Search from "./screens/Search";
import SignInOTP from "./screens/SignInOTP";
import SignUpOTP from "./screens/SignUpOTP";
import SignUp from "./screens/SignUp";
import SignIn from "./screens/SignIn";
import EnterDetails from "./screens/EnterDetails";

// import search header component
import Header_Search from './components/header_search'

import { Name, Mobile } from './screens/Home';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false
})


const DrawerApp = () => {
  return(
        <Drawer.Navigator initialRouteName="Dashboard" drawerContent={props => CustomDrawer(props)}>
          <Drawer.Screen name="Dashboard" component={HomeStack} />
          <Drawer.Screen name='Categories' component={Categories} />
          <Drawer.Screen name="MyOrders" component={MyOrders} />
          <Drawer.Screen name="MyCart" component={MyCart} />
          <Drawer.Screen name="MyProfile" component={ProfileStack} />
        </Drawer.Navigator>
)
}


const HomeStack = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}  options={navOptionHandler}/>
        <Stack.Screen name="Products" component={Products} options={navOptionHandler}/>
        <Stack.Screen name="SubCategory_Products" component={SubCategory_Products} options={navOptionHandler}/>
        <Stack.Screen name="Header_Search" component={Header_Search} options={navOptionHandler}/>
        <Stack.Screen name="Search" component={Search} options={navOptionHandler}/>
        <Stack.Screen name="Product_Description" component={Product_Description} options={navOptionHandler}/>
        <Stack.Screen name="MyCart" component={MyCart} options={navOptionHandler}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={navOptionHandler}/>
        <Stack.Screen name="MyOrders" component={MyOrders}  options={navOptionHandler}/>
        <Stack.Screen name="MyOrders_Product_Description" component={MyOrders_Product_Description}  options={navOptionHandler}/>
        <Stack.Screen name="MyAddress" component={MyAddress} options={navOptionHandler}/>
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

const AuthStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name="SignInOTP" component={SignInOTP}  options={navOptionHandler}/>
      <Stack.Screen name="SignUpOTP" component={SignUpOTP}  options={navOptionHandler}/>
      <Stack.Screen name="EnterDetails" component={EnterDetails}  options={navOptionHandler}/>
    </Stack.Navigator>
)
}


const changeLogIn = async(props) => {
    console.log('\n\nLogout')
    await AsyncStorage.removeItem('isLogIn')
    await AsyncStorage.removeItem('mobile')
    await AsyncStorage.removeItem('name')
    await AsyncStorage.removeItem('token')
    await AsyncStorage.removeItem('userId')

    let isLogIn = await AsyncStorage.getItem('isLogIn')
    let mobile = await AsyncStorage.getItem('mobile')
    let name = await AsyncStorage.getItem('name')
    let token = await AsyncStorage.getItem('token')
    let userId = await AsyncStorage.getItem('userId')

    console.log('Outside app\n')
    console.log('isLogIn ', isLogIn)
    console.log('mobile ', mobile)
    console.log('name ', name)
    console.log('token ', token)
    console.log('userId ', userId)

    props.navigation.navigate('AuthStack')
}


const CustomDrawer = (props) => {
    
  return(
        <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
            <DrawerHeader name={Name} mobile={Mobile} navigation={()=>props.navigation.navigate('MyProfile')}/>
            <ScrollView style={{paddingTop:25}}>

              <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <FontAwesome name="home" size={27} color="#76BA1B" />
                  <Text style={{fontSize:20, textAlign:'center'}}>  Dashboard</Text>
                </View>
              </TouchableOpacity>

              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>

              <TouchableOpacity onPress={ () => props.navigation.navigate('Categories') } activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <MaterialIcons name="grid-on" size={24} color="#76BA1B" />
                  <Text style={{fontSize:20, textAlign:'center'}}>  Categories</Text>
                </View>     
              </TouchableOpacity>

              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>

              <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <MaterialCommunityIcons name="file-document-outline" size={26} color="#76BA1B" />
                  <Text style={{fontSize:20, textAlign:'center'}}>  My Orders</Text>
                </View>     
              </TouchableOpacity>

              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              
              <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <Ionicons name="md-cart" size={28} color="#76BA1B" />
                  <Text style={{fontSize:20, textAlign:'center'}}>  My Cart</Text>
                </View>
              </TouchableOpacity>
              
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>

              <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <FontAwesome name="user-circle" size={22} color="#76BA1B"/>
                  <Text style={{fontSize:20, textAlign:'center'}}>  My Profile</Text>
                </View>
              </TouchableOpacity>

              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              <TouchableOpacity onPress={()=> Linking.openURL('https://dholpurshare.com/')}
                                activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <FontAwesome name="phone-square" size={24} color="#76BA1B"/>
                  <Text style={{fontSize:20, textAlign:'center'}}>  Contact Us</Text>
                </View>
              </TouchableOpacity>
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
              {/* <TouchableOpacity activeOpacity={0.4} 
                                style={{flex:1, flexDirection:"row", height:60, alignItems:'center'}}>
                <View style={{ flex:0.12 }}></View>
                <View style={{ flex:0.88, flexDirection:'row', }}>
                  <FontAwesome name="share" size={24} color="#76BA1B"/>
                  <Text style={{fontSize:20, textAlign:'center'}}>  Share</Text>
                </View>
              </TouchableOpacity> */}
              <View style={{height:1, backgroundColor:'#D3D3D3'}}></View>
            </ScrollView>
            {/* <DrawerBottom navigation={()=>changeLogIn(props)}/> */}
          </SafeAreaView>
          



  )
}



export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isLoggedIn: false
     };
  }

  checkLogInStatus = async() => {
    try{
      console.log('\n\nchecklogin try block\n')
      let isLogIn = await AsyncStorage.getItem('isLogIn')
      let mobile = await AsyncStorage.getItem('mobile')
      let token = await AsyncStorage.getItem('token')
      let userId = await AsyncStorage.getItem('userId')

      if(isLogIn == 'true'){
        this.setState({isLoggedIn:true})
      }


      console.log('isLogIn ', isLogIn)
      console.log('mobile ', mobile)
      console.log('token ', token)
      console.log('userId ', userId)

      
    }catch(err){
      console.log(err)
    }
   
}

  componentDidMount() {
    this.checkLogInStatus()
  }
  
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {!this.state.isLoggedIn ? (
            <>
              <Stack.Screen name="AuthStack" component={AuthStack} options={navOptionHandler}/>
              <Stack.Screen name="DrawerApp" component={DrawerApp} options={navOptionHandler}/>
            </>
          ) : ( 
            <Stack.Screen name="DrawerApp" component={DrawerApp} options={navOptionHandler}/>
          )} 
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
