import React from 'react';
import {
  View, 
  Button,
  StyleSheet, 
  Text, 
  StatusBar,
  ScrollView,
} from 'react-native';

import { useRoute } from '@react-navigation/core'; 
import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  historico:{
    ID:number;
    title: string;
    category:string;
    date:string;
    description:string;
  
  }
}

export default function SimgleHistoric () {
  const route = useRoute();
  const { historico } = route.params as Params;




const navigation = useNavigation();


function handlePrevious () {
  navigation.goBack();
}

  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView style={styles.contentHistorico}>
        
      <View>
      <Text style={styles.title}>
      { historico.title }
      </Text>
      <Text style={styles.info}>
        {historico.category? 'Categoria: ' + historico.category: 'Categoria não definida.'}
      </Text>
      <Text style={styles.info}>
          Data: {historico.date}
      </Text>
      <Text >
          {historico.description}
      </Text>
      </View>
      
      <View style={styles.button}>
      <Button title="voltar" color={colors.highlightColor} onPress={handlePrevious} />
      </View>
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
    backgroundColor:colors.background
    
  },
  contentHistorico:{
    flex:1,
    maxWidth: '100%',
    backgroundColor: colors.white,
    borderRadius: 3,
    paddingVertical: 10,
    paddingHorizontal:10,
    paddingBottom:40,
   
  
   
  },
 header:{
    justifyContent: 'center',
    alignItems:'center',
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    marginBottom:20,
    fontFamily:fonts.heading,

  },
  subtitle:{
    fontSize:18,
    fontWeight:'400',
    textAlign:'center',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330, 
  },
  name:{
    fontSize:24,
    fontWeight:'700',
    textAlign:'center',
    color: colors.title,
    marginBottom:20,
    fontFamily:fonts.heading,
  },
  description:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'center',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330,
  },
  button:{
    marginTop:20,
    alignItems:'baseline',
  },
  info:{
    marginBottom:10, 
  }
   
})
