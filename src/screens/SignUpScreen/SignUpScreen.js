import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import { db } from "../../Core/Config";
import {doc , setDoc } from 'firebase/firestore'
import Moment from "moment";


const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
  const { control, handleSubmit, watch } = useForm();
  const pwd = watch("password");
  const navigation = useNavigation();
  const date = Moment().format("MM/DD/YYYY");


  const onRegisterPressed = async (data) => {
    const { username,password, name } = data;
    try {
      await Auth.signUp({
        username, //email
        password,
        attributes: {
          name,
          preferred_username: username,
          email:username
        },
      });
      navigation.navigate("ConfirmEmailScreen" ,{username});
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

  const myDoc = doc(db,"User",username);
  const docData = {
    "name": name ,
    "time" : date ,
  }

  setDoc(myDoc,docData)

  .then(() => {

  })

  .catch((error)=>{
    alert(error.message)
  })

  };
  const onPressAccount = () => {
    navigation.navigate("SignIn");
  };


  return (
    <View style={styles.root}>
      <Text style={styles.title}>Create an account</Text>

      <CustomInput
        name="name"
        control={control}
        placeholder="Name"
        rules={{
          required: "Name is required",
        }}
      />

      {// <CustomInput
      //   name="username"
      //   control={control}
      //   placeholder="Username"
      //   rules={{
      //     required: "Username is required",
      //     minLength: {
      //       value: 5,
      //       message: "Username should be at least 5 characters long",
      //     },
      //     maxLength: {
      //       value: 15,
      //       message: "Username should be max 15 characters long",
      //     },
      //   }}
      // />
      }

      <CustomInput
        name="username"
        control={control}
        placeholder="Email"
        rules={{
          required: "Email is required",
          pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
        }}
      />

      <CustomInput
        name="password"
        control={control}
        placeholder="Password"
        secureTextEntry
        rules={{
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password should be at least 8 characters long",
          },
        }}
      />

      <CustomInput
        name="password-repeat"
        control={control}
        placeholder="PasswordRepeat"
        secureTextEntry
        rules={{
          required: "Password is required",
          validate: (value) => value === pwd || "Password do not match",
        }}
      />

      <CustomButton
        text="Register "
        onPress={handleSubmit(onRegisterPressed)}
      />

      <Text style={styles.text}>
        {" "}
        By registering, you confirm that you accept ourcc
        <Text style={styles.link}>
          terms of Use{" "}
        </Text>
        and{" "}
        <Text style={styles.link}>
          Privacy Policy
        </Text>
      </Text>

      <CustomButton
        text="Have an account? Sign In"
        onPress={onPressAccount}
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

export default SignUpScreen;
