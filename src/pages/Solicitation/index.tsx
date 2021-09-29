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
  Platform ,
} from 'react-native';
  import {Picker} from '@react-native-picker/picker';
  import * as DocumentPicker from 'expo-document-picker';
  import * as FileSystem from 'expo-file-system';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller ,} from "react-hook-form";
import { useNavigation } from '@react-navigation/core';
import AuthContext  from '../../contexts/auth';
import {Header} from '../../components/Header';
import { Button }  from '../../components/Button';


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
  fileAppUrl: string,
 
  
}
interface DataCategory{
  name: string;
  id: number;
}
interface DataArquivoInfo{
    name: string;
    uri: string;
    type: string;
}

interface DataArquivo{
  file: {
    name: string ;
    type: string ;
    uri:string ;
  }
}



export default function Solicitation () {
  const [userStor, setUser] = useState<User | null |string>(null);
  const [client, setClient] = useState<User | null |string>(null);
  const [selectedCategory, setSelectedCategory] = useState();
  const [file, setFile] = useState();
  const [urlBase4, setUrlBase4] = useState<DataArquivoInfo>();

const [category, setCategory] = useState<DataCategory>();

  const  user = useContext(AuthContext);

  
  const defaultValues = {
    title: "",
    content: "",
    categorias: "",
  };

  const navigation = useNavigation();


   const pickDocument = async (file:DataArquivo) => {

    if(Platform.OS !== 'web'){
     const result = await DocumentPicker.getDocumentAsync({});
      
      
       if (result.type == 'success') {
    
        let { name, uri } = result;
        let nameParts = name.split('.');
        const urlBase64: string = await FileSystem.readAsStringAsync(
          uri,
           {
               encoding: FileSystem.EncodingType.Base64,
           });
           
        let fileType = nameParts[nameParts.length - 1];
        //console.log(urlBase64);
        let fileToUpload = {
          name: name,
          type:  fileType,
          uri: urlBase64,
          
        };
        setUrlBase4(fileToUpload);
        
           

      }
    }else {
  
      let result = await DocumentPicker.getDocumentAsync({});
      
      let fileToUploadWeb = {
        name: result.file.name,
        type:  result.file.type.split('/')[1],
        uri: result.uri.split(',')[1] ,
        
      };
      setUrlBase4(fileToUploadWeb );
    

      
    }
     
    }
  
   

  function handleAcknowledgment () {
    navigation.navigate('Obrigado');
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

      title: data.title,
      status : "publish",
      content : data.content ,
      meta: {
        "dpg_user_select":  [
          user.userEmail  
        ],
        "dpg_notification_hidden": [
          'false'
        ],
      },
      categoria_do_historico: selectedCategory,
      fileToUpload:[
        urlBase4?.name,
        urlBase4?.type,
        urlBase4?.uri
      ],
    
     

  }).then((res) => {
 
    //console.log(res.data);
    reset(defaultValues);
    setFile(res.data)
    sendEmailApp(res.data);
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

  let formId = '';
  if(data.title && user.userEmail && data.content && selectedCategory ){

    
  
     formData.append("titulo", data.title);
     formData.append("mensagem", data.content);
     formData.append("email", `${user.userEmail}`);
     formData.append("nome", `${user.userName}`);
     formData.append("cliente", `${client}`);
     formData.append('arquivo', `${data.fileAppUrl}`);
     if(selectedCategory == 5){
       formData.append("assunto", "Suporte");
       formId = '456';
       
     }        
     if(selectedCategory == 6){
       formData.append("assunto", "Atendimento");
       formId = '469';
       
     }  
     if(selectedCategory == 7){
       formData.append("assunto", "Financeiro");
       formId = '470';
       
     }
     
    api({
      method: 'POST',
      url:`/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
    
      data: formData,
     
    })
   .then((res) => {


   reset(defaultValues);

      
    })
    .catch((error) => {
      Alert.alert('Erro a enviar solicitação 😢 ');
   
    })

  }

}

  return (
    <View style={styles.container}>
    {/*<View style={styles.header}>
       <Header/>
  </View>*/}
    <SafeAreaView>
    <KeyboardAvoidingView 
    
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
    
    <View style={styles.containerContent}>

      <View style={styles.topTitle}>
      <Text style={styles.title}>Enviar Solicitação</Text>
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
            placeholder="Título*:" 
          />
        )}
        name="title"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.title && <Text style={styles.error}>Informe um título.</Text>}

            <View style={styles.picker}>
              <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) =>  setSelectedCategory(itemValue)}
              >
                <Picker.Item label="Selecionar departamento*:"value="Atendimento" />
                <Picker.Item label="Atendimento" value="6" />
                <Picker.Item label="Financeiro" value="7" />
                <Picker.Item label="Suporte" value="5" />
                
                
              </Picker>
            </View>
            <View style={styles.file}>
            
            <Button title="Enviar arquivo"  onPress={pickDocument} />  
            
            {urlBase4?.name
            ?
            <Text style={styles.nameFile}>{urlBase4?.name}</Text>
            :
            <Text></Text>
            }  
            
            </View>
      
      <Controller
        control={control}
        
        render={({ field: { onChange, onBlur, value, } }) => (
          <TextInput
            style={styles.textArea}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            multiline={true}
            placeholder="Descrição*:" 
          />
        )}
        name="content"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.content && <Text style={styles.error}>Informe uma descrição.</Text>}
    
      <Button 
      onPress={handleSubmit(onSubmit)}
      title="Enviar"
      />
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
    paddingTop: (StatusBar.currentHeight )|| 40,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
    
  },
  containerContent:{
    paddingTop:40
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
error: {
    color: colors.white,
    margin: 20,
    marginLeft: 5,
    fontSize:16,
    fontFamily:fonts.heading,
  },
  nameFile:{
    color: colors.white,
    margin: 5,
    fontSize:14,
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