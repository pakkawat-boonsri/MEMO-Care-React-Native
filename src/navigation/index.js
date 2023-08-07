import { Button, View, Text, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen.js";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import App from "../screens/maincoreapp/index";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen}></Stack.Screen>
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ConfirmEmailScreen"
          component={ConfirmEmailScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen
          name="NewPasswordScreen"
          component={NewPasswordScreen}
        ></Stack.Screen>
        <Stack.Screen name="App" component={App}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
