import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
const NewPasswordScreen = () => {
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const onSubmitPress = async (data) => {
    try {
      await Auth.forgotPasswordSubmit(data.username , data.code , data.password);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };
  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={[styles.root,{justifyContent:'center',alignItems:"center",}]}>
      <Text style={styles.title}>Reset your password</Text>

      <CustomInput
        name="username"
        control={control}
        placeholder="Email"
        rules={{ required: "Username is required" }}
      />

      <CustomInput
        name="code"
        control={control}
        placeholder="Code"
        rules={{ required: "Code is required" }}
      />

      <CustomInput
        name="password"
        control={control}
        secureTextEntry
        placeholder="Enter your new password"
        rules={{
          required: "New password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      <CustomButton text="Submit " onPress={handleSubmit(onSubmitPress)} />

      <CustomButton
        text="Back to Sign In"
        onPress={onSignInPress}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
    marginTop:"50%"
    
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    margin: 10,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
});

export default NewPasswordScreen;
