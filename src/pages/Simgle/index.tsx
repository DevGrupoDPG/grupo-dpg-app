import React, { useContext, useEffect, useState} from 'react';
import {
  View,
  Button, 
  StyleSheet, 
  Text, 
  StatusBar,  
  Image,
} from 'react-native';


import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import logoDPG from '../../../assets/logoDPGBranco.png';



export default function Simgle () {
 



  const navigation = useNavigation();


function handleHome () {
  navigation.navigate('TabRoutes');
}

  return (
    <View style={styles.container}>
   
      <Image 
          source={logoDPG}  
          style={styles.image} 
          resizeMode='cover'
        />
 
      <Text style={styles.title}>
      Aqui você acompanha todas as ações do seu site e pode usar o poder dos dados para otmizar as sua estratégias!
      </Text>
      <View style={styles.button}>
      <Button title="Próximo" color={colors.highlightColor} onPress={handleHome} />
      </View>
      
  
      
    </View>
  );

}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
    
  },
  image: {
    width: 150,
    height:50,
    marginBottom:20,
  },
  title:{
    fontSize:20,
    textAlign: 'center',
    fontWeight:'700',
    fontFamily:fonts.heading,
    color:colors.white,

  },
  label:{
    fontWeight:'700',
    fontFamily:fonts.heading,
    fontSize:18,
    marginTop:10,
    marginBottom:0,
  },
 
  button:{
    marginTop:20,
    marginBottom:50,
  }
   
})
