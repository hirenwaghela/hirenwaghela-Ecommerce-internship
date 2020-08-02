import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, ActivityIndicator, AsyncStorage, Image,
         Dimensions, TouchableOpacity } from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
import { Input, Item } from 'native-base';

const { width } = Dimensions.get('window')

// PROVIDE VALID FIREBASE CONFIG HERE
// https://firebase.google.com/docs/web/setup
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDOXs-PW3aCEY6c7TOt2l_m8qEPpPsvVqw",
  authDomain: "techronx-otp-example.firebaseapp.com",
  databaseURL: "https://techronx-otp-example.firebaseio.com",
  projectId: "techronx-otp-example",
  storageBucket: "techronx-otp-example.appspot.com",
  messagingSenderId: "316009769706",
  appId: "1:316009769706:web:3f40e00ecbcdc295874593",
  measurementId: "G-DZECW6CFCZ"
};

try {
  if (FIREBASE_CONFIG.apiKey) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
} catch (err) {
  
}

export default class PhoneAuthScreen extends React.Component{

  state = {
    recaptchaVerifier: {current:null},
    verificationCodeTextInput: {current:null},
    phoneNumber: '',
    verificationId: '',
    verifyError: false,
    verifyInProgress: false,
    verificationCode: '',
    confirmError: null,
    confirmInProgress: false,
    isConfigValid: !!FIREBASE_CONFIG.apiKey

  }


  checkLogInStatus = async() => {
      try{
        let isLogIn = await AsyncStorage.getItem('isLogIn')
        let mobile = await AsyncStorage.getItem('mobile')
        let token = await AsyncStorage.getItem('token')
        let userId = await AsyncStorage.getItem('userId')

        console.log('isLogIn ', isLogIn)
        console.log('mobile ', mobile)
        console.log('token ', token)
        console.log('userId ', userId)

        await AsyncStorage.setItem('isLogIn', 'false')
        await AsyncStorage.removeItem('mobile')
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('userId')

        
      }catch(err){
        console.log(err)
      }
        console.log('isLogIn ', isLogIn)
        console.log('mobile ', mobile)
        console.log('token ', token)
        console.log('userId ', userId)
      // if(isLogIn == 'true'){
      //   this.props.navigation.navigate('Home')
      // }
  }

  componentDidMount() {
      this.checkLogInStatus()
  }
  
  render(){
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
            ref={this.state.recaptchaVerifier}
            firebaseConfig={FIREBASE_CONFIG}
          />
            <View style={{height:110}}></View>
            <View style={{height:140, width:140, borderRadius:70, elevation:5}}>
              <Image
                  style={styles.image}
                  source={require("./../assets/logo.jpeg")}
              />
            </View>
            <View style={{alignItems:'center', marginTop:50}}>
              <Text style={{fontSize:17, fontWeight:'bold'}}>Sign Up</Text>
            </View>
            <Item regular
                  style={{width:width-80, marginTop:15, marginBottom:8}}
            >
                <Input  
                    autoFocus={this.state.isConfigValid}
                    autoCompleteType="tel"
                    keyboardType="phone-pad"
                    placeholder="Phone Number"
                    editable={!this.state.verificationId}
                    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                />
            </Item>

          <View style={{width:width-78, height:45, marginLeft:2 }}>
            <Button
              title={`${this.state.verificationId ? "Resend" : "Send"} OTP`}
              disabled={!this.state.phoneNumber}
              color='#76BA1B'
              onPress={async () => {
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                try {
                  this.setState({
                    verifyError: undefined,
                    verifyInProgres: true,
                    verificationId: ''
                  })
                  const verificationId = await phoneProvider.verifyPhoneNumber(
                    '+91'+ this.state.phoneNumber,
                    this.state.recaptchaVerifier.current
                  );
                  this.setState({
                    verifyInProgress:false,
                    verificationId: verificationId
                  })
                  //this.state.verificationCodeTextInput.current?.focus();
                } catch (err) {
                  this.setState({
                    verifyError: err,
                    verifyInProgress: false
                  })
                }
              }}
            />
          </View>

          {/* {this.state.verifyError && (
            <Text style={styles.error}>{`Error: ${this.state.verifyError.message}`}</Text>
          )} */}

          {this.state.verifyInProgress && <ActivityIndicator style={styles.loader} />}
          
          {this.state.verificationId ? (
            <Text style={styles.success}>
              A verification code has been sent to your phone
            </Text>
          ) : undefined}
          
          {/* <TextInput
            ref={this.state.verificationCodeTextInput}
            style={styles.textInput}
            editable={!!this.state.verificationId}
            placeholder="Enter OTP"
            onChangeText={(verificationCode) =>
              this.setState({verificationCode})
            }
          /> */}

          <Item regular
                style={{width:width-80, marginTop:20, marginBottom:8
                }}
          >
            <Input 
              ref={this.state.verificationCodeTextInput}
              editable={!!this.state.verificationId}
              placeholder="Enter OTP"
              onChangeText={(verificationCode) =>
                this.setState({verificationCode})
              }
            />
          </Item>

          <View style={{width:width-78, height:45, marginLeft:2 }}>
            <Button
              title="Verify OTP"
              disabled={!this.state.verificationCode}
              color='#76BA1B'
              onPress={async () => {
                try {
                  this.setState({
                    confirmError: undefined,
                    confirmInProgress: true
                  })
                  const credential = firebase.auth.PhoneAuthProvider.credential(
                    this.state.verificationId,
                    this.state.verificationCode
                  );
                  const authResult = await firebase
                    .auth() 
                    .signInWithCredential(credential);
                  this.setState({
                    confirmInProgress: false,
                    verificationId: '',
                    verificationCode: ''
                  })
                  //this.state.verificationCodeTextInput.current?.clear();
                  Alert.alert("Phone authentication successful!");
                  console.log(this.state.phoneNumber)

                  AsyncStorage.setItem('mobile', this.state.phoneNumber)  // assigning mobile no
                  this.props.navigation.navigate('EnterDetails')
                } catch (err) {
                  this.setState({
                    confirmError: err,
                    confirmInProgress: false
                  })
                }
              }}    
            />
          </View>
          <TouchableOpacity   onPress={ () => this.props.navigation.navigate('SignInOTP')} 
                              style={{marginTop:20, flexDirection:'row'}}>
                <Text>Already have an account? </Text>
                <Text style={{color:'#76BA1B'}}>Sign In</Text>
          </TouchableOpacity>
          
          {/* {this.state.confirmError && (
            <Text style={styles.error}>{`Error: ${this.state.confirmError.message}`}</Text>
          )} */}
          {this.state.confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  image:{
    flex: 1,
    height: null, 
    width: null, 
    resizeMode: 'contain', 
    borderWidth: 0.1, 
    borderColor: '#D3D3D3'
},
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    marginTop: 50,  
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: "bold",
  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: "bold",
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    marginHorizontal:30,
    height:45,
    paddingHorizontal:10,
    width:width-60,
    fontSize: 19,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor:'#010101'
  },
  error: {
    marginTop: 10,
    fontWeight: "bold",
    color: "red",
  },
  success: {
    marginTop: 10,
    fontWeight: "bold",
    color: "blue",
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFFFFFC0",
    justifyContent: 'center',
    alignItems: "center",
  },
  overlayText: {
    fontWeight: "bold",
  },
});
