import React,{Component} from 'react';
import {
    ActivityIndicator,
    
    Clipboard,
    Image,
    Share,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import Button from 'react-native-button';
import Exponent, { Constants, ImagePicker } from 'expo';

export default class ClickComponent extends Component {
    constructor(props) 
    {
        super(props)
        this.state = {
            image: null,
            uploading: false,
          };
          let { image } = this.state;
    }
    _handlePress() {
        console.log('Pressed!');
      }
      _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();
            this.setState({ image: uploadResult.location });
          }
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, sorry :(');
        } finally {
          this.setState({ uploading: false });
        }
      };
    
    _pickImage = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        this._handleImagePicked(pickerResult);
    };
    
  

  render() {
    
    
    // flex styling
    const styles  = {
        viewStyle: {  paddingTop: 40,flex: 1, alignItems: 'center', justifyContent: 'center' },
        textStyle: {
            fontSize: 20,
            marginBottom: 20,
            textAlign: 'center',
            marginHorizontal: 15
        }

      }
    const {textStyle,viewStyle}= styles
   
    
    
    

    return (
      <View >
        
        <Button
        onPress={() => this._handlePress()}>
        Press Me!
      </Button>
    

      </View>
    );
  }


  
}
