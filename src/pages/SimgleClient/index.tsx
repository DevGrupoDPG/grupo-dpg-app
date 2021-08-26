import React, { useContext, useEffect, useState} from 'react';
import {
  View,
  Button, 
  StyleSheet, 
  Text, 
  StatusBar,  
  Image,
  ScrollView
} from 'react-native';

import { useRoute } from '@react-navigation/core'; 
import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  cliente:{
    cliente:string;
    info: string;
    adicionalInfo:string;
    logo:string;
  
  }
}

export default function SimgleClient () {
  const route = useRoute();
  const { cliente } = route.params as Params;



  const navigation = useNavigation();


  function handlePrevious () {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.topTitle}>
       <Text style={styles.title}>informações</Text>
      <Text  style={styles.subtitle}  onPress={handlePrevious} >Voltar</Text>
      </View>
      <ScrollView style={styles.contentClient}>
   
      {cliente?.logo
      ?
      <Image 
          source={{uri: cliente.logo}}  
          style={styles.image}  
          resizeMode='contain'
        />
      : <Text></Text>
      }
      
      <Text style={styles.label}>
       Empresa:
      </Text>
      {cliente?.cliente
      ?
      <Text style={styles.text}>
      {cliente.cliente }
      </Text>
      : <Text></Text>
      }
      {cliente?.info
      ? 
      <Text  style={styles.label}>
      Informação:
      </Text>
       : <Text></Text>
      }
      {cliente?.info
      ?
      <Text style={styles.text}>
      { cliente.info }
      </Text>
      : <Text></Text>
       }
       {cliente?.adicionalInfo
      ?
      <Text style={styles.label}>
      Informações adicionais:
      </Text>
       : <Text></Text>
      }
      {cliente?.adicionalInfo
      ?
      <Text style={styles.text}>
      { cliente.adicionalInfo }
      </Text>
      : <Text></Text>
      }
      
     { //<View style={styles.button}>
     // <Button title="voltar" color={colors.highlightColor} onPress={handlePrevious} />
      // </View>
     }
      </ScrollView>
     
    </View>
  );

}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
    
  },
  contentClient:{
    maxWidth: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal:10,
    
  },
 header:{
    justifyContent: 'center',
    alignItems:'center',
  },
  topTitle:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    color:colors.white,

  },

  subtitle:{
    fontSize:18,
    fontWeight:'400',
    textAlign:'center',
    color:colors.white,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330, 
  },
  image: {
    width: 150,
    height:50,
    marginBottom:20,
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'left',
    marginBottom:18,
    fontFamily:fonts.heading,
    color:colors.white,

  },
  subtitleCard:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'left',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.heading,
  },
  label:{
    fontWeight:'700',
    fontFamily:fonts.heading,
    fontSize:18,
    marginTop:10,
    marginBottom:0,
  },
 
  text:{
    fontSize:16,
    fontWeight:'400',
    color: colors.text,
    fontFamily:fonts.text,
    marginTop:10,
  
  },
  button:{
    marginTop:20,
    marginBottom:50,
  }
   
})
