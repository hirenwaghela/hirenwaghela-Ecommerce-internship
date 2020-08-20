import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, AsyncStorage, BackHandler, ActivityIndicator } from 'react-native';
import { CompletedHeader } from "../components/header_components";
import { Fontisto } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

export default class Completed extends Component {

  
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
        userId: '',
        referenceId: '',
        Error: null
     };
  }

  deletecart = () => {
    
    fetch('https://dhol.herokuapp.com/api/cart/'+ this.state.userId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
            console.log(response.json);
            console.log('deleted'+this.state.userId)
            console.log('Completed --> Order deleted')
    })
    .catch(err => {
        console.log(err)
        this.setState({Error: err})
      })
    
  }
  

  fetchUserId = async() => {
    try{
        let userId = await AsyncStorage.getItem('userId')
        let referenceId = this.props.route.params
        console.log('Completed\nUSER__ID: ',userId)
        this.setState({userId})
        this.setState({referenceId})
        this.deletecart()
    }
    catch(err){
        console.log(err)
    }
  }

  componentDidMount() {
    this.fetchUserId()
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Home');
    return true;
  }

  render() {
    return (
      <View style={{flex:1}}>
        <CompletedHeader goback={ () => this.props.navigation.navigate('Home')}/>  

          {/* Showing Error */}
          <Modal isVisible={this.state.Error != null}>
          <View style={{height: height-680, width:width-160, borderRadius:5, alignSelf:'center', alignItems:'center', justifyContent:'center', backgroundColor:'#fff'}}>
              <View style={{alignItems:'center', justifyContent:'center'}}>
              <Text style={{fontSize:17, textAlign:'center'}}>Oops!</Text>
              <Text style={{fontSize:17, textAlign:'center'}}>Something went wrong</Text>
              </View>
          </View>
          </Modal>

        <View style={{flex:0.5, justifyContent:'center', alignItems:"center"}}>
            <View style={{ height:width-130, width:width-130, borderRadius:width/2 - 65, borderWidth:5, borderColor:"#76BA1B", alignItems:"center", justifyContent:"center"}}>
                <Fontisto name="shopping-basket-add" size={100} color="#76BA1B" />
            </View>
        </View>

        <View style={{flex:0.5}}>
          <View style={{ alignItems:"center"}}>
              <Text style={{fontSize:24, color:"#76BA1B", textAlign:'center'}}>Order Successfull</Text>
          </View>

          <View style={{ marginTop:'10%', alignItems:"center"}}>
              <Text style={{fontSize:38, color:"#76BA1B", textAlign:'center'}}>Thank you!</Text>
          </View>

          
          <View style={{alignItems:"center"}}>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}
                                style={{width:width-70, height:45, marginTop:'10%', alignItems:"center", 
                                        justifyContent:"center" ,backgroundColor:"#76BA1B", borderRadius:25}}>
                  <Text style={{fontSize:22, color:"#fff", textAlign:'center'}}>Continue Your Shopping</Text>
              </TouchableOpacity>
          </View>
        </View>
    
      </View>
    );
  }
}

const styles = StyleSheet.create({

});



// import { BackHandler } from 'react-native';

// constructor(props) {
//     super(props)
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
// }

// componentWillMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

// componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
// }

// handleBackButtonClick() {
//     this.props.navigation.goBack(null);
//     return true;
// }