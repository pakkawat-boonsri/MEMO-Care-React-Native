import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { PieChart } from "react-native-gifted-charts";
import Chart from "../components/chart";
class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      todayCases: "",
      todayDeaths: "",
      todayRecovered: "",
      totalcases: "",
      Recovered: "",
      Deaths: "",
      active: "",
    };
  }
  componentDidMount() {
    this.apiCall();
  }
  async apiCall() {
    let resp = await fetch(
      "https://static.easysunday.com/covid-19/getTodayCases.json"
    );
    let respJson = await resp.json();
    // console.warn(respJson.todayCases)
    this.setState({
      todayCases: respJson.todayCases,
      todayDeaths: respJson.todayDeaths,
      todayRecovered: respJson.todayRecovered,
      totalcases: respJson.cases,
      Recovered: respJson.recovered,
      active: respJson.active,
      Deaths: respJson.deaths,
    });
  }

  render() {
    let todayCases = addcomma(this.state.todayCases);
    let todayDeaths = addcomma(this.state.todayDeaths);
    let todayRecovered = addcomma(this.state.todayRecovered);
    let active = addcomma(this.state.active);
    let totalcases = addcomma(this.state.totalcases);
    let Recovered = addcomma(this.state.Recovered);
    let Deaths = addcomma(this.state.Deaths);

    let sum =
      this.state.todayCases +
      this.state.todayDeaths +
      this.state.todayRecovered;
    let peractive = perpi(this.state.todayCases, sum);
    let perRecovered = perpi(this.state.todayRecovered, sum);
    let perDeaths = perpi(this.state.todayDeaths, sum);

    const image = require("../../assets/images/BG3.png");
    const pieactive = [
      { value: parseInt(peractive), color: "#F89B3E" },
      { value: parseInt(100 - peractive), color: "lightgray" },
    ];
    const piRecovered = [
      { value: parseInt(perRecovered), color: "#79DE81" },
      { value: parseInt(100 - perRecovered), color: "lightgray" },
    ];
    const piDeaths = [
      { value: parseInt(perDeaths), color: "#5C5C5C" },
      { value: parseInt(100 - perDeaths), color: "lightgray" },
    ];

    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View style={{ width: "100%", height: 350 }}>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={[styles.image, { marginTop: -37, alignItems: "center" }]}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[styles.headtext, styles.shadowProp, { fontSize: 35 }]}
                >
                  Daily New Cases
                </Text>
                <Text
                  style={[styles.headtext, styles.shadowProp, { fontSize: 55 }]}
                >
                  + {todayCases}
                </Text>
              </View>

              <View
                style={[
                  {
                    backgroundColor: "#FFFFFF",
                    width: "90%",
                    height: 255,
                    borderRadius: 25,
                    position: "absolute",
                    bottom: "-45%",
                  },
                  styles.shadowProp,
                ]}
              >
                <View style={{ alignItems: "center", bottom: "-40%"  }}>
                  <Chart></Chart>
                  <View
                    style={[
                      {
                        backgroundColor: "#000000",
                        width: "95%",
                        height: 1,
                        borderRadius: 25,
                        marginTop: 110,
                      },
                    ]}
                  ></View>
                  <View style={{marginLeft:'45%'}}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "HAIDUO1T",
                        marginTop: 10,
                      }}
                    >
                       New case      Recovered
                    </Text>
                  </View>
                  <View style={{marginTop:"-5%",marginRight:"7%",flexDirection:'row'}}>
                  <View style ={{backgroundColor: "#EC6666",width: 15,height: 15,marginRight:"25%",borderRadius: 25,}}></View>
                  <View style ={{backgroundColor: "#147AD6",width: 15,height: 15,marginRight:"-25%",borderRadius: 25,}}></View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>

          <View
            style={[
              {
                backgroundColor: "#FFFFFF",
                width: "90%",
                height: 175,
                borderRadius: 25,
                // position: 'absolute',
                bottom: "-25%",
              },
              styles.shadowProp,
            ]}
          >
            <View style={{ flexDirection: "row", flex: 3 }}>
              <View style={[styles.viewcontent]}>
                <View>
                  <PieChart
                    donut
                    innerRadius={30}
                    radius={40}
                    data={pieactive}
                    centerLabelComponent={() => {
                      return <Text style={styles.txtinPi}>{peractive}%</Text>;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.contenttext}>New Cases</Text>
                  <Text style={styles.detailtxt}>{todayCases}</Text>
                </View>
              </View>

              <View style={[styles.viewcontent]}>
                <View>
                  <PieChart
                    donut
                    innerRadius={30}
                    radius={40}
                    data={piRecovered}
                    centerLabelComponent={() => {
                      return (
                        <Text style={styles.txtinPi}>{perRecovered}%</Text>
                      );
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.contenttext}>Recovered</Text>
                  <Text style={styles.detailtxt}>{todayRecovered}</Text>
                </View>
              </View>

              <View style={[styles.viewcontent]}>
                <View>
                  <PieChart
                    donut
                    innerRadius={30}
                    radius={40}
                    data={piDeaths}
                    centerLabelComponent={() => {
                      return <Text style={styles.txtinPi}>{perDeaths}%</Text>;
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.contenttext}>Deaths</Text>
                  <Text style={styles.detailtxt}>{todayDeaths}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
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
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
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
});

function addcomma(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function perpi(x, y) {
  return ((parseFloat(x) / parseFloat(y)) * 100).toFixed(1);
}
