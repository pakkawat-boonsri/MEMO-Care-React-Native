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
  Button,
} from "react-native";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const MemoScreen = () => {
  //   constructor(){
  //     super();
  //   }

  //   componentDidMount()
  //   {
  //     this.apiCall();
  //   }

  function loopsetup(value, respJson) {
    let sum = {
      province: "",
      new_case: "",
      total_case: "",
      new_death: "",
      total_death: "",
    };

    for (let i in respJson) {
      if (respJson[i].province == value) {
        return (sum = {
          province: respJson[i].province,
          new_case: respJson[i].new_case,
          total_case: respJson[i].total_case,
          new_death: respJson[i].new_death,
          total_death: respJson[i].total_death,
        });
      }
      // console.warn(respJson[i].province)
    }
  }
  async function apiCall(value) {
    let resp = await fetch(
      "https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces"
    ).then();
    let respJson = await resp.json();
    // console.warn(respJson[0])
    setdate(loopsetup(value, respJson));
    // await console.warn(data)

    // this.setState({
    //   datac : respJson
    // });
  }
  const setupcase = {
    province: "",
    new_case: "",
    total_case: "",
    new_death: "",
    total_death: "",
  };

  const [data, setdate] = useState(setupcase);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(); // ถ้าทำmulti ใส่[]
  const [loading, setLoading] = useState(false);
  const [provinces, setprovinces] = useState([
    { label: "กระบี่", value: "กระบี่" },
    { label: "กรุงเทพมหานคร", value: "กรุงเทพมหานคร" },
    { label: "กาญจนบุรี", value: "กาญจนบุรี" },
    { label: "กาฬสินธุ์", value: "กาฬสินธุ์" },
    { label: "กำแพงเพชร", value: "กำแพงเพชร" },
    { label: "ขอนแก่น", value: "ขอนแก่น" },
    { label: "จันทบุรี", value: "จันทบุรี" },
    { label: "ฉะเชิงเทรา", value: "ฉะเชิงเทรา" },
    { label: "ชลบุรี", value: "ชลบุรี" },
    { label: "ชัยนาท", value: "ชัยนาท" },
    { label: "ชัยภูมิ", value: "ชัยภูมิ" },
    { label: "ชุมพร", value: "ชุมพร" },
    { label: "เชียงราย", value: "เชียงราย" },
    { label: "เชียงใหม่", value: "เชียงใหม่" },
    { label: "ตรัง", value: "ตรัง" },
    { label: "ตราด", value: "ตราด" },
    { label: "ตาก", value: "ตาก" },
    { label: "นครนายก", value: "นครนายก" },
    { label: "นครปฐม", value: "นครปฐม" },
    { label: "นครพนม", value: "นครพนม" },
    { label: "นครราชสีมา", value: "นครราชสีมา" },
    { label: "นครศรีธรรมราช", value: "นครศรีธรรมราช" },
    { label: "นครสวรรค์", value: "นครสวรรค์" },
    { label: "นนทบุรี", value: "นนทบุรี" },
    { label: "นราธิวาส", value: "นราธิวาส" },
    { label: "น่าน", value: "น่าน" },
    { label: "บึงกาฬ", value: "บึงกาฬ" },
    { label: "บุรีรัมย์", value: "บุรีรัมย์" },
    { label: "ปทุมธานี", value: "ปทุมธานี" },
    { label: "ประจวบคีรีขันธ์	", value: "ประจวบคีรีขันธ์	" },
    { label: "ปราจีนบุรี", value: "ปราจีนบุรี" },
    { label: "ปัตตานี", value: "ปัตตานี" },
    { label: "พระนครศรีอยุธยา	", value: "พระนครศรีอยุธยา	" },
    { label: "พะเยา	", value: "พะเยา	" },
    { label: "พังงา", value: "พังงา" },
    { label: "พัทลุง", value: "พัทลุง" },
    { label: "พิจิตร", value: "พิจิตร" },
    { label: "พิษณุโลก", value: "พิษณุโลก" },
    { label: "เพชรบุรี", value: "เพชรบุรี	" },
    { label: "เพชรบูรณ์", value: "เพชรบูรณ์" },
    { label: "แพร่", value: "แพร่" },
    { label: "ภูเก็ต", value: "ภูเก็ต" },
    { label: "มหาสารคาม", value: "มหาสารคาม" },
    { label: "มุกดาหาร", value: "มุกดาหาร" },
    { label: "แม่ฮ่องสอน", value: "แม่ฮ่องสอน" },
    { label: "ยโสธร", value: "ยโสธร" },
    { label: "ยะลา", value: "ยะลา" },
    { label: "ร้อยเอ็ด", value: "ร้อยเอ็ด" },
    { label: "ระนอง", value: "ระนอง" },
    { label: "ระยอง", value: "ระยอง" },
    { label: "ราชบุรี", value: "ราชบุรี" },
    { label: "ลพบุรี", value: "ลพบุรี" },
    { label: "ลำปาง", value: "ลำปาง" },
    { label: "ลำพูน", value: "ลำพูน" },
    { label: "เลย", value: "เลย" },
    { label: "ศรีสะเกษ", value: "ศรีสะเกษ" },
    { label: "สกลนคร", value: "สกลนคร" },
    { label: "สงขลา", value: "สงขลา" },
    { label: "สตูล", value: "สตูล" },
    { label: "สมุทรปราการ", value: "สมุทรปราการ" },
    { label: "สมุทรสงคราม", value: "สมุทรสงคราม" },
    { label: "สมุทรสาคร", value: "สมุทรสาคร" },
    { label: "สระแก้ว", value: "สระแก้ว" },
    { label: "สระบุรี", value: "สระบุรี" },
    { label: "สิงห์บุรี", value: "สิงห์บุรี" },
    { label: "สุโขทัย", value: "สุโขทัย" },
    { label: "สุพรรณบุรี", value: "สุพรรณบุรี" },
    { label: "สุราษฎร์ธานี", value: "สุราษฎร์ธานี" },
    { label: "สุรินทร์", value: "สุรินทร์" },
    { label: "หนองคาย", value: "หนองคาย" },
    { label: "หนองบัวลำภู", value: "หนองบัวลำภู" },
    { label: "อ่างทอง", value: "อ่างทอง" },
    { label: "อำนาจเจริญ", value: "อำนาจเจริญ" },
    { label: "อุดรธานี", value: "อุดรธานี" },
    { label: "อุตรดิตถ์", value: "อุตรดิตถ์" },
    { label: "อุทัยธานี", value: "อุทัยธานี" },
    { label: "อุบลราชธานี", value: "อุบลราชธานี" },
  ]);

  function setValueonstate() {
    console.warn(value);
  }

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
                  { fontSize: 47, marginBottom: -230 },
                ]}
              >
                MEMO
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={[styles.display, styles.shadowProp]}>
          <View
            style={{
              backgroundColor: "#3c2980",
              height: 60,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
            }}
          >
            <Text style={[styles.textheadercontent]}>{value}</Text>
          </View>
          <View>
            {/* ////////////////////////////////// */}
            <View
              style={{
                flexDirection: "row",
               
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/newcase.png")}
                style={{ width: 60, height: 60, marginRight: 10, marginTop:8 }}
              />
              <View>
                <View style={{ marginTop: 15 }}>
                  <Text style={[styles.detail]}>New case: {data.new_case}</Text>
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={[styles.detail]}>
                    Total case: {data.total_case}
                  </Text>
                </View>
              </View>
            </View>
{/* ///////////////////////////////// */}
            <View              style={{
                flexDirection: "row",
              
                alignItems: "center",
              }}>
                            <Image
                source={require("../../assets/images/rip.png")}
                style={{ width: 60, height: 60, marginRight: 10, marginTop:8 }}
              />
              <View>
                <View style={{ marginTop: 10 }}>
                  <Text style={[styles.detail]}>
                    New death: {data.new_death}
                  </Text>
                </View>
                <View style={{ marginTop: -10 }}>
                  <Text style={[styles.detail]}>
                    Total death: {data.total_death}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.touchstyle, styles.shadowProp]}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                marginLeft: "-55%",
                top: 10,
                fontSize: 25,
                fontFamily: "HAIDUO1T",
              }}
            >
              Provinces
            </Text>
            <View style={{ Button: 200 }}>
              <DropDownPicker
                loading={loading}
                searchable={true}
                searchTextInputProps={{
                  maxLength: 25,
                }}
                searchPlaceholder="Search..."
                searchPlaceholderTextColor="grey"
                searchContainerStyle={[
                  styles.shadowProp,
                  {
                    borderBottomColor: "#dfdfdf",
                    borderRadius: 15,
                  },
                ]}
                searchTextInputStyle={{
                  color: "#000",
                  borderWidth: 0.5,
                  height: 35,
                }}
                customItemContainerStyle={{
                  backgroundColor: "#dfdfdf",
                  borderRadius: 15,
                  borderWidth: 0,
                }}
                customItemLabelStyle={{
                  fontStyle: "italic",
                }}
                //multiple={true}       //เผื่ออยากลองงทำหลายตัวพร้อมๆกัน
                stickyHeader={true}
                rtl={true}
                dropDownDirection="BUTTOM"
                min={0}
                max={4}
                open={open}
                value={value}
                items={provinces}
                maxHeight={240} //Max height of the drop-down box.
                //autoScroll={true}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setprovinces}
                onChangeValue={(value) => {
                  apiCall(value);
                }}
                placeholder="     Select Provinces"
                placeholderStyle={{
                  color: "grey",
                  fontWeight: "bold",
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#ffff",
                  width: "85%",
                  marginLeft: 15,
                  marginTop: 0,
                  borderWidth: 0.42,
                  //borderRadius:10
                }}
                style={[
                  {
                    borderWidth: 0.3,
                    marginHorizontal: 15,
                    borderColor: "gray",
                    width: "85%",
                    //borderWidth: 1,
                    borderRadius: 15,
                    padding: 10,
                    marginVertical: 30,
                    fontSize: 20,
                    backgroundColor: "#fff",
                    alignItems: "center",
                  },
                  styles.shadowProp,
                ]}
                textStyle={{
                  fontSize: 15,
                }}
                labelStyle={{
                  fontWeight: "bold",
                }}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "flex-end",
            // marginTop:"80%",
            alignItems: "center",
            height: 100,
          }}
        ></View>
      </View>
    </View>
  );
};

export default MemoScreen;
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
    fontSize: 20,
    backgroundColor: "#fff",
  },
  touchstyle: {
    marginHorizontal: 15,
    borderColor: "gray",
    width: "85%",
    height: "20%",
    //borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginVertical: 30,
    fontSize: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  detail: {
    fontSize: 20,
    margin: -3,
    fontFamily: "Opun-Regular",
  },
  display: {
    borderRadius: 15,
    backgroundColor: "#FFF",
    width: "85%",
    height: 250,
    alignItems: "center",
  },
  touchstyle2: {
    marginHorizontal: 15,
    borderColor: "gray",
    width: "90%",
    //height: "20%",
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
    height: 60,
    fontFamily: "Opun-Regular",

    color: "#FFF",
  },
});
