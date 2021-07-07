import React, { useContext, useEffect, useState} from 'react';
import {View, Button, StyleSheet, StatusBar, Text} from 'react-native';
import { useNavigation } from '@react-navigation/core';


import colors from '../../styles/colors';
import fonts from '../../styles/fonts';


export default function ThankClient () {



const navigation = useNavigation();




function handlePrevious () {
  navigation.goBack();
}


  return (
    <View style={styles.container}>
       <Text   style={styles.emotion} >
       😃
       </Text>
       <Text   style={styles.texto} >
        Dados Atualizados  {"\n"}com sucesso!
       </Text>

       <Button title="voltar" color={colors.highlightColor} onPress={handlePrevious} />
      
     
    </View>
  );

}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
  },
  texto:{
    marginBottom:20,
    borderBottomColor:colors.highlightColor,
    fontSize:22,
    color:colors.white,
    fontFamily:fonts.text,
    textAlign:'center',

  },emotion:{
    fontSize:60,
  }
   
})
