import { useNavigation } from '@react-navigation/core';

import React, { 
  useState, 
  useEffect, 
  useContext,} from 'react';
import { 
  Text, 
  View, 
  StatusBar, 
  StyleSheet,  
  Image,
  ScrollView,
 } from 'react-native';

import api from '../../services/api';

import AuthContext  from '../../contexts/auth';
import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';




interface ClienteInfo {

    cliente:string | undefined,
    info:string,
    logo:string,
    adicionalInfo:string,

}

export default function ConfigUser () {

const [cliente, setCliente] = useState<ClienteInfo | undefined>();
const navigation = useNavigation();



const  user = useContext(AuthContext);




function handleClient (cliente:ClienteInfo | undefined){
  
  navigation.navigate('Cliente', {cliente});
}

function handleUser (){
  
  navigation.navigate('Usuário');
}




useEffect(() => {

  async function getCliente() {

     await api.get('/wp-json/api/v1/cliente/')
     
     
     .then((res) => {

        

        if(res.data){
        
          setCliente(res.data);
  
          
        
         
        }

      
    })
    .catch((error) => {
      console.error(error)
   
    })
  

     }
     
     
     getCliente();
     
    
},[]);


  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
      <Text  style={styles.title}>
         Informações Empresa
      </Text>
      <View style={styles.containerInfo} >
      {cliente?.logo
      ? <Image 
          source={{uri: cliente?.logo}}  
          style={styles.image}  
          resizeMode='contain'
        />
        :<Text>
        </Text>
       }
   
        
   {cliente?.cliente
      ?  
      <Text  style={styles.subtitle}>
         {cliente?.cliente}
      </Text>
        :<Text>
        </Text>
       }
   
      <Text   style={styles.visualizar}  onPress={() => handleClient(cliente)}>
         Visualizar
      </Text>
      </View>
      <Text  style={styles.title}>
         Informações do usuário
      </Text>
      <View style={styles.containerInfo} >
      <Text  style={styles.subtitle}>
         {user.userName}
      </Text>
      <Text  style={styles.subtitle}>
         {user.userEmail}
      </Text>
      <Text  style={styles.editar}  onPress={handleUser}>
         Editar
      </Text>
   
      </View>
  
      </ScrollView>
    </View>
  );

}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
  },
  containerInfo:{
    justifyContent: 'flex-start',
    backgroundColor:colors.white,
    padding:20,
    marginBottom:10,
  },
  image: {
    width: 150,
    height:50,
    marginBottom:20,
  },
 header:{
    justifyContent: 'center',
    alignItems:'center',
  },
  title:{
    fontSize:18,
    fontWeight:'500',
    textAlign:'left',
    color: colors.title,
    marginBottom:10,
    fontFamily:fonts.heading,
  },
  subtitle:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'left',
    color: colors.text,
    marginBottom:20,
    fontFamily:fonts.heading,
  },
  visualizar:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'right',
    color: colors.colorActive,
    marginBottom:20,
    fontFamily:fonts.heading,
  },
  editar:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'right',
    color: colors.colorActive,
    marginBottom:20,
    fontFamily:fonts.heading,
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
    
  }
   
})
