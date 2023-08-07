
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/main_screen/HomeScreen';
const Drawer = createDrawerNavigator();

const Drawerscreen = () => {
  return (
      <NavigationContainer>
       <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Navigation" component={HomeScreen} options={{ headerShown: false}} />
      </Drawer.Navigator>
      </NavigationContainer>
  );
}

export default Drawerscreen;
