import React from 'react';

import {
  StyleSheet, Text, View, Image
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';


import colors from '../styles/colors';
import fonts from '../styles/fonts';


interface ProductProps extends RectButtonProps {
  data: {
    ID:number;
    title: string;
    category:string;
    date: string; 
    image:string;
    meusProduto:string;
  }
}

export const ProductCard = ({ data, ...rest} : ProductProps) => {
  return (
    
    <RectButton 
    style={data.meusProduto?styles.containerMyProduct:styles.container}
    {...rest} >
      
      <View style={styles.timeLine}>
       <View style={styles.timeImage}>
       {data.image?
      <Image 
      source={{uri: data.image}}  
      style={styles.image}  
      resizeMode='contain'
      /> :
      <Text></Text>
      }
     
       </View>
      <View style={styles.timeInfo}>
      <Text style={data.meusProduto?styles.cardTitleMyProduct:styles.cardTitle}>
        { data.title.substr(0, 20) }
      </Text>
      <Text style={data.meusProduto?styles.visualizarMyProduct:styles.visualizar}>
      Visualizar
      </Text>
      {data.meusProduto?
       <Text style={data.meusProduto?styles.visualizarMyProduct:styles.visualizar}>
       <AntDesign name="checkcircleo" size={16} color="#5eaa53" /> Produto contratado!
      </Text>
      :
      <Text></Text>
}
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
    paddingVertical: 10,
    paddingHorizontal:10,
    marginVertical: 10,
  },
  containerMyProduct:{
    flex: 1,
    maxWidth: '100%',
    backgroundColor: colors.white,
    paddingVertical: 10,
    paddingHorizontal:10,
    marginHorizontal:3,
    marginVertical: 10,
  },
  cardTitleMyProduct:{
    marginTop:0,
    fontSize:14,
    fontWeight:'600',
    fontFamily: fonts.heading,
    color:colors.highlightColor,
  },
  text:{
    color: colors.text,
    fontFamily: fonts.heading,
    marginVertical: 16,
    textAlign:'left',
    margin:0,

  },
  visualizarMyProduct:{
    marginTop:5,
    fontSize:13,
    fontWeight:'600',
    color:colors.highlightColor,
    textAlign:'left',
    fontFamily: fonts.heading,

  },
  timeLine :{
    flexDirection:'row',
    width:'100%',
    paddingVertical:0,
    
  },
  image: {
    width: 50,
    height:50,
  },
  timeImage: {
    alignItems:'center',
    justifyContent: 'center',
    flexShrink: 3,
  },
  timeInfo:{
    flexShrink:3,
    paddingHorizontal:20,
   

  },
  timeLineAfterContainer:{
    alignItems:'center'
  }
  ,
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
    color:colors.highlightColor,
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
 
  },
  check:{
    color:colors.colorActive,
    fontSize:15,
  }
})