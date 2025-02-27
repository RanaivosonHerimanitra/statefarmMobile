// import library
import React, { Component } from 'react';
import { Text, View } from 'react-native';
// styling of component Header

const styles  = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: "center",
        alignItems : "center",
        height: 60,
        paddingTop: 15,
        shadowColor: "#000",
        shadowOffset: {width:0,height:2},
        shadowOpacity:0.2,
        elevation:2,
        position:"relative"
    },
    textStyle: {
        fontSize: 20
    }
}
//make component header
const Header = (props) => {
    const {textStyle,viewStyle}= styles

    return (
    <View style={viewStyle}>
        <Text style={textStyle}>{props.title}</Text>
    </View>
    )
}

//make component available in other parts of the app
export default Header;

