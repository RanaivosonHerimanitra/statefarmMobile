import React, { Component } from 'react';
import { Text ,AppRegistry,View} from 'react-native';
import Header from './src/components/header'
import Body from './src/components/body'
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