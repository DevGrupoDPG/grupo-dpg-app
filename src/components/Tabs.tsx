import React from 'react';
import {
  Text,
  StyleSheet,
  FlatList
} from 'react-native';
import { RectButton, RectButtonProps} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core'; 

import Solicitation from '../pages/Solicitation';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { FontAwesome5 } from '@expo/vector-icons'; 



export function Tabs() {

  const navigation = useNavigation();
  function handlePageSelect (componet:string){
  
    navigation.navigate(componet);
  }

  const dataMenu = [
    {
      title: 'Home',
      component:'Home',
      icone:'home'
    },
    {
      title: 'Mensagem',
      component:'Mensagem',
      icone:'comment'
    },
    {
      title: 'Produtos',
      component:'Produtos',
      icone:'shopping-cart'
    },
    {
      title: 'Configuração',
      component:'Configuração',
      icone:'cog'
    },
    
    
  ];

  return (
    <FlatList 
    data={dataMenu}
    keyExtractor={(item) => {
      return item.title;
    }}
    renderItem={({item}) => (
      <RectButton
      style={[
        styles.container
      ]}
      onPress={() => handlePageSelect(item.component)}
     
    >
     <FontAwesome5 name={item.icone} size={16} color={colors.white} />
      <Text style={[
        styles.text
      ]}>
        
        {item.title}
      </Text>
    </RectButton>
    )}
    horizontal
    showsHorizontalScrollIndicator={false}
  
 />
   

  )
}


const styles = StyleSheet.create({
  container:{
    backgroundColor:'rgba(255, 255, 255, 0.2)',
    width:90,
    height:90,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius:3,
    marginHorizontal:3,
    paddingHorizontal:10,
    paddingVertical:10,
    marginTop:20,
    marginBottom:10,
  },
  containerActive: {
    backgroundColor: colors.highlightColor,
    
  },
  text:{
    fontFamily: fonts.heading,
    color: colors.white,
    fontSize:9,
    fontWeight:'400',
  },
  textActive:{
    fontFamily: fonts.text,
    fontSize:14,
    color: colors.white,
}
})