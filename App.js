
import React from 'react';
import { StyleSheet, Text, View , SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import Darwerscreen from './drawerscreen';
import Amplify  from 'aws-amplify'
import awsconfig from './src/aws-exports'
import Drawerscreen from "./drawerscreen"
Amplify.configure(awsconfig)

const App = () => {
  return (
 <View style={{width:"100%",height:"100%"}}>
      <Navigation />
  </View>

  );
}

export default App;
