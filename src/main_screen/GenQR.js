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
  Modal,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons, FontAwesome } from "@expo/vector-icons";

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

const GenQR = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("");
  const [visible, setVisible] = useState(false); //ตัวทำให้หายตัววววว
  const alertnotinputlocation = () => {
    if (location === "") {
      alert("Please Enter Location");
    } else {
      alert(location);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ModalPopup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.modalheader}>
            <MaterialIcons
              name="close"
              size={30}
              color="gray"
              onPress={() => setVisible(false)}
              style={{ marginBottom: 5 }}
            />
          </View>
          <Text style={{fontFamily: "HAIDUO1T", fontSize: 50, marginTop: 30 }}>Memo Care</Text>
          <View
            style={[
              styles.shadowProp,
              {
                marginHorizontal: 15,
                borderColor: "gray",
                width: 290,
                height: 290,
                //borderWidth: 1,
                borderRadius: 15,
                padding: 10,
                marginVertical: 30,
                top: 10,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
              },
            ]}
          >
            <Image
              style={{ height: 270, width: 270 }}
              source={{
                uri:
                  "https://api.qrserver.com/v1/create-qr-code/?size=270x270&data=" +
                  location,
              }}
            />
          </View>
          <Text style={{fontFamily: "Opun-Regular",fontSize: 20, marginTop: 10 }}>{location}</Text>
          <Text style={{ marginTop: "20%", color: "gray" }}>
            - Please Take A Screenshot -
          </Text>
        </View>
      </ModalPopup>
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
              size={40}
              color="#3c2980"
              style={styles.addicon}
            />
            <Text
              style={
                ( styles.shadowProp, styles.textheadercontent)
              }
            >
              Location
            </Text>
          </View>
          {/* Text Input */}
          <View style={{ alignItems: "center" ,marginTop:10}}>
            <TextInput
              style={[styles.inputtext, styles.shadowProp]}
              placeholder="   Enter Location..."
              onChangeText={(value) => setLocation(value)}
              value={location}
              maxLength={30}
            />
          </View>
          {/* Text Input */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <TouchableOpacity
                style={[styles.touchstyle, styles.shadowProp]}
                onPress={() => setVisible(true)}
              >
                <Text style={{fontFamily: "HAIDUO1T", color: "#3c2980" }}>GENERATE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.touchstyle, styles.shadowProp]}
                onPress={() => navigation.navigate("Timeline")}
              >
                <Text style={{fontFamily: "HAIDUO1T", color: "#3c2980" }}>CANCEL</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* Save Cancel*/}
        </View>
      </View>
    </View>
  );
};

export default GenQR;

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
    //fontFamily: "HAIDUO1T",
    color: "#FFFFFF",
    fontFamily: "HAIDUO1T",
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
    padding: 20,
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
    top: 2,
  },
  headercontent: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: -25,
    marginTop: "20%",
  },
  textheadercontent: {
    fontSize: 30,
    marginLeft: "20%",
    fontWeight: "bold",
    color: "#3c2980",
    fontFamily: "HAIDUO1T",
  },
  modalheader: {
    width: "100%",
    height: 30,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    
  },
  modalbg: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    height: "80%", //lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
    backgroundColor: "#eeeaf8",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
});
