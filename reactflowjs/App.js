import React, { Component } from 'react';
import { Text ,AppRegistry,View} from 'react-native';
import Header from './components/header'
import Body from './components/body'
//import ClickComponent from './src/components/upload'
export default class App extends Component {
  render() {
    return (
      <View>
       <Header title={"Artificial Intelligence App"}/>
       <Body />
      
      </View>
      
  )
  }
}


AppRegistry.registerComponent('reactflowjs', () => App);