import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert, ActivityIndicator, 
         Dimensions, TouchableOpacity } from "react-native";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import * as firebase from "firebase";
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

  render(){
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
            ref={this.state.recaptchaVerifier}
            firebaseConfig={FIREBASE_CONFIG}
          />

          <TextInput
            style={styles.textInput}
            autoFocus={this.state.isConfigValid}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            textContentType="telephoneNumber"
            placeholder="Phone Number"
            editable={!this.state.verificationId}
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
          />
          <View style={{width:width-60, height:45, marginBottom:30                                                                                
                                                                                               }}>
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
                  this.state.verificationCodeTextInput.current?.focus();
                } catch (err) {
                  this.setState({
                    verifyError: err,
                    verifyInProgress: false
                  })
                }
              }}
            />
          </View>
          {this.state.verifyError && (
            <Text style={styles.error}>{`Error: ${this.state.verifyError.message}`}</Text>
          )}
          {this.state.verifyInProgress && <ActivityIndicator style={styles.loader} />}
          {this.state.verificationId ? (
            <Text style={styles.success}>
              A verification code has been sent to your phone
            </Text>
          ) : undefined}
          
          <TextInput
            ref={this.state.verificationCodeTextInput}
            style={styles.textInput}
            editable={!!this.state.verificationId}
            placeholder="Enter OTP"
            onChangeText={(verificationCode) =>
              this.setState({verificationCode})
            }
          />
          <View style={{width:width-60, height:45}}>
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
                  this.state.verificationCodeTextInput.current?.clear();
                  Alert.alert("Phone authentication successful!");
                  this.props.navigation.navigate('Home1')
                } catch (err) {
                  this.setState({
                    confirmError: err,
                    confirmInProgress: false
                  })
                }
              }}
            />
          </View>
          
          {this.state.confirmError && (
            <Text style={styles.error}>{`Error: ${this.state.confirmError.message}`}</Text>
          )}
          {this.state.confirmInProgress && <ActivityIndicator style={styles.loader} />}
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
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






// import * as React from "react";
// import { Text, View, StyleSheet, TextInput, Button, Alert, ActivityIndicator, Platform } from "react-native";
// import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
// import * as firebase from "firebase";

// // PROVIDE VALID FIREBASE CONFIG HERE
// // https://firebase.google.com/docs/web/setup
// const FIREBASE_CONFIG = {
//   apiKey: "AIzaSyDOXs-PW3aCEY6c7TOt2l_m8qEPpPsvVqw",
//   authDomain: "techronx-otp-example.firebaseapp.com",
//   databaseURL: "https://techronx-otp-example.firebaseio.com",
//   projectId: "techronx-otp-example",
//   storageBucket: "techronx-otp-example.appspot.com",
//   messagingSenderId: "316009769706",
//   appId: "1:316009769706:web:3f40e00ecbcdc295874593",
//   measurementId: "G-DZECW6CFCZ"
// };

// try {
//   if (FIREBASE_CONFIG.apiKey) {
//     firebase.initializeApp(FIREBASE_CONFIG);
//   }
// } catch (err) {
  
// }

// export default class PhoneAuthScreen extends React.Component{

//   state = {
//     recaptchaVerifier: {current:null},
//     verificationCodeTextInput: {current:null},
//     phoneNumber: '',
//     verificationId: '',
//     verifyError: false,
//     verifyInProgress: false,
//     verificationCode: '',
//     confirmError: null,
//     confirmInProgress: false,
//     isConfigValid: !!FIREBASE_CONFIG.apiKey

//   }

//   render(){
//     return (
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
//             ref={this.state.recaptchaVerifier}
//             firebaseConfig={FIREBASE_CONFIG}
//           />
//           <Text style={styles.title}>Firebase Phone Auth</Text>
//           <Text style={styles.subtitle}>using expo-firebase-recaptcha</Text>
//           <Text style={styles.text}>Enter phone number</Text>
//           <TextInput
//             style={styles.textInput}
//             autoFocus={this.state.isConfigValid}
//             autoCompleteType="tel"
//             keyboardType="phone-pad"
//             textContentType="telephoneNumber"
//             placeholder="+91"
//             editable={!this.state.verificationId}
//             onChangeText={(phoneNumber) => this.setState({phoneNumber})}
//           />
//           <Button
//             title={`${this.state.verificationId ? "Resend" : "Send"} Verification Code`}
//             disabled={!this.state.phoneNumber}
//             onPress={async () => {
//               const phoneProvider = new firebase.auth.PhoneAuthProvider();
//               try {
//                 this.setState({
//                   verifyError: undefined,
//                   verifyInProgres: true,
//                   verificationId: ''
//                 })
//                 const verificationId = await phoneProvider.verifyPhoneNumber(
//                   '+91'+ this.state.phoneNumber,
//                   this.state.recaptchaVerifier.current
//                 );
//                 this.setState({
//                   verifyInProgress:false,
//                   verificationId: verificationId
//                 })
//                 this.state.verificationCodeTextInput.current?.focus();
//               } catch (err) {
//                 this.setState({
//                   verifyError: err,
//                   verifyInProgress: false
//                 })
//               }
//             }}
//           />
//           {this.state.verifyError && (
//             <Text style={styles.error}>{`Error: ${this.state.verifyError.message}`}</Text>
//           )}
//           {this.state.verifyInProgress && <ActivityIndicator style={styles.loader} />}
//           {this.state.verificationId ? (
//             <Text style={styles.success}>
//               A verification code has been sent to your phone
//             </Text>
//           ) : undefined}
//           <Text style={styles.text}>Enter verification code</Text>
//           <TextInput
//             ref={this.state.verificationCodeTextInput}
//             style={styles.textInput}
//             editable={!!this.state.verificationId}
//             placeholder="123456"
//             onChangeText={(verificationCode) =>
//               this.setState({verificationCode})
//             }
//           />
//           <Button
//             title="Confirm Verification Code"
//             disabled={!this.state.verificationCode}
//             onPress={async () => {
//               try {
//                 this.setState({
//                   confirmError: undefined,
//                   confirmInProgress: true
//                 })
//                 const credential = firebase.auth.PhoneAuthProvider.credential(
//                   this.state.verificationId,
//                   this.state.verificationCode
//                 );
//                 const authResult = await firebase
//                   .auth()
//                   .signInWithCredential(credential);
//                 this.setState({
//                   confirmInProgress: false,
//                   verificationId: '',
//                   verificationCode: ''
//                 })
//                 this.state.verificationCodeTextInput.current?.clear();
//                 Alert.alert("Phone authentication successful!");
//                 this.props.navigation.navigate('Home1')
//               } catch (err) {
//                 this.setState({
//                   confirmError: err,
//                   confirmInProgress: false
//                 })
//               }
//             }}
//           />
//           {this.state.confirmError && (
//             <Text style={styles.error}>{`Error: ${this.state.confirmError.message}`}</Text>
//           )}
//           {this.state.confirmInProgress && <ActivityIndicator style={styles.loader} />}
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   content: {
//     marginTop: 50,  
//   },
//   title: {
//     marginBottom: 2,
//     fontSize: 29,
//     fontWeight: "bold",
//   },
//   subtitle: {
//     marginBottom: 10,
//     opacity: 0.35,
//     fontWeight: "bold",
//   },
//   text: {
//     marginTop: 30,
//     marginBottom: 4,
//   },
//   textInput: {
//     marginBottom: 8,
//     fontSize: 17,
//     fontWeight: "bold",
//   },
//   error: {
//     marginTop: 10,
//     fontWeight: "bold",
//     color: "red",
//   },
//   success: {
//     marginTop: 10,
//     fontWeight: "bold",
//     color: "blue",
//   },
//   loader: {
//     marginTop: 10,
//   },
//   overlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "#FFFFFFC0",
//     justifyContent: 'center',
//     alignItems: "center",
//   },
//   overlayText: {
//     fontWeight: "bold",
//   },
// });
