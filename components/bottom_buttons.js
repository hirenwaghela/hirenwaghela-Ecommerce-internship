import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window')

export const Bottom1 = (props) => {
    return (
        <TouchableOpacity onPress={props.checkout} activeOpacity={1} style={styles.bottomView}>
          <Text style={styles.textStyle}>Proceed to checkout</Text>
        </TouchableOpacity>
      );

}

export const ConfirmOrder = (props) => {
    return (
        <TouchableOpacity onPress={props.confirm} activeOpacity={1} style={styles.bottomView}>
          <Text style={styles.textStyle}>Confirm Order</Text>
        </TouchableOpacity>
      );

}

export const UpdateAddress = (props) => {
  return (
      <TouchableOpacity onPress={props.confirm} activeOpacity={1} style={styles.bottomView}>
        <Text style={styles.textStyle}>Update Now</Text>
      </TouchableOpacity>
    );

}

export const DrawerBottom = (props) => {
  return (
      <TouchableOpacity onPress={props.navigation}
                        activeOpacity={0.4} style={styles.DrawerbottomView}>
        <AntDesign name="logout" size={20} color="#76BA1B" style={{ marginRight:10}} />
        <Text style={{fontSize:20}}>Logout</Text>
      </TouchableOpacity>
    );

}

export const AddToCart = (props) => {
  return (
      <TouchableOpacity onPress={props.addProduct}
                        //onPress={props.movetoCart} 
                        activeOpacity={1} 
                        style={styles.bottomView}>
        <Text style={styles.textStyle}>Add To Cart</Text>
      </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    bottomView: {
        width: '100%',
        height: 50,
        backgroundColor: '#76BA1B',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        bottom: 0, 
      },
      DrawerbottomView: {
        width: '100%',
        height: 50,
        flexDirection:"row",
        paddingLeft:35,
        alignItems: 'center',
        position: 'absolute', 
        bottom: 10, 
      },
    
      textStyle: {
        color: '#fff',
        fontSize: 24,
      }
})