import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPressedProp, children, customStyles, customTextStyle, disabled }) => {
    const { buttonStyle, textStyle, disabledButtonStyle } = styles;
    const composeStyle = [buttonStyle, customStyles, disabled ? disabledButtonStyle:{} ]

    return (
        <TouchableOpacity onPress={onPressedProp} disabled={disabled} style={composeStyle}>
            <Text style={[textStyle, customTextStyle]}> { children } </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf : 'center',
        color     : '#fff',
        fontSize  : 14,
        fontWeight: '600',
        padding   : 10,
    },
    buttonStyle: {
        width           : 150,
        alignSelf       : 'center',
        backgroundColor : '#FA64B5',
        borderRadius    : 25,
        borderWidth     : 1,
        borderColor     : '#FA64B5',
        marginBottom    : 20,
        marginTop: 10
    },
    disabledButtonStyle: {
        backgroundColor : '#eaeaea',
        borderColor     : '#eaeaea',
    }
};

export default Button;
