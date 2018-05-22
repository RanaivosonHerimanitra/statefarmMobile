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

export default class Body extends Component {
    constructor(props) 
    {
        super(props)
        this.state = {
            image: null,
            uploading: false,
            prediction : null
            ,imageObj:null
          };
          let { image } = this.state;
    }
    _maybeRenderUploadingOverlay = () => {
        if (this.state.uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: 'rgba(0,0,0,0.4)',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
              ]}>
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
    };
    _maybeRenderImage = () => {
        let { image ,prediction} = this.state;
      
        if (!image) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 30,
              width: 250,
              borderRadius: 3,
              elevation: 2,
              shadowColor: 'rgba(0,0,0,1)',
              shadowOpacity: 0.2,
              shadowOffset: { width: 4, height: 4 },
              shadowRadius: 5,
            }}>
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                overflow: 'hidden',
              }}>
              <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
              <Text>{prediction}</Text>
            </View>
    
            <Text
              onPress={this._copyToClipboard}
              onLongPress={this._share}
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
              {image}
            </Text>
          </View>
        );
    };
    _handleImagePicked = async pickerResult => {
        let uploadResponse, uploadResult;
    
        try {
          this.setState({ uploading: true });
    
          if (!pickerResult.cancelled) {
            uploadResponse = await uploadImageAsync(pickerResult.uri);
            uploadResult = await uploadResponse.json();
            //actual img rendering
            this.setState({ image: uploadResult.location,imageObj: uploadResult });
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
          allowsEditing: false,
          aspect: [4, 3],
        });
        this.setState({image:pickerResult.uri})
        const data = new FormData();
        //ifconfig -a wlan
        const query_url = "http://192.168.0.42:5000/upload"
        data.append('file', {
          uri: this.state.image,
          type: 'image/jpeg', 
          name: 'file'
        });
        fetch(query_url, {
          method: 'post',
          body: data
        }).then(r =>  r.json().then(data => ({status: r.status, body: data})))
        .then(obj => this.setState({prediction:obj.body.prediction}) )
               //
        
        
       
    
       // this._handleImagePicked(pickerResult);
    };
    
    
  

  render() {
    
    let { image } = this.state;
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
        <View>
           <View style={viewStyle}>
             <Text style= {textStyle}>
                 Example: Upload ImagePicker result
             </Text>
            </View>
           <View>
           <Button onPress={this._pickImage}>
                Pick an image from camera roll
          </Button>
           <Button onPress={()=>this._takePhoto()} >
               Take a photo
           </Button>
           {this._maybeRenderImage()}
           {this._maybeRenderUploadingOverlay()}
           <StatusBar barStyle="default" />
          </View>
        </View>


    );
  }


  
}
