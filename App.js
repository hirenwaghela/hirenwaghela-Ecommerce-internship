import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';
import Home from "./screens/Home";
import Products from "./screens/Products"
import MyCart from "./screens/MyCart";
import MyProfile from "./screens/MyProfile";
import Completed from "./screens/Completed";
import OrderDetails from "./screens/OrderDetails";
import { DrawerHeader } from "./components/header_components";
import { DrawerBottom } from "./components/bottom_buttons";
import MyAddress from './screens/MyAddress';
import MyOrders from "./screens/MyOrders"
import SignInOTP from "./screens/SignInOTP";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const HomeStack = () => {
  return(
      <Stack.Navigator>
        <Stack.Screen name="Home1" component={Home}  options={navOptionHandler}/>
        <Stack.Screen name="Home2" component={Products} options={navOptionHandler}/>
        <Stack.Screen name="MyCart" component={MyCart} options={navOptionHandler}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails} options={navOptionHandler}/>
        <Stack.Screen name="Completed" component={Completed} options={navOptionHandler}/>
      </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return(
    <Stack.Navigator>
      {/* <Stack.Screen name="SignInOTP" component={SignInOTP}  options={navOptionHandler}/> */}
      <Stack.Screen name="MyProfile" component={MyProfile}  options={navOptionHandler}/>
      <Stack.Screen name="MyAddress" component={MyAddress} options={navOptionHandler}/>
      <Stack.Screen name="MyOrders" component={MyOrders} options={navOptionHandler}/>
      <Stack.Screen name="MyCart" component={MyCart} options={navOptionHandler}/>
    </Stack.Navigator>
)
}

const CustomDrawer = (props) => {
  return(
    <SafeAreaView style={{ flex:1, backgroundColor:"#fff"}}>
      <DrawerHeader/>
      <ScrollView style={{paddingLeft:35, paddingTop:25}}>
        <TouchableOpacity onPress={ () => props.navigation.navigate('Dashboard') } activeOpacity={0.4} style={{flexDirection:"row", marginTop:15, marginBottom:10}}>
          <Fontisto name="shopping-bag" size={20} color="black" style={{marginTop:5, marginRight:10}} />
          <Text style={{fontSize:20}}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => props.navigation.navigate('MyOrders') } activeOpacity={0.4} style={{flexDirection:"row", marginTop:15, marginBottom:10}}>
          <Ionicons name="md-cart" size={28} color="black" style={{ marginRight:5}} />
          <Text style={{fontSize:20}}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => props.navigation.navigate('MyCart') } activeOpacity={0.4} style={{flexDirection:"row", marginTop:15, marginBottom:10}}>
          <Ionicons name="md-cart" size={28} color="black" style={{ marginRight:5}} />
          <Text style={{fontSize:20}}>My Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => props.navigation.navigate('MyProfile') } activeOpacity={0.4} style={{flexDirection:"row", marginTop:15, marginBottom:10}}>
          <FontAwesome name="user-circle" size={22} color="black" style={{ marginTop:2, marginRight:7}}/>
          <Text style={{fontSize:20}}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.4} style={{flexDirection:"row", marginTop:15, marginBottom:10}}>
          <FontAwesome name="phone-square" size={24} color="black" style={{ marginTop:2, marginRight:7}}/>
          <Text style={{fontSize:20}}>Contact Us</Text>
        </TouchableOpacity>
      </ScrollView>
      <DrawerBottom/>
    </SafeAreaView>
  )
}

export default function App() {
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

