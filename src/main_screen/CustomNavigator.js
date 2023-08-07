import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TimeLineScreen from './TimeLineScreen';
import ScanQr from './ScanQr';
import InputTimeline from './InputTimeline';
import GenQR from './GenQR';
const Stack = createStackNavigator();

const AddTimelineNavigator = ({ navigation, route }) => {

  const emailn = route.params.email
  
  return (

    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Timeline' component={TimeLineScreen} initialParams={{email:emailn ,da:1}} />
        <Stack.Screen name='ScanQr' component={ScanQr} initialParams={{email:emailn}} />
        <Stack.Screen name='Input' component={InputTimeline} initialParams={{email:emailn}} />
        <Stack.Screen name='GenQr' component={GenQR}/>
    </Stack.Navigator>
  )
}

export {AddTimelineNavigator}