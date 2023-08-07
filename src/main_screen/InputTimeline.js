import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from "../Core/Config";
import Moment from "moment";

 


const InputTimeline = ({ route }) => {

  const navigation = useNavigation();
  const [location, setLocation] = useState("");
  const [detail, setDetail] = useState("");
  const emailn = route.params.email
   // Storing User Data
   const [userDoc, setUserDoc] = useState(null)
   // Update Text
   const [data, setdata] = useState(null)

   function cal2 (selectedDate) {
    if(selectedDate[8] == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 8 || 9){
      // console.warn(selectedDate.toString().substring(8, 0) + selectedDate.toString().substring(9, 15))
      // console.warn(selectedDate.toString().substring(8, 0) +"0"+ selectedDate.toString().substring(8, 14))
      return selectedDate.toString().substring(8, 0) +"0"+ selectedDate.toString().substring(8, 14)
    }
    // Tue Mar 1 2022
    else
    return selectedDate
  };
 
const setup = (data2) => {
  let sum = Moment().format('llll').replace(",", "");
  sum = sum.replace(",", "")
  sum = sum.substring(15, 0)
  // console.warn(data);

  const myDoc = doc(db, "User", emailn ,"timeline",cal2(sum))

  let timeline_data = data2

  if(data2 == null){
    timeline_data = {data:[{"time":Moment().format('LT'),"station":location,"detail":detail}]}
    // console.warn("NULL")
   }else{
    timeline_data.data.push({"time":Moment().format('LT'),"station":location,"detail":detail})
   }

       //  timeline_data.data.push({"time":"01:00","station":"LH5"})
  //  MARK: Creating New Doc in Firebase
  //  Before that enable Firebase in Firebase Console
  //  const myDoc = doc(db, "User", emailn ,"timeline",sum)
 
   // Your Document Goes Here
   // console.warn(sum)
   setDoc(myDoc, timeline_data)
     // Handling Promises
     .then(() => {
       // MARK: Success
       
     })
     .catch((error) => {
       // MARK: Failure
       alert(error.message)
     })
}

 const Create = () => {
   let sum = Moment().format('llll').replace(",", "");
   sum = sum.replace(",", "")
   sum = sum.substring(15, 0)
   // console.warn(user);
 
   const myDoc = doc(db, "User", emailn ,"timeline",cal2(sum))
   setdata(null)

   getDoc(myDoc)
     // Handling Promises
     .then((snapshot) => {
       // MARK: Success
       if (snapshot.exists) {
         setdata(snapshot.data())
          setup(snapshot.data())
       }
       else {
         alert("No Doc Found")
       }
     })
     .catch((error) => {
       // MARK: Failure
       alert(error.message)
     })


 

 }



  const alertnotinputlocation = () => {
    if (location === "") {
      alert("Please Enter your Location");
    } else {
      Alert.alert("SAVE");
      Create();
      navigation.navigate("Timeline")
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 2,
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "#eeeaf8",
        }}
      >
        <View style={{ width: "100%", height: 350, marginTop: -200 }}>
          <ImageBackground
            source={require("../../assets/images/TBG.png")}
            resizeMode="cover"
            style={[styles.image, { marginTop: -15 }]}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.headtext,
                  styles.shadowProp,
                  { fontSize: 35, marginBottom: -230 },
                ]}
              >
                TimeLine
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            width: "95%",
            //backgroundColor: "yellow",
            marginTop: 20,
          }}
        >
          <View style={styles.headercontent}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#3c2980"
              style={styles.addicon}
            />
            <Text
              style={
                (styles.headtext, styles.shadowProp, styles.textheadercontent)
              }
            >
              Add Location
            </Text>
          </View>
          {/* Text Input */}
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[styles.inputtext, styles.shadowProp]}
              placeholder="   Enter your Location..."
              onChangeText={(value) => setLocation(value)}
              value={location}
              maxLength={30}
            />
          </View>
          <View style={[styles.headercontent, { marginTop: 20 }]}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color="#3c2980"
              style={styles.addicon}
            />
            <Text
              style={
                (styles.headtext, styles.shadowProp, styles.textheadercontent)
              }
            >
              Add Details
            </Text>
          </View>
          {/* Text Input */}
          <View style={{ alignItems: "center" }}>
            <TextInput
              style={[
                styles.inputtext,
                { height: 150, textAlignVertical: "top" },
                styles.shadowProp,
              ]}
              maxLength={100}
              multiline={true}
              editable
              //numberOfLines={3}
              placeholder="   Enter your detail..."
              onChangeText={(value) => setDetail(value)}
              value={detail}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          {/* Save Cancel*/}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[styles.touchstyle, styles.shadowProp]}
              onPress={alertnotinputlocation}
            >
              <Text style={{color:'#3c2980',fontFamily: "HAIDUO1H",}}>SAVE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.touchstyle, styles.shadowProp]}
              onPress={() => navigation.navigate("Timeline")}
            >
              <Text style={{color:'#3c2980',fontFamily: "HAIDUO1H",}}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default InputTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  headtext: {
    fontFamily: "HAIDUO1T",
    color: "#FFFFFF",
  },
  shadowProp: {
    // shadowColor: "#171717",
    // shadowOffset: { width: -2, height: 6 },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  inputtext: {
    borderColor: "gray",
    width: "85%",
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
    fontSize: 15,
    backgroundColor: "#fff",
    fontFamily: "Opun-Regular",
  },
  touchstyle: {
    marginHorizontal: 15,
    borderColor: "gray",
    width: "25%",
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginVertical: 30,
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  addicon: {
    left: 60,
    top: 3,
    
  },
  headercontent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: -25,
  },
  textheadercontent: {
    fontSize: 25,
    marginLeft: "20%",
    fontWeight: "bold",
    color: "#3c2980",
    fontFamily: "HAIDUO1H",
  },
});
