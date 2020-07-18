import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, ScrollView } from 'react-native';
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import  { Card2 } from "../components/card"
import { MyAddressHeader } from "../components/header_components";
import { UpdateAddress } from "../components/bottom_buttons"
const { width } = Dimensions.get('window')


class FloatingLabelInput extends Component {
    state = {
      isFocused: false,
    };
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        left: 20,
        top: !isFocused ? 0 : -17,
        fontSize: !isFocused ? 18 : 12,
        color: !isFocused ? '#aaa' : 'grey',
      };
      return (
        <View>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            style={{ height: 26, width:width-60 ,marginLeft:20, fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: 'grey' }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
        </View>
      );
    }
  }

  class FloatingLabelInputSmall extends Component {
    state = {
      isFocused: false,
    };
  
    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });
  
    render() {
      const { label, ...props } = this.props;
      const { isFocused } = this.state;
      const labelStyle = {
        position: 'absolute',
        left: 0,
        top: !isFocused ? 0 : -17,
        fontSize: !isFocused ? 18 : 12,
        color: !isFocused ? '#aaa' : 'grey',
      };
      return (
        <View>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
            {...props}
            style={{ height: 26, width:width/2-40 , fontSize: 16, color: '#000', borderBottomWidth: 1, borderBottomColor: 'grey' }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blurOnSubmit
          />
        </View>
      );
    }
  }


export default class MyAddress extends Component {
    state={
        pincode: "",
        building_name: "",
        area_name: "",
        city: "",
        state: "",
        name: "",
        email: "",
        mobile_no: ""
    }

    handlePincodeChange = (pincode) =>  this.setState({ pincode })
    handleBuildingNameChange  = (building_name) =>  this.setState({ building_name })
    handleAreaNameChange = (area_name) =>  this.setState({ area_name })
    handleCityNameChange = (city) =>  this.setState({ city })
    handleStateNameChange = (state) =>  this.setState({ state })
    handleNameChange = (name) =>  this.setState({ name })
    handleEmailChange = (email) =>  this.setState({ email })
    handleMobileNoChange = (mobile_no) =>  this.setState({ mobile_no })

    render() {
        return (
        <View style={styles.containerMain}>
            <MyAddressHeader goback={ () => this.props.navigation.goBack()}/>
            <ScrollView style={{paddingTop:40, paddingHorizontal:20, backgroundColor:"#fff"}}>
                <View style={{flexDirection:'row', marginBottom:25}}>
                    <MaterialIcons name="location-on" size={18} color="#76BA1B" style={{ marginTop:-2}}/>
                    <Text style={{fontSize:15, paddingLeft:5, color:'grey', width:200}}>New Address</Text>
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="Pincode"
                        value={this.state.pincode}
                        onChangeText={this.handlePincodeChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="House No. Building name"
                        value={this.state.building_name}
                        onChangeText={this.handleBuildingNameChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="Road Name, Area Colony"
                        value={this.state.area_name}
                        onChangeText={this.handleAreaNameChange}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:20, marginBottom:40}}>
                    <FloatingLabelInputSmall
                        keyboardType="email-address"
                        label="City"
                        value={this.state.city}
                        onChangeText={this.handleCityNameChange}
                    />
                    <FloatingLabelInputSmall
                        keyboardType="email-address"
                        label="State"
                        value={this.state.state}
                        onChangeText={this.handleStateNameChange}
                    />
                </View>
                <View style={{flexDirection:'row', marginBottom:25}}>
                    <MaterialIcons name="location-on" size={18} color="#76BA1B" style={{ marginTop:-2}}/>
                    <Text style={{fontSize:15, paddingLeft:5, color:'grey', width:200}}>My Personal Info</Text>
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="Name"
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="Email"
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                    />
                </View>
                <View style={{marginBottom:100}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label="Mobile Number"
                        value={this.state.mobile_no}
                        onChangeText={this.handleMobileNoChange}
                    />
                </View>
            </ScrollView>
            <UpdateAddress/>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
  },
});
