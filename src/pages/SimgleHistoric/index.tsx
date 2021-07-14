import React from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  StatusBar,
  ScrollView,
  Linking
} from 'react-native';

import { useRoute } from '@react-navigation/core'; 
import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Button }  from '../../components/Button';

interface Params {
  historico:{
    ID:number;
    title: string;
    category:string;
    date:string;
    description:string;
    fileAppUrl:string;
    fileAppName:string;
  
  }
}

export default function SimgleHistoric () {
  const route = useRoute();
  const { historico } = route.params as Params;




const navigation = useNavigation();


function handlePrevious () {
  navigation.goBack();
}
function openURL()  {
  Linking.openURL(historico.fileAppUrl).catch((err) => console.error('An error occurred', err));
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
      <Text style={styles.description} >
          {historico.description.replace("</br>", "\n").replace("<br/>", "\n")}
      </Text>
      { historico.fileAppUrl?
      <View>
        <Text style={styles.info} onPress={openURL}>
         Arquvo anexo:
        </Text>
        <Text onPress={openURL} style={styles.link}>
        {historico.fileAppName}
      </Text>
      </View>
      :
      <Text>
      </Text>
}     
      </View>
      <View style={styles.contentButton}>
      <View style={styles.button}>

      <Button 
      onPress={handlePrevious}
      title="Voltar"
      />
      </View>
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
    backgroundColor:colors.background,
    
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
    fontSize:16,
    fontWeight:'400',
    textAlign:'center',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330, 
  },
  description:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'left',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330,
  },
  button:{
    marginTop:0,
    marginBottom:30,
    alignItems:'flex-start',
    paddingHorizontal:5,
  },
  contentButton:{
    justifyContent:'flex-end',
    alignItems:'center',
    flexDirection:'row',
  },
  info:{
    marginBottom:10, 
    fontSize:16,
    fontFamily:fonts.text,
  },
  link:{
    color:colors.colorActive,
   textDecorationLine:'underline',
   fontSize:16,
   
  }
   
})
