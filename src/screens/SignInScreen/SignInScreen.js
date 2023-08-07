import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Alert
  , ActivityIndicator
} from "react-native";
import React, {useEffect , useState} from "react";
import Logo from "../../../assets/images/logo.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SignUpScreen from "../SignUpScreen/SignUpScreen";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import {Auth , Hub} from 'aws-amplify'



const SignInScreen = ({ navigation: { navigate } }) => {


  const { height } = useWindowDimensions();

  const [Loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSignInPressed = async (data) => {
    if (Loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await Auth.signIn(data.username, data.password);
      // // console.log(response);
      navigate('App', { email:data.username , name:data.name});
    } catch (e) {
      Alert.alert("Oops", e.message);
    }

    setLoading(false);

    // console.log(data);
  };
  const onForgetPasswordPressed = () => {
    navigate("ForgotPasswordScreen");
  };
  const onPressAccount = () => {
    navigate("SignUpScreen");
  };

  return (
    <View style={[styles.root,{justifyContent:'center',alignItems:"center"}]}>
        <View style={{height: height * 0.3 , width: "100%" , alignItems: 'center'}}>
        <Image
          source={Logo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        </View>
      <CustomInput
        name="username"
        placeholder="Email"

        control={control}
        rules={{ required: "Username is required" }}
      />
      <CustomInput
        name="password"
        placeholder="Password"
        secureTextEntry
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 5,
            message: "Password should be minimum 5 characters long",
          },
        }}
      />

      <CustomButton
        text={Loading ? "Loading..." : "Sign In"}
        onPress={handleSubmit(onSignInPressed)}
      />

      <CustomButton
        text="Forget password?"
        onPress={onForgetPasswordPressed}
        type="TERTIARY"
      />

      <CustomButton
        text="Don't have an account? Create one"
        onPress={onPressAccount}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 200,
  },
});
export default SignInScreen;
