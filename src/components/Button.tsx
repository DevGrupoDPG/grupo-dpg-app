import React  from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface  ButtonProps extends TouchableOpacityProps{
   title:string
}

export function Button({title, ...rest} : ButtonProps) {
  return (
    <TouchableOpacity 
       style={styles.button}
       activeOpacity= {.7}
       {...rest}
       >
        <Text style={styles.buttonText}>
          { title }
        </Text>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button:{
    backgroundColor:colors.highlightColor,
    paddingHorizontal:10,
    paddingVertical:7,
    borderRadius:7,
    alignItems:'center',
    marginTop:10,
  },
  buttonText:{
    color:'#fff',
    fontFamily:fonts.text,
    fontSize:17,
    fontWeight:'bold',
  },
})