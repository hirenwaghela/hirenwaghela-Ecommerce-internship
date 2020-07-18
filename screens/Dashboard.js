import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
  } from 'react-native-chart-kit';
  
  const data = {
    labels: ['Progress', 'Goal'],
    datasets: [{
      data: [ 74, 276 ]
    }]
  }

const width = Dimensions.get('screen').width

export default class Dashboard extends React.Component {
  render(){
    return (
        <View style={{flex:1, backgroundColor:"#fff"}}>
          
          <View style={{flex:1,backgroundColor:"#77dd77", borderBottomLeftRadius:50, borderBottomRightRadius:50}}>
              <View style={{paddingTop:50}}>
                  <View style={{alignItems:"center"}}>
                    <Text style={{color:"#fff", fontSize:23, marginBottom:20}}>Daily-Fitness</Text>
                  </View>
                  
                  <View style={{flexDirection:"row",width:width, paddingHorizontal:30, justifyContent: "space-between"}}>
                        <TouchableOpacity style={{height:50, width:50, borderRadius:25, marginTop:25, alignItems:"center", justifyContent:"center", backgroundColor: 'green'}}>
                            <AntDesign name="edit" size={24} color="#fff" />
                        </TouchableOpacity>
                        <View style={{height:116, width:116,borderRadius:70, padding:3, borderColor:"#fff", borderWidth:5}}>
                            <Image
                                style={{ height:100, width:100, borderRadius:60}}
                                source={require("./../assets/profile-pic.jpg")}
                                />
                        </View>
                        <TouchableOpacity style={{height:50, width:50, borderRadius:25, marginTop:25, alignItems:"center", justifyContent:"center", backgroundColor: 'green'}}>
                            <AntDesign name="setting" size={24} color="#fff" />
                        </TouchableOpacity>

                  </View>
                  <View style={{alignItems:"center"}}>
                    <Text style={{color:"#fff", fontSize:15, marginVertical:20}}>mail.com</Text>
                  </View>
                  
                  <View style={{flexDirection:"row", width:width, paddingHorizontal:30, justifyContent: "space-between"}}>
                    <View>
                        <Text style={{color:"#fff", fontSize:17, fontWeight:"bold"}}>74  Cal</Text>
                        <Text style={{color:"#fff", fontSize:14}}>Progress</Text>
                    </View>
                    <View style={{borderLeftWidth: 2, borderLeftColor: 'white'}}></View>
                    <View style={{marginTop:5}}>
                        <AntDesign name="fork" size={30} color="#fff" />
                    </View>
                    <View style={{borderLeftWidth: 2, borderLeftColor: 'white'}}></View>
                    <View>
                        <Text style={{color:"#fff", fontSize:17, fontWeight:"bold"}}>276  Cal</Text>
                        <Text style={{color:"#fff", fontSize:14}}>Goal</Text>
                    </View>
                  </View>
              </View>
              
          </View>
          
          <View style={{flex:1, paddingHorizontal:20 }}>
            <View style={{marginTop:40, marginBottom:30,alignItems:"center"}}>
                <Text style={{fontSize:20, fontWeight:"bold"}}>Today's Workout</Text>
            </View>
            <BarChart
                data={data}
                width={Dimensions.get('window').width - 40} // from react-native
                height={220}
                fromZero={true}
                yAxisSuffix='cal'
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(23,32,42, ${opacity})`,
                     
                }}
                
            />
    
          </View>
          
        </View>
      );
  }
    
}

