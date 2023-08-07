import React from 'react';
import { StyleSheet, Text, View ,Image } from 'react-native';
import { LineChart } from "react-native-gifted-charts";

class HomeScreen extends React.Component{

  
    constructor(){
      super();
      this.state = {
        datac: {},
        recoveries_g:[{
          value: 0,
          label: ""
      }],
        newcase_g:[{
          value: 0,
          label: ""
      }]
      }
      
    }

    componentDidMount()
    {
      this.apiCall();
    }
    
    async apiCall(){
      let resp =await fetch('https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all')
      let respJson=await resp.json()
    // console.warn(respJson[0])

    this.setState({
      datac : respJson
    });
    // console.warn(this.state.datac[3].txn_date);
        
  const recoveriesd=[];
  const newcased =[];
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
        for (let i = Object.keys(this.state.datac).length-9; i < Object.keys(this.state.datac).length-1; i++) {
          if(i==Object.keys(this.state.datac).length-9)
          {
            recoveriesd.push({
              value:this.state.datac[i].new_recovered/1000,
              label:" "
              }
            );
  
            newcased.push({
              value: this.state.datac[i].new_case/1000,
              label: " "
            }
            );
          }else{
          var st=this.state.datac[i].txn_date
          var dt = new Date(st)
          var day =weekday[dt.getDay()]
          
         recoveriesd.push({
            value:this.state.datac[i].new_recovered/1000,
            label:day
            }
          );

          newcased.push({
            value: this.state.datac[i].new_case/1000,
            label: day
          }
          );
          }
      }   


      this.setState({
        recoveries_g: recoveriesd,
        newcase_g: newcased,

      });
    //   console.warn(newcased);
}
  
      

  render() {
    // console.warn(recoveries_g);
    const recovered =this.state.recoveries_g;
    const newcase= this.state.newcase_g;
//   const recovered = [{value: 2,label:'1',},
//   {value: 10,label:'2'}];
//   const newcase = [{value: 0,label:'1'},
//   {value: 20,label:'2'}];
    return (
      <View style={{flex:1,justifyContent:'center'}}>
        <View style={{justifyContent:'center'}}>
        <LineChart
            areaChart
            curved
            data={newcase}
            data2={recovered}
            height={155}
            showVerticalLines
            spacing={39}
            initialSpacing={0}
            color1="#EC6666"
            color2="#147AD6"
            textColor1="green"
            //hideDataPoints
            dataPointsColor1="#EC6666"
            dataPointsColor2="#147AD6"
            startFillColor1="#EC6666"
            startFillColor2="#147AD6"
            startOpacity={0.8}
            endOpacity={0.3}
            textShiftY={-2}
            textShiftX={-5}
          
            noOfSections={5} // จำนวนค่าในแกน y
            //hideRules
            //showVerticalLines={false}
            yAxisLabelSuffix="K"
            hideOrigin
            width={280}
            disableScroll={true}
            // xAxisColor="#fff"
            // yAxisColor="#fff"   /กรอบ
           
            />
            </View>
      </View>
    );
  }
}
export default HomeScreen;

