import React from 'react';
import { StyleSheet, Text, View , Dimensions, Image} from 'react-native';
import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')

export const Swiper1 = () => (
        <View style={{width:width,height:70}}>
            <Swiper
                autoplay
                style={{height:70}} 
                paginationStyle={{ position: "absolute", top: undefined, bottom: 0 }}
                
            >
                <View style={{flex:1}}>
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </View>
                <View style={{flex:1}}>
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </View>
                <View style={{flex:1}}>
                    <Image style={styles.image} source={require("../assets/swiper-1.png")} />
                </View>
            </Swiper>
        </View>
  );


export const Swiper2 = () => (
          <View style={{width:width,height:200, marginBottom:20}}>
              <Swiper
                  autoplay
                  style={{height:200}} 
                  paginationStyle={{ position: "absolute", top: undefined, bottom: -15 }}
                  
              >
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  <View style={{flex:1}}>
                      <Image style={styles.image} source={require("./../assets/swiper-1.png")} />
                  </View>
                  
              </Swiper>
          </View>
    );
  

  const styles = StyleSheet.create({
    image:{
        flex: 1,
        height: null, 
        width: null, 
        resizeMode: 'contain', 
        borderWidth: 0.1, 
        borderColor: '#D3D3D3'
    }
  })
  
 