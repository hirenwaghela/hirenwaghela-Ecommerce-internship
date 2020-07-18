import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
const { width } = Dimensions.get('window')

export const Bottom1 = (props) => {
    return (
        <TouchableOpacity onPress={props.checkout} activeOpacity={1} style={styles.bottomView}>
          <Text style={styles.textStyle}>Proceed to checkout</Text>
        </TouchableOpacity>
      );

}

export const Bottom2 = (props) => {
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

export const DrawerBottom = () => {
  return (
      <TouchableOpacity activeOpacity={0.4} style={styles.DrawerbottomView}>
        <AntDesign name="logout" size={20} color="black" style={{ marginRight:10}} />
        <Text style={{fontSize:20}}>Logout</Text>
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