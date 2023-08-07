import { View, Text , StyleSheet ,Pressable} from 'react-native'
import React from 'react'

const CustomButton = ({onPress ,text ,type = "PRIMARY", bgColor , fgColor}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]
    ,bgColor ? {backgroundColor: bgColor} : {}
    ]}>
      <Text style={[styles.text, styles[`text_${type}`],
    fgColor ? {color: fgColor} : {},
      ]}>{text}</Text>

    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {

        width: '100%',
        padding: 20,
        marginVertical: 7,
        alignItems: 'center',
        borderRadius: 10,

    },

    container_PRIMARY: {
        backgroundColor: '#512da8',
    },

    container_SECONDARY:{
        borderColor: '#512da8',
        borderWidth: 2,
    },

    container_TERTIARY: {
    },
    text: {
        fontWeight: 'bold',
        color: 'white',
    },
    text_google: {
        color: '#DD4D44',
    },

    text_SECONDARY:{
      color: '#512da8',
    },
    text_TERTIARY: {
        color: 'gray',
    },

});

export default CustomButton

