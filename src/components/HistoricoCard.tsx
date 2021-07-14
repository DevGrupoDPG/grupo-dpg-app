import React from 'react';

import {
  StyleSheet, Text, View
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Fontisto } from '@expo/vector-icons';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface HistoricoProps extends RectButtonProps {
  data: {
    ID:number;
    title: string;
    category:string;
    date: string; 
    
  }
}

export const HistoricoCard = ({ data, ...rest} : HistoricoProps) => {
  return (
    <RectButton 
    style={styles.container}
    {...rest} >
      
      <View style={styles.timeLine}>
       <View style={styles.timeIcone}>
       <Fontisto 
          name="date"
          size={18}
          color={colors.colorActive}
          style={styles.icone}

          
    />
       <View style={styles.timeLineAfterContainer}>
       <View style={styles.timeLineAfter}></View>
       </View>
       </View>
      <View style={styles.timeInfo}>
      <Text style={styles.dataTexto}>
          Data: {data.date}
      </Text>
      <Text style={styles.cardTitle}>
        Título: { data.title.substr(0, 20) }
      </Text>
      <Text style={styles.cardCategoria}>
        {data.category? 'Categoria: ' + data.category.substr(0,14): 'Categoria não definida.'}
      </Text>
      <Text style={styles.visualizar}>
      Visualizar
      </Text>
           </View>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: '100%',
    backgroundColor: colors.white,
    paddingVertical: 0,
    paddingHorizontal:10,
    margin: 0,
  },
  text:{
    color: colors.text,
    fontFamily: fonts.heading,
    marginVertical: 16,
    textAlign:'left',
    margin:0,
  

  },
  timeLine :{
    flexDirection:'row',
    width:'100%',
    paddingVertical:0,
    
  },
  timeIcone: {
    alignItems:'center',
    flexShrink: 3,
  },
  timeLineAfter:{
    width: 1,
    height: 80,
    backgroundColor:colors.text,
    margin:'auto',
 
  },
  timeInfo:{
    flexShrink:3,
    paddingHorizontal:20,
    height: 110,

  },
  timeLineAfterContainer:{
    alignItems:'center'
  }
  ,
  icone:{
    display:'flex',
    borderWidth:1,
    alignItems:'center',
    justifyContent: 'center',
    padding:7,
    paddingLeft:7.8,
    borderRadius:5,
    width:34,
    height:34,
  },
  dataTexto:{
    fontSize:18,
    fontWeight:'700',
    color:colors.colorActive,
    fontFamily: fonts.heading,
  },
  cardTitle: {
    marginTop:10,
    fontSize:14,
    fontWeight:'600',
    fontFamily: fonts.heading,
  },
  cardCategoria: {
    marginBottom:0,
    fontSize:14,
    fontWeight:'400',
    fontFamily: fonts.text,
  },
  visualizar:{
    marginTop:0,
    fontSize:14,
    fontWeight:'600',
    color:colors.highlightColor,
    textAlign:'left',
    fontFamily: fonts.heading,
    textDecorationLine:'underline',
  },
})