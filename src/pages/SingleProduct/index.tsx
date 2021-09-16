import React from 'react';
import {
  View, 
  StyleSheet, 
  Text, 
  StatusBar,
  ScrollView,
} from 'react-native';

import { useRoute } from '@react-navigation/core'; 
import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header';
import { Button }  from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

interface Params {
  produto:{
    ID:number;
    title: string;
    category:string;
    date:string;
    description:string;
    meusProduto:string;
  }
}

interface Produto {
  ID:number;
  name: string;
  title: string;
  category:string;
  date: string; 
  image:string;


}
interface ProdutoMensagem {
  ID: number,
  title: string,
  description: string,
  category: string,
  date:string,
  

}

export default function SingleProduct () {
  
  
  const route = useRoute();
  const { produto } = route.params as Params;



const navigation = useNavigation();


function handlePrevious () {
  navigation.goBack();
}
const produtoMensagem = {
  ID: produto.ID,
  title: produto.title,
  description: produto.description,
  category: produto.category,
  date: produto.date,
  
}
function handleProductSelect (produtoMensagem:ProdutoMensagem){
  
  navigation.navigate('Contratar Produto', {produtoMensagem});

  
}



  return (
    <View style={styles.container}>
      <View style={styles.topTitle}>
      <Text style={styles.title}>informações</Text>
      <Text  style={styles.subtitle}  onPress={handlePrevious} >Voltar</Text>
   
      </View>
      <ScrollView style={styles.contentProduto}>
        
      <View>
      <Text style={styles.titleDescription}>
      { produto.title }
      </Text>
     
      <Text >
          {produto.description}
      </Text>
      </View>
      
      <View style={styles.contentButton}>
      <View style={styles.button}>
      
      <Button 
      onPress={handlePrevious}
      title="Voltar"
      
      />
      </View>
      {!produto.meusProduto
      ?
      <View style={styles.button}>
      
      <Button 
       onPress={() => {handleProductSelect(produtoMensagem)}}
      title="Contratar"
      
      />
     
      </View>
      :
      <View></View>
      }
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
  contentProduto:{
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
  topTitle:{
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',

  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'left',
    marginBottom:18,
    fontFamily:fonts.heading,
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
  titleDescription:{
    fontSize:18,
    fontWeight:'700',
    textAlign:'left',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330,
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
  }
   
})
