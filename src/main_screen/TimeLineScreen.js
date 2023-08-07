import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CalendarStrip from "react-native-calendar-strip";
import Moment from "moment";
import { db } from "../Core/Config";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons_Material from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons_FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

const DATA = [{}];

//////////////////////////////////////////////////////// ModalPopup
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
//////////////////////////////////////////////////////// end ModalPopup

const TimeLineScreen = ({ route }) => {


  
  const emailn = route.params.email
  
  ////////////////////////////////////////////////////////////// Hook stark
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false); //ตัวทำให้หายตัววววว
  // const [da, setda] = useState(1);
  const [datatimeline, setdatatimeline] = useState(DATA);
  const [datetime, setdatetime] = useState("");
  const [filterData, setfilterData] = useState(DATA);

  setup()

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
  
  
  function setup() {
    if(route.params.da){
    let selectedDate = Moment().format('llll').replace(",", "");
    selectedDate = selectedDate.replace(",", "")
    selectedDate = cal2(selectedDate.substring(15, 0))

    //  console.warn(selectedDate)

    const myDoc = doc(db, "User", emailn, "timeline", selectedDate);
    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          if (snapshot.data() != null) {
            // console.warn(snapshot.data())
            setdatatimeline(snapshot.data())
            route.params.da = 0
            return ;
            // return snapshot.data();
            // console.warn(datatimeline.data)
          } else {
            //alert("No data");
            route.params.da = 0
            return DATA;

            // console.warn(datatimeline.data)
          }
          // console.warn(snapshot.data())

          //  setdatatimeline()

          // console.warn(datatimeline.data)
        } else {
          alert("No Doc Found");
          route.params.da = 0
          return DATA;
        }
      })
      .catch((error) => {
        // MARK: Failure
        //alert("No data");
        route.params.da = 0
        return DATA;
      });  
    }
  }

  const cal = (selectedDate) => {
    return selectedDate.toString().substring(15, 0);
  };

 

  const Read = (selectedDate) => {
   

    const myDoc = doc(db, "User", emailn, "timeline", selectedDate);

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists) {
          
          if (snapshot.data() != null) {
            setdatatimeline(snapshot.data());
            // return snapshot.data();
            // console.warn(datatimeline.data)
          } else {
            // console.warn(snapshot.data())
            // console.warn("2")
            alert("No data");
            setdatatimeline(DATA);
            return ;
            // console.warn(datatimeline.data)
          }
          // console.warn(snapshot.data())

          //  setdatatimeline()

          // console.warn(datatimeline.data)
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        // MARK: Failure
       // alert("No data");
      });
  };


  

  const renderItem = ({ item }) => {
    return (
      
      <View
        style={[
          {
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            backgroundColor: "#FFFFFF",
            borderRadius: 15,
            width: 345,
            height: 120,
            marginTop: "5%",
            borderColor: "#FFF",
            marginLeft: "1%",
            // borderWidth:3
          },
          styles.shadowProp,
        ]}
      >
        <View style={{ height: 60, width: "100%", flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#6743E1",
              width: 128,
              height: 54,
              borderTopLeftRadius: 15,
              borderBottomRightRadius: 15,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Ionicons_Material
              name={"clock-time-five-outline"}
              size={25}
              color={"#FFF"}
              style={{ marginRight: 5, marginTop: -2 }}
            />
            <Text style={[styles.txt, { fontSize: 18, color: "#FFF" }]}>
              {item.time}
            </Text>
          </View>
          <View style={{ justifyContent: "center" }}>
            <Text
              style={[
                styles.txt,
                { fontSize: 15, marginLeft: 10, marginTop: -5 },
              ]}
            >
              {item.station}
            </Text>
          </View>
        </View>

        <View style={{ height: 60, width: "100%", justifyContent: "center" }}>
          <Text style={[styles.txt, { fontSize: 15, marginLeft: 20 }]}>
            Detail: {item.detail}
          </Text>
        </View>
      </View>
    );
  };

  const [date, setDate] = useState(new Date(Moment()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // console.warn(cal(selectedDate))
    // console.warn(cal(selectedDate))
    selectedDate = cal(selectedDate)
    // console.warn(selectedDate)
    setdatetime(selectedDate);
    Read(selectedDate);

    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <View
        style={{
          height: 130,
          backgroundColor: "#6743E1",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            marginTop: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.headtext, styles.shadowProp, { fontSize: 35 }]}>
            Timeline
          </Text>
        </View>
      </View>

      <View
        style={{
          width: "100%",
          height: 65,
          backgroundColor: "#6743E1",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          // borderTopWidth:1,
          borderColor: "#FFF",
        }}
      >
        {/* view popup */}
        <ModalPopup visible={visible}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.modalheader}>
              <MaterialIcons
                name="close"
                size={30}
                color="#3c2980"
                onPress={() => setVisible(false)}
                style={{ marginBottom: 5 }}
              />
            </View>
          </View>
          <View style={styles.iconview}>
            <TouchableOpacity
              style={styles.iconcontainer}
              onPress={() => {
                navigation.navigate("ScanQr"), setVisible(false);
              }}
            >
              <MaterialIcons name="qr-code-scanner" size={80} color="#3c2980" />
              <Text style={styles.iconText}>Scan QR CODE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconcontainer}
              onPress={() => {
                navigation.navigate("Input"), setVisible(false);
              }}
            >
              <Ionicons_FontAwesome
                name="edit"
                size={75}
                color="#3c2980"
                style={{ marginLeft: 15, marginTop: 7 }}
              />
              <Text style={styles.iconText}>EDIT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.iconview}>
          <TouchableOpacity
            onPress={()=> {navigation.navigate("GenQr"),setVisible(false)}}
            style={{
              justifyContent: "center",
              //paddingStart:'10%',
              alignItems: "center",
              marginHorizontal: 7,
              marginVertical: "-3%",
              height: 50,
              width: "55%",
              borderRadius: 20,
              //borderWidth: 2,
              backgroundColor: "#ffff",
              flexDirection:'row'
            }}
          >
            <MaterialIcons name="qr-code-2" size={20} color="#3c2980" />
            <Text style={{color: "#3c2980",paddingHorizontal:5}}>Create QR code</Text>
          </TouchableOpacity>
        </View>
        </ModalPopup>
        {/* จบ view popup */}


        {/* <Text style={[{ color: "#FFF", fontFamily: "HAIDUO1T", fontSize: 20 }]}>
          {"  "}
          SelectedDate{"           "}
        </Text> */}
        <View
          style={[
            {
              width: 170,
              height: 44,
              backgroundColor: "#FFF",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 5,
              flexDirection: "row",
              marginLeft:10
            },
            styles.shadowProp,
          ]}
        >
          <Ionicons_Material
            name={"calendar-month"}
            size={30}
            color={"#000"}
            style={{ marginRight: 3 }}
          />
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange }
            themeVariant="light"
            style={{ width: 125, height: 50 }}
            
          />
        </View>

        <View
        >

          <TouchableOpacity onPress={() => setVisible(true)}     style={[
            {
              backgroundColor: "#FFF",
              width: 150,
              height: 43,
              borderRadius: 10,
              marginLeft: 50,
              marginRight:10,
              justifyContent: "center",
              alignItems: "center",
              flexDirection:'row'
            },
            styles.shadowProp,
          ]}> 

          <Ionicons
            name={"add"}
            size={30}
            color={"#000"}
            style={{ marginRight: 0 }}
          />

            <Text style={{fontFamily:"HAIDUO1T",fontSize:18}} >Add Timeline</Text>
          </TouchableOpacity>
        </View>
        {/* <Button
          title="R"
          onPress={() => Read(datetime)}
        /> */}
      </View>
      <View style={{ alignItems: "center", width: "100%", height: 570 }}>
      
        <FlatList
          data={datatimeline.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.time}
          scrollEnabled={true}
        />
      </View>
    </View>
  );
};

export default TimeLineScreen;

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
  txt: {
    fontFamily: "Opun-Regular",
  },
  modalbg: {
    flex: 1,
    backgroundColor: "rgba(128,128,128,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    height: "40%",
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
  iconview: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
  },
  iconcontainer: {
    justifyContent: "center",
    //paddingStart:'10%',
    alignItems: "center",
    marginHorizontal: 7,
    marginVertical: "9%",
    height: 165,
    width: "45%",
    borderRadius: 20,
    //borderWidth: 2,
    backgroundColor: "#ffff",
  },
  iconText: {
    fontSize: 13,
    color: "#3c2980",
    fontFamily: "HAIDUO1H",
  },
});

// const customDatesStylesFunc = (date) => {
//   // console.warn("day2:",Moment().utcOffset("GMT+7").format('L'))
//   let sum = Moment().format('llll').replace(",", "");
//   sum = sum.replace(",", "")
//   sum = sum.substring(15, 0)
//   //  date.toString()
//    let s = date.toString().substring(15, 0)
//   // sum = sum.replace("/", "-") .substring(10, 0) + "T05:00:00.000Z"

//   if (s == sum) {

//     return {
//       dateNameStyle: { color: "#eb144c", fontSize: 18, fontFamily: "HAIDUO1T" },
//       dateNumberStyle: {
//         color: "#eb144c",
//         fontSize: 18,
//         fontFamily: "HAIDUO1T",
//       },
//     };
//   } else if (date.isoWeekday() === 7) {
//     return {
//       dateNameStyle: { color: "#ffcdd2", fontSize: 18, fontFamily: "HAIDUO1T" },
//       dateNumberStyle: {
//         color: "#ffcdd2",
//         fontSize: 18,
//         fontFamily: "HAIDUO1T",
//       },
//     };
//   } else {
//     return {
//       dateNumberStyle: [{ fontSize: 18 }, styles.headtext],
//       dateNameStyle: [{ fontSize: 18 }, styles.headtext],
//     };
//   }
// };

// sum = sum.replace("/", "-") .substring(10, 0) + "T05:00:00.000Z"
// setInterval(() => {
//   const now = Moment().utcOffset('GMT+7').format('MMMM Do YYYY')
// }, 60000);
