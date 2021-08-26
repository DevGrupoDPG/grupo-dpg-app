import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ListButtonProps extends RectButtonProps {
  title: string;
  active?: boolean;
}

export function ListButton ({
  
  title,
  active = false,
  ...rest

}:ListButtonProps) {
  return (
    <RectButton
      style={[
        styles.container,
        active && styles.containerActive
      ]}
      {... rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive
      ]}>
        {title}
      </Text>
    </RectButton>

  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:3,
    marginHorizontal:3,
    paddingHorizontal:5,
    marginBottom:10,
  },
  containerActive: {
    backgroundColor: colors.highlightColor,
    
  },
  text:{
      color: colors.white,
      fontFamily: fonts.text,
  },
  textActive:{
    fontFamily: fonts.heading,
    color: colors.white,
}
})