import React, { useContext, useState} from 'react';
import {
  View, 
  StyleSheet, 
  SafeAreaView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView, 
  TouchableWithoutFeedback,
  Platform} from 'react-native';

import { useForm, Controller ,} from "react-hook-form";

import AuthContext  from '../../contexts/auth';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import logoDPG from '../../../assets/logoDPG.png';


interface DataForm{
  email: string;
  password: string;
  
}

export default function  SignIn () {
  
const {signIn} = useContext(AuthContext);


const { control, handleSubmit ,setValue,reset, getValues, watch, formState: { errors  } } = useForm();
const onSubmit = (data:DataForm) => {
signIn(data.email , data.password);
 
};


  return (
    <SafeAreaView style={styles.container}>
    <KeyboardAvoidingView 
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
    <View style={styles.container}>
  

   <View>
   <Image 
          source={logoDPG}  
          style={styles.image} 
          resizeMode='cover'
        />
 
  
    
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
          style={styles.inputs}  
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder="E-mail"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
        
      />
      {errors.email && <Text>Informe um e-mail.</Text>}
      
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput 
          style={styles.inputs}  
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            secureTextEntry={true}
            placeholder="Senha" 
           
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
        
      />
      {errors.password && <Text>Informe um senha.</Text>}

      <TouchableOpacity 
          style={styles.button} 
          activeOpacity={0.7} 
          onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.buttonText} >
              Acessar
            </Text>
          </TouchableOpacity>       
        </View>   
        </View>
   
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create ({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent:'center'
  },
  title:{
    fontSize:24,
    fontWeight:'700',
    textAlign:'center',
    color: colors.text,
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
  label:{
    fontSize:18,
    fontWeight:'700',
    textAlign:'left',
    color: colors.text,
    fontFamily:fonts.heading
  },
  inputs: {
    width:200,
    borderBottomWidth: 2,
    borderColor: colors.colorActive,
    height:42,
    marginBottom:10,
    fontSize:18,
    padding: 5,
  
  },
  footer:{
    alignItems:'center',
  },
  image: {
    width: 200,
    height:75,
    marginBottom:20,
  },
  button: {
    backgroundColor:colors.colorActive,
    justifyContent:'center',
    alignItems: 'center',
    borderRadius:16,
    marginTop:30,
    marginBottom:10,
    minHeight: 42,
    color:colors.white, 
    fontFamily:fonts.heading,
  },
  buttonText:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'center',
    color:colors.white,

  },
   
})

