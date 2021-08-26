import React, { useState,useEffect,useContext} from 'react';

import {
  View, 
  StyleSheet, 
  Text,
  StatusBar,
  TextInput,
  Alert, 
  SafeAreaView,
  KeyboardAvoidingView, 
  Platform,
  ScrollView
} from 'react-native';
 

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller ,} from "react-hook-form";
import { useNavigation } from '@react-navigation/core';
import AuthContext  from '../../contexts/auth';
import {Header} from '../../components/Header';
import { Button }  from '../../components/Button';
import { useRoute } from '@react-navigation/core'; 


import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';




interface User {
  name: string;

}



interface DataForm{
  title: any;
  content: any;
  categoria_do_historico: any;
  userEmail:string,
  selectedCategory:string,
 
  
}
interface DataCategory{
  name: string;
  id: number;
}


interface Params {
  produtoMensagem:{
    ID:number;
    title: string;
    category:string;
    date:string;
    description:string;
  
  }
}


export default function SolicitationProduct () {
const [userStor, setUser] = useState<User | null |string>(null);
const [client, setClient] = useState<User | null |string>(null);

const [category, setCategory] = useState<DataCategory>();

const  user = useContext(AuthContext);

const route = useRoute();

const { produtoMensagem } = route.params as Params;


  
  const defaultValues = {
    title: "",
    content: "",
    categorias: "",
  };

  const navigation = useNavigation();



   

  function handleAcknowledgment () {
    navigation.navigate('Obrigado Produto');
  }


  function handlePrevious () {
    navigation.goBack();
  }



  const { control, handleSubmit,reset, register, formState: { errors  } } = useForm();
  const onSubmit = (data:DataForm) => {
    loadStoragedData(data);
    
    
  };

  useEffect(() => {

    async function getInfoUser () {

      const { data } = await api.get('/wp-json/wp/v2/categoria_do_historico');
   
      setCategory(data);
      
      }
      getInfoUser();
      
},[]);

 
const formData = new FormData();
  async function  loadStoragedData(data:DataForm){

  const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
  

  if(storagedToken) {
  
  setUser(storagedToken);
  

  api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
  
  api.post('/wp-json/api/v1/historico', {

      title: produtoMensagem.title,
      status : "publish",
      content : `${produtoMensagem.description + '\n' + data.content }`,
      meta: {
        "dpg_user_select":  [
          user.userEmail  
        ],
        "dpg_notification_hidden": [
          'false'
        ],
      },
      categoria_do_historico: [
        24
      ]

  }).then((res) => {
 

    reset(defaultValues);
    sendEmailApp(data);
    handleAcknowledgment ();
   
       
     })
     .catch((error) => {
       Alert.alert('Ocorreu um erro!')
    
     })
    
  }
  
}

useEffect(() => {

  async function getUserInfo() {

     await api.get('/wp-json/api/v1/usuario')
     
     
     .then((res) => {

        

      if(res.data?.cliente){
        
        setClient(res.data?.cliente);
       
  
       }
      
    })
 }
 getUserInfo();
     
    
},[]);


function sendEmailApp (data:DataForm){

  let formId = 1149;
  if(produtoMensagem.title){

     formData.append("titulo", produtoMensagem.title);
     formData.append("mensagem", `${produtoMensagem.description + '\n' + data.content }` );
     formData.append("email", `${user.userEmail}`);
     formData.append("nome", `${user.userName}`);
     formData.append("cliente", `${client}`);
     formData.append("assunto", "Solicitação de Produto");

    api({
      method: 'POST',
      url:`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    
      data: formData,
     
    })
   .then((res) => {


    reset(defaultValues);

      
    })
    .catch((error) => {
      Alert.alert('Erro a enviar solicitação 😢 ')
   
    })

  }

}
 return (
    <View style={styles.container}>
    
    <SafeAreaView>
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
    <View >

      <View style={styles.topTitle}>
      <Text style={styles.title}>Solicitação do Produto</Text>
      <Text  style={styles.subtitle}  onPress={handlePrevious} >Voltar</Text>
      </View>
      <ScrollView>
      <Text style={styles.produto}>
        {produtoMensagem.title}
      </Text>
  
      <Controller
        control={control}
        
        render={({ field: { onChange, onBlur, value, } }) => (
          <TextInput
            style={styles.textArea}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline={true}
            placeholder="Observação:" 
          />
        )}
        name="content"
        rules={{ required: false }}
        defaultValue=""
      />
      {errors.content && <Text style={styles.error}>Informe uma descrição.</Text>}
      <Button 
      onPress={handleSubmit(onSubmit)}
      title="Solicitar agora"
      />
      </ScrollView>
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
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
  produto:{
    fontSize:18,
    fontWeight:'700',
    textAlign:'center',
    color:colors.text,
    marginBottom:20,
    fontFamily:fonts.text,
    paddingVertical: 20,
    borderRadius:3,
    paddingHorizontal:0,
    margin: 0,
    backgroundColor:colors.white,
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
    marginBottom:20,
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
  ,
  textArea:{
    backgroundColor: colors.white,
    borderColor:colors.white,
    justifyContent:'flex-start',
    color:'#000000',
    borderWidth:1,
    paddingVertical:10,
    paddingHorizontal:10,
    fontSize:16,
    padding: 5,
    borderRadius: 4,
    marginBottom:10,
  },
  picker: {
    backgroundColor: colors.white,
    borderColor:colors.white,
    borderWidth:1,
    padding: 0,
    borderRadius: 4,
    marginBottom:10,
    paddingHorizontal:5,

  },
  file:{
    marginBottom:10,
    display:'flex',
    alignItems: 'flex-end',
  }
})