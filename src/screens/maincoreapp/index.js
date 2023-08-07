import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Dimensions ,Animated } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import MemoScreen from "../../main_screen/MemoScreen";
import HomeScreen from "../../main_screen/HomeScreen";
import TimeLineScreen from "../../main_screen/TimeLineScreen";
import AboutUsSreen from "../../main_screen/AboutUsSreen";
import { AddTimelineNavigator } from "../../main_screen/CustomNavigator";

import { Colors } from "react-native/Libraries/NewAppScreen";
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useState } from "react";
import { Auth } from "aws-amplify";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();




function App({ navigation, route }) {





  let [fontsLoaded] = useFonts({
    'HAIDUO1H': require("../../../assets/font/HAIDUO1H.ttf"),
    'HAIDUO1T': require("../../../assets/font/HAIDUO1T.ttf"),
    'Opun-Regular': require('../../../assets/font/Opun-Regular.ttf')

  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const tabOffsetValue = new Animated.Value(0);

//     <NavigationContainer >

  const emailn = route.params.email
// </NavigationContainer>
  return (



 <View style={{width:"100%",height:"100%"}}>
 {/* <View style={{width:"100%",height:"20%",justifyContent:'center'}}><Text>{route.params.email}</Text></View> */}



      <Tab.Navigator
      screenOptions={({route}) =>({
        tabBarActiveTintColor: "#967DEA",
        tabBarInactiveTintColor:"#908F8F",
        tabBarLabelStyle:{
          fontFamily:'HAIDUO1T',
    fontSize: 10
    ,marginBottom:"-10%"

        }

      }
      )

      }>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          style={{}}
          options={{

            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../../assets/images/home_icon3.png")}
                resizeMode="contain"
                style={[
                  styles.icon_bar,
                  {
                    tintColor: focused ? "#967DEA" : "#908F8F"
                  },

                ]}
              />
            ),
          }} listeners={({navigation,route}) =>({
            tabPress: e =>{
              Animated.spring(tabOffsetValue,{
                toValue:0,
                useNativeDriver:true
              }).start()
            }
          })}
        />

        <Tab.Screen
          name="TimeLine"
          component={AddTimelineNavigator}
          initialParams={{email:emailn}}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../../assets/images/calendar_icon3.png")}
                resizeMode="contain"
                style={[
                  styles.icon_bar,
                  {
                    tintColor: focused ? "#967DEA" : "#908F8F",
                  },
                ]}
              />
            ),
          }}
          listeners={({navigation,route}) =>({
            tabPress: e =>{
              Animated.spring(tabOffsetValue,{
                toValue:getWidth() *1,
                useNativeDriver:true
              }).start()
            }
          })}

        />
        <Tab.Screen
          name="Memo"
          component={MemoScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../../assets/images/memo_icon3.png")}
                resizeMode="contain"
                style={[
                  styles.icon_bar,
                  {
                    tintColor: focused ? "#967DEA" : "#908F8F",
                  },
                ]}
              />
            ),
          }}
          listeners={({navigation,route}) =>({
            tabPress: e =>{
              Animated.spring(tabOffsetValue,{
                toValue:getWidth()*2,
                useNativeDriver:true
              }).start()
            }
          })}
        />
        <Tab.Screen
          name="Survive"
          component={AboutUsSreen}
          initialParams={{email:emailn}}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Image
                source={require("../../../assets/images/about_icon3.png")}
                resizeMode="contain"
                style={[
                  styles.icon_bar,
                  {
                    tintColor: focused ? "#967DEA" : "#908F8F",
                  },
                ]}
              />
            ),
          }}
          listeners={({navigation,route}) =>({
            tabPress: e =>{
              Animated.spring(tabOffsetValue,{
                toValue:getWidth()*3,
                useNativeDriver:true
              }).start()
            }
          })}
        />
      </Tab.Navigator>


      <Animated.View style={{
        width:getWidth(),
        height:5,
        backgroundColor:'#FFF',
        position:'absolute',
        bottom:73.5,

        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        transform:[
          {translateX: tabOffsetValue }
        ]

      }}>

      </Animated.View>

 </View>
  );
}

function getWidth(){
  let width = Dimensions.get("window").width

  width = width
  return width/4
}


export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  icon_bar: {
    width: 25,
    height: 25,
    marginBottom:"-15%"

  },
  txt:{
    fontFamily: 'HAIDUO1T',
     }
});

