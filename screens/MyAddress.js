import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Dimensions, ScrollView, Image, ActivityIndicator } from 'react-native';
import {AntDesign, FontAwesome, MaterialIcons, FontAwesome5, MaterialCommunityIcons} from '@expo/vector-icons';
import  { Card2 } from "../components/card"
import { MyAddressHeader } from "../components/header_components";
import { UpdateAddress } from "../components/bottom_buttons";
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')


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
  constructor(props) {
    super(props);
    this.state = {
      Error: null,
      isModalVisible: false,
      pincode: "",
      building_name: "",
      area_name: "",
      city: "",
      state: "",
      name: "",
      email: "",
      mobile_no: ""

     };
  }

    handlePincodeChange = (pincode) =>  this.setState({ pincode })
    handleBuildingNameChange  = (building_name) =>  this.setState({ building_name })
    handleAreaNameChange = (area_name) =>  this.setState({ area_name })
    handleCityNameChange = (city) =>  this.setState({ city })
    handleStateNameChange = (state) =>  this.setState({ state })
    handleNameChange = (name) =>  this.setState({ name })
    handleEmailChange = (email) =>  this.setState({ email })
    handleMobileNoChange = (mobile_no) =>  this.setState({ mobile_no })

    componentDidMount() {
      // console.log(this.props.route.params.userId)
      this.setState({
        pincode: this.props.route.params.user_details.pincode,
        building_name: this.props.route.params.user_details.address,
        city: this.props.route.params.user_details.city,
        state: this.props.route.params.user_details.state,
        name: this.props.route.params.user_details.name,
        email: this.props.route.params.user_details.email,
        mobile_no: this.props.route.params.user_details.mobile
      })
    }

    UpdateProfile = () => {

      this.setState({isModalVisible: true})
      fetch('https://dhol.herokuapp.com/api/user/' + this.props.route.params.userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                address: this.state.building_name + ' ' + this.state.area_name,
                pincode: this.state.pincode,
                city: this.state.city,
                state: this.state.state
            })
          })
            .then(res => {
                  setTimeout(() => {
                    this.setState({isModalVisible: false})
                    
                  }, 1000);
                  setTimeout(() => {
                     this.props.navigation.goBack() 
                  }, 1400)
                    console.log('Updated successfully')
                  
            })
            .catch(err => {
              console.log(err);
              this.setState({isModalVisible: false})
              this.setState({Error: err})
          });
    }

    render() {
        return (
        <View style={styles.containerMain}>
            <MyAddressHeader/>
            
            {/* Updated Modal */}
            <Modal isVisible={this.state.isModalVisible}>
              <View style={{height: height-550, width:width-100, borderRadius:20, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
                <View style={{height:70, width:70, marginBottom:10}}>
                  <Image style={styles.image} source={require("../assets/tick_mark.png")} />
                </View>
                <Text style={{fontSize:20, textAlign:'center'}}>Updated Successfully!</Text>
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
            
            <ScrollView style={{paddingTop:40, paddingHorizontal:20, backgroundColor:"#fff"}}>
                <View style={{flexDirection:'row', marginBottom:25}}>
                    <MaterialIcons name="location-on" size={18} color="#76BA1B" style={{ marginTop:-2}}/>
                    <Text style={{fontSize:15, paddingLeft:5, color:'grey', width:200}}>New Address</Text>
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label={this.state.pincode==''?"Pincode":null}
                        value={this.state.pincode}
                        onChangeText={this.handlePincodeChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label={(this.props.route.params.user_details.address=='' && this.state.building_name=='')?"House No. Building name":null}
                        value={this.state.building_name}
                        onChangeText={this.handleBuildingNameChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label={this.state.area_name==''?"Road Name, Area Colony":null}
                        value={this.state.area_name}
                        onChangeText={this.handleAreaNameChange}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginLeft:20, marginBottom:40}}>
                    <FloatingLabelInputSmall
                        keyboardType="email-address"
                        label={this.state.city==''?"City":null}
                        value={this.state.city}
                        onChangeText={this.handleCityNameChange}
                    />
                    <FloatingLabelInputSmall
                        keyboardType="email-address"
                        label={this.state.state==''?"State":null}
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
                        label={this.state.name==''?"Name":null}
                        value={this.state.name}
                        onChangeText={this.handleNameChange}
                    />
                </View>
                <View style={{marginBottom:40}}>
                    <FloatingLabelInput
                        keyboardType="email-address"
                        label={this.state.email==''?"Email":null}
                        value={this.state.email}
                        onChangeText={this.handleEmailChange}
                    />
                </View>
                <View style={{marginBottom:100}}>
                    <FloatingLabelInput
                        editable={false}
                        label={this.state.mobile_no==''?"Mobile Number":null}
                        value={this.state.mobile_no}
                    />
                </View>
            </ScrollView>
            <UpdateAddress  Update={ () => this.UpdateProfile()}/>
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
}
});
