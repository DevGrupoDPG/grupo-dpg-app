import React, { useContext, useEffect, useState} from 'react';
import {
  View, 
  StyleSheet, 
  Text,
  StatusBar,
  TextInput,
  Alert, 
  SafeAreaView,
  KeyboardAvoidingView, 
  Button,
 } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useForm, Controller } from "react-hook-form";
import AuthContext  from '../../contexts/auth';

import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import api from '../../services/api';

interface DataForm{
  name: any;
  password:any;
  
}
interface User {
  name: string;
  email: string;
}


export default function SimgleHistoric () {
  const showAlert = () =>
   Alert.alert('Dados atualizados com sucesso 😃 ! ');

  const [userStor, setUser] = useState<User | null |string>(null);


  const { control, handleSubmit, formState: { errors  } } = useForm();
  const onSubmit = (data:DataForm) => {
    loadStoragedData(data);
    
  };
  const  user = useContext(AuthContext);

  const navigation = useNavigation();

  function handlePrevious () {
    navigation.goBack();
  }


function handleHome (name:User) {
  navigation.navigate('Dados Atualizados');
  user.userName = `${name}`;
}



  async function  loadStoragedData(data:DataForm){

  const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
  

  
  setUser(storagedToken);
  

  api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
  
  api.put(`/wp-json/api/v1/usuario`, {
    
          
    "name": data.name,
    "email": user.userEmail,
    "password": data.password,
  
  }).then((res) => {
     AsyncStorage.setItem('@DPGUser',`${data.name}`);
      handleHome(data.name);
     })
     .catch((error) => {
       Alert.alert('Erro ao atualizar os dados');
    
     })
  

  
}



  return (
    <View style={styles.container}>
    
      <Header/>
      <KeyboardAvoidingView>
    <SafeAreaView>
    <View>
      <View style={styles.topTitle}>
      <Text style={styles.title}>Usuário</Text>
      <Text  style={styles.subtitle}  onPress={handlePrevious} >Voltar</Text>
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={`${user.userName}`}
          />
        )}
        name="name"
        rules={{ required: false }}
        defaultValue=""
      />
      {errors.title && <Text style={styles.error}>Informe um name.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
          style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            secureTextEntry={true}
            placeholder="******" 
           
          />
        )}
        name="password"
        rules={{ required: false }}
        defaultValue=""
        
      />
      {errors.password && <Text>Informe um senha.</Text>}
       <Button title="Atualizar" color={colors.highlightColor} onPress={handleSubmit(onSubmit)} />
    </View>

    </SafeAreaView>
    </KeyboardAvoidingView>
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
    fontSize:24,
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
  name:{
    fontSize:24,
    fontWeight:'700',
    textAlign:'center',
    color: colors.title,
    marginBottom:20,
    fontFamily:fonts.heading,
  },
  
  error: {
    color: colors.white,
    margin: 20,
    marginLeft: 5,
    fontSize:16,
    fontFamily:fonts.heading,
  },
  button :{
    marginTop: 40,
    color: 'white',
    height: 40,
    borderRadius: 4,
  },
  input: {
    backgroundColor:colors.white,
    borderColor:colors.white,
    color:'#000000',
    borderWidth:1,
    fontSize:16,
    padding: 5,
    paddingVertical:10,
    paddingHorizontal:10,
    borderRadius: 4,
    marginBottom:10,
  }
   
})
