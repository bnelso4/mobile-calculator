import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const CalcButton = function (props) {
    return <TouchableOpacity onPress={()=>props.onInput()}>
       <View backgroundColor={props.color} style={checkZero(props.checkZero)}>
           <Text style={{ alignSelf: 'center', fontSize: 35 }}>{props.value}</Text>
        </View>


    </TouchableOpacity>




}


const checkZero = function (check) {
    if (!check)
    { return styles.buttonStyle }
    else
    {return styles.zeroStyle }

}


const styles = StyleSheet.create({
    buttonStyle: {
        height: 75,
        width: 75,
        borderRightWidth: 4,
        borderBottomWidth:4,
        borderColor: 'black',
        justifyContent:'center'
    },
    zeroStyle:
    {
        justifyContent:'center',
        height: 75,
        width: 150,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: 'black',
        marginHorizontal:11
	}
})

export default CalcButton;