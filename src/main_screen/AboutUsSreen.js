import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  Image
} from "react-native";
import { Auth } from "aws-amplify";
import CustomButton from "../components/CustomButton";
import { db } from "../Core/Config.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import moment from "moment";

const DATA = [{}];
const UsersList = [];
let y = 1;
let z = 1;
let x = 0;
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

function AboutUsSreen({ route }) {
  const [days, setDays] = useState("");
  const [mins, setMins] = useState("");
  const [hrs, setHrs] = useState("");
  const [sec, setSec] = useState("");
  const image = require("../../assets/images/TBG.png");
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(DATA);
  const [Users, setUsers] = useState(UsersList);
  const email = route.params.email;
  Read();
  setInterval;
  // setInterval(() => {
  //   if (x == 0) return;
  //   SubtrackDate();
  // }, 3000);

  function Read() {
    if (y == 0) return;

    const myDoc = doc(db, "User", email);
    getDoc(myDoc)
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          if (snapshot.data() != null) {
            setTime(snapshot.data());
            y = 0;
            SubtrackDate();
            // if(z == 1){
            //   x = 1;
            //   z = 0;
            //   console.warn(z)
            // }
            

            return;
          } else {
            alert("No data");
            setTime(DATA);
            return;
          }
        } else {
          alert("No Doc Found");
          return;
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert("No data");
        return;
      });
  }

  function SubtrackDate() {
    var currentDate = new Date();
    var BeforeCurrentDate = new Date(time.time);
    var duration = Math.abs(currentDate - BeforeCurrentDate);
    var Days = Math.floor(duration / (1000 * 3600 * 24));
    var Hours = Math.floor((duration / (1000 * 3600)) % 24);
    var minute = Math.floor((duration / (1000 * 60)) % 60);
    var seconds = Math.floor((duration / 1000) % 60);
    if(Days != null){
      setDays(Days);
      setHrs(Hours);
      setMins(minute);
      setSec(seconds);
    }

  }

  function resetcount() {
    const newTime = moment().format();
    const myDoc = doc(db, "User", email);

    const docData = {
      name: email,
      time: newTime,
    };
    setDoc(myDoc, docData)
      .then(() => {})

      .catch((error) => {
        alert(error.message);
      });
    y = 1;
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <View style={{ width: "100%", height: 350, marginTop: -200 }}>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={[styles.image, { marginTop: -15, alignItems: "center" }]}
          >
            <Text
              style={[
                styles.headtext,
                styles.shadowProp,
                { fontSize: 47, marginTop: 237, marginLeft: 0 },
              ]}
            >
              Survive
            </Text>
          </ImageBackground>
        </View>

        <View
          style={[
            {
              backgroundColor: "#FFFFFF",
              width: "95%",
              height: 300,
              borderRadius: 25,
              bottom: "-5%",
             
              alignItems:'center'
            },
            styles.shadowProp,
          ]}
        >

        <Image source={require("../../assets/images/clock.png")} style={{width:70,height:70,margin:25}} 

        />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={styles.viewday}>
                <Text style={[styles.daycontent, { fontSize: 50 }]}>
                  {days}
                </Text>
                <Text style={styles.daycontent}>Day</Text>
              </View>

              <View style={styles.viewday}>
                <Text style={[styles.daycontent, { fontSize: 50 }]}>{hrs}</Text>
                <Text style={styles.daycontent}>Hr</Text>
              </View>

              <View style={styles.viewday}>
                <Text style={[styles.daycontent, { fontSize: 50 }]}>
                  {mins}
                </Text>
                <Text style={styles.daycontent}>Min</Text>
              </View>

            </View>
          </View>
        </View>
        <View style={{marginTop:-30}}>
        <Button
              title="Refresh"
              onPress={() => {SubtrackDate()
              Alert.alert("Time is current")}
              }
            />
        </View>
        <View style={{ width: "70%" }}>
          <ModalPopup visible={visible}>
            <View>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                Are you sure?
              </Text>
            </View>

            <View style={styles.buttonsView}>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => {
                  resetcount();
                  setVisible(false);
                }}
              >
                <View style={{ marginTop: 25 }}>
                  <Text style={[styles.text, { color: "blue", fontSize: 18 }]}>
                    Yes
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.touchableOpacity}
                onPress={() => setVisible(false)}
              >
                <View style={{ marginTop: 25 }}>
                  <Text style={[styles.text, { color: "blue", fontSize: 18 }]}>
                    No
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </ModalPopup>
          <View style={{ width: "100%", marginTop: 100 }}>

              <CustomButton
              text="Reset Days"
              type="SECONDARY"
              onPress={() => setVisible(true)}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default AboutUsSreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowColor: "#171717",
    shadowOffset: { width: 1, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  contenttext: {
    fontFamily: "HAIDUO1T",
    color: "#000000",
    fontSize: 17,
    marginTop: "-20%",
  },
  detailtxt: {
    fontFamily: "HAIDUO1T",
    color: "#7C828A",
    fontSize: 16,
  },
  viewcontent: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    flex: 1,
    marginTop: "-8%",
  },
  txtinPi: {
    fontSize: 18,
    fontFamily: "HAIDUO1T",
    color: "#000000",
  },
  modalbg: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  buttonsView: {
    width: "100%",
    flexDirection: "row",
  },
  touchableOpacity: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
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
  daycontent: { fontSize: 30, fontFamily: "HAIDUO1T" ,marginTop:-8},
  viewday: {
    alignItems: "center",
    width: 100,
    height: 100,
    borderColor: "#000",
    borderWidth: 3,
    justifyContent: "center",
    borderRadius: 15,
    marginHorizontal:5
  },
});
