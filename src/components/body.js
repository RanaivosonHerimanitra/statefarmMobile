import React,{Component} from 'react';
import {View,Text} from 'react-native';
import Exponent, { Constants, ImagePicker } from 'expo';

export default class Body extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: null,
            uploading: false,
          };
          let { image } = this.state;

    }
  

  render() {
    

    return (
      <View>
        <Text>
          Example: Upload ImagePicker result
        </Text>
      </View>
    );
  }


  
}
