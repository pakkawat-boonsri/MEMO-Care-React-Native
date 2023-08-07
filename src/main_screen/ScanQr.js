import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from "../Core/Config";
import Moment from "moment";


const ModalPopup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);
  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal} animationType="slide">
      <View style={styles.modalbg}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

const ScanQr = ({ route }) => {
  const navigation = useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("");
  const [detail, setDetail] = useState("");
  const [data, setdata] = useState(null)
  const emailn = route.params.email
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  
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
    timeline_data = {data:[{"time":Moment().format('LT'),"station":text,"detail":detail}]}
    // console.warn("NULL")
   }else{
    timeline_data.data.push({"time":Moment().format('LT'),"station":text,"detail":detail})
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



  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    // console.log("Type: " + type + "\nData: " + data);
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }
  // Return the View
  return (
    <View style={styles.container}>
      <View style={{ start: "39%", bottom: "16%" }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Timeline");
          }}
        >
          <Ionicons name="md-close" size={35} color="#3c2980" />
        </TouchableOpacity>
      </View>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      {/* <Text style={styles.maintext}>{text}</Text> */}
      <ModalPopup visible={scanned}>
        <View style={{ alignItems: "center", height: "100%", width: "100%" }}>
          {/* Your Location */}
          <View style={(styles.headercontent, { marginStart: "-60%" })}>
            <Text style={styles.textheadercontent}>Your Location</Text>
          </View>
          <Text style={styles.textLocation}>{text}</Text>
          <View style={(styles.headercontent, { marginStart: "-60%",top:5 })}>
            <Text style={[styles.textheadercontent,{marginLeft:70}]}>Your Detail</Text>
          </View>
          {/* Input Detail */}
          <View style={styles.headercontent}>
            <TextInput
              style={[
                styles.inputtext,
                { textAlignVertical: "top" },
                styles.shadowProp,
              ]}
              maxLength={100}
              multiline={true}
              editable
              numberOfLines={3}
              placeholder="   Enter your detail..."
              onChangeText={(value) => setDetail(value)}
              value={detail}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              style={[styles.touchstyle, styles.shadowProp]}
              onPress={() => {Create() 
              Alert.alert("SAVE");
              navigation.navigate("Timeline")
              }}
            >
              <Text style={{color:'#3c2980',fontFamily: "HAIDUO1T",}}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.touchstyle, styles.shadowProp]}
              onPress={() => setScanned(false)}
            >
              <Text style={{color:'#3c2980',fontFamily: "HAIDUO1T",}}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalPopup>
      {
        scanned
        // (
        //   <Button
        //     title={"Scan again?"}
        //     onPress={() => {
        //       setScanned(false), navigation.navigate("Timeline");
        //     }}
        //     color="tomato"
        //   />
        // )
      }
    </View>
  );
};

export default ScanQr;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeaf8",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  modalbg: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    height: "50%",
    backgroundColor: "#eeeaf8",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  modalheader: {
    width: "100%",
    height: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  headercontent: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  textheadercontent: {
    fontSize: 25,
    marginLeft: "20%",
    fontWeight: "bold",
    color: "#3c2980",
    fontFamily: "HAIDUO1T",
  },
  inputtext: {
    borderColor: "gray",
    width: "85%",
    height: 150,
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginTop: 20,
    fontSize: 15,
    backgroundColor: "#fff",
    fontFamily: "Opun-Regular",
  },
  textLocation: {
    fontSize:19,
    fontWeight:'bold',
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign:'left',
    fontFamily: "Opun-Regular",
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
  touchstyle: {

    marginHorizontal: 15,
    borderColor: "gray",
    width: "30%",
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginVertical: 30,
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    fontFamily: "HAIDUO1T",
  },
});
