import React, {  useEffect, useState, useContext, useRef } from 'react';
import {View, StyleSheet, Text,FlatList,StatusBar,Platform} from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext  from '../../contexts/auth';




import api from '../../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/core'; 

import {HistoricoCard} from '../../components/HistoricoCard';
import {Header} from '../../components/Header'
import { ListButton } from '../../components/ListButton';
import { Tabs } from '../../components/Tabs';

import Load  from '../../components/Load';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


interface HistoricoDoCliente {
  ID:number;
  name: string;
  title: string;
  category:string;
  fileAppUrl:string;
  fileAppName:string;

}


interface DataCategory{
  ID:number;
  name: string;
  title: string;
  category:string;
  date: string;
  fileAppUrl:string;
  fileAppName:string;
}

interface DataNotification{
  ID: number;
  title:string;
  description: string;
  category: string;
  date: string;
  notification: string;
  notificationUsers: string;
}
interface UserEmail {
  userEmail: string;
  
}

export default function Dashboard ()  {

const [historicoInfo, setHistoricoInfo] = useState<HistoricoDoCliente[]>([]);
const [notificacao, setNotificacao] = useState<DataNotification[]>([]);
const [category, setCategory] = useState<DataCategory[]>([]);
const [filteredCategoria, setFilteredCategoria] = useState<DataCategory[]>([]);
const [categorySelected, setCategorySelected]  = useState('Todos');
const [load, setLoad]  = useState(false);
const [userEmailUp, setuserEmailUp]  = useState<UserEmail | string>();








const user = useContext(AuthContext);
useEffect(()=>{
  setuserEmailUp(`${user.userEmail}`);
},[notificacao]);




const navigation = useNavigation();

// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)

function handleCategorySelected(historicoInfo:string) {
 

  setCategorySelected(historicoInfo);


  
  if (historicoInfo === 'Todos'){
  
   return  setFilteredCategoria(category);
  }
  
  const filtered = category.filter(category => 
    category.category.includes(historicoInfo)
    
    );
    setFilteredCategoria(filtered);
}

useEffect(() => {

  async function categorySelct () {

    const { data } = await api.get('/wp-json/wp/v2/categoria_do_historico?_sort=title&_order=asc');

    setHistoricoInfo([
      {
        id: 0,
        name:'Todos',
        category:'Todos',
      },
      ... data
    ]);

    
    
     }

     
     categorySelct();
     
     
    
},[]);


  

    async function getHistorico() {
       
       await api.get(`/wp-json/api/v1/historicos`)
       
       
       .then((res) => {

      

          if(res.data?.historico){
            setLoad(true);
            setCategory(res.data?.historico);
            setFilteredCategoria(res.data?.historico);
            setNotificacao(res.data?.historico);
           
      
          }

        
      })
      .catch((error) => {
        console.error(error)
     
      })
    

       }
       
       
     
       
      





useEffect(() => {
    
    async function  loadStoragedData(){
    const usersNotifcations = notificacao.filter(notification => 
    notification.notification.includes(`${userEmailUp}`)

    );
    
    const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
  

    if(storagedToken) {
  
 

    api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;


    usersNotifcations.map((HistoricoDoCliente) => {
      
      if(Platform.OS !== 'web'){
      Notifications.scheduleNotificationAsync({ content: {
      title: HistoricoDoCliente.title.substr(0, 50),
      body: `${HistoricoDoCliente.description.substr(0, 60)} 😃`,
      }, trigger: { seconds: 2 } });
   
      }
      
      
      api.put('/wp-json/api/v1/historico', {
    
        
        id: HistoricoDoCliente.ID,
        dpg_notification_hidden: [ `${userEmailUp}` ]
  
    });
    
  
      }
  
      
      );

      
    
  }

  

  
  }
  loadStoragedData(); 
  
},[notificacao]);



function handleHistoricoSelect (historico:HistoricoDoCliente){
  
  navigation.navigate('Histórico', {historico});
}

function handlePageSelect (componet:string){
  
  navigation.navigate(componet);
}


function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    if (delay === null) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id);
  }, [delay]);
}


  const [delay, setDelay] = useState<number>(((1000 * 60 ) * 60  ) * 3 );
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false);
  useInterval(
    () => {
    
      getHistorico();
    },
    // Delay in milliseconds or null to stop it
    isPlaying ? delay : null,
  )
  

useEffect(()=>{
 setPlaying(!isPlaying);
  getHistorico();
},[])
 

   
return (
    <View style={styles.container}>

      <View style={styles.header}>
      <Header/>
    
      <Text  style={styles.subtitle}>Histórico de interação.</Text>
   
      </View>
      <View >
         <FlatList 
            data={historicoInfo}
            keyExtractor={(item) => {
              return item.name;
            }}
            renderItem={({item}) => (
              <ListButton 
              title={item.name } 
              active={item.name === categorySelected}
              onPress={()=> handleCategorySelected(item.name) }
              
              
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
          
         />
      </View>
      {!load? <AppLoading/> :
      <View style={styles.containerCard}>
     { filteredCategoria.length != 0
      ?
      <FlatList
      data={filteredCategoria}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item } ) => (
       
        <HistoricoCard  
        data={item}
        onPress={() => handleHistoricoSelect(item)} />
        
      )}
      
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.1}
      numColumns={1}

    /> 
    :
        <Text style={styles.mensagemHistorico}>Não tem históricos para ser exibido!</Text>
      
    }
      
      </View>
      }
      <View>
      <Tabs />
      </View>
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
    
  },
  title:{
    fontSize:24,
    fontWeight:'700',
    textAlign:'left',
    color: colors.title,
    marginBottom:20,
    fontFamily:fonts.heading,

  },
  subtitle:{
    fontSize:18,
    fontWeight:'400',
    textAlign:'left',
    color: colors.subtitle,
    marginBottom:20,
    fontFamily:fonts.text,
    maxWidth:330, 
  },
  name:{
    fontSize:24,
    fontWeight:'700',
    textAlign:'center',
    color: colors.text,
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
  historico:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'left',
  },
  historicoList: {
    justifyContent:'center',
    display:'flex',
    maxWidth: '100%'
  },
  containerCard: {
    flex: 1,
    maxWidth: '100%',

    paddingVertical: 0,
    paddingHorizontal:0,
    margin: 0,
  }
   ,
  load:{
    backgroundColor:'red'
  },
  mensagemHistorico:{
    fontSize:16,
    fontWeight:'400',
    textAlign:'center',
    color: colors.white,
    marginBottom:20,
    fontFamily:fonts.text,
  
  }
})

