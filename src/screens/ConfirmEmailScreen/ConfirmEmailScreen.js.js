import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { Auth } from "aws-amplify";

const ConfirmEmailScreen = () => {
  const route = useRoute();
  const { control, handleSubmit , watch} = useForm({
    defaultValues: { username: route?.params?.username},
  });
  const username = watch('username');

  const navigation = useNavigation();

  const onComfirmPressed = async (data) => {

    try {
      await Auth.confirmSignUp(data.username , data.code);
      navigation.navigate("SignIn");
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

    // console.warn(data);
    // navigation.navigate("SignIn");
  };
  const onSignInPress = () => {
    navigation.navigate("SignIn");
  };
  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert("Success", 'Code was resent to your email');
    } catch (e) {
      Alert.alert("Oops", e.message);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>

      <CustomInput
        name="username"
        control={control}
        placeholder="Username"
        rules={{ required: "Username is required" }}
      />

      <CustomInput
        name="code"
        control={control}
        placeholder="Enter your confirmation code"
        rules={{ required: "Confirm code is required" }}
      />

      <CustomButton text="Confirm " onPress={handleSubmit(onComfirmPressed)} />

      <CustomButton
        text="Resend code"
        onPress={onResendPress}
        type="SECONDARY"
      />
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

export default ConfirmEmailScreen;
