import React, {  useEffect, useState, useContext } from 'react';
import {View, StyleSheet, Text,FlatList,StatusBar,Platform} from 'react-native';
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

}


interface DataCategory{
  ID:number;
  name: string;
  title: string;
  category:string;
  date: string;
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
interface User {
  name: string;
  
}

export default function Dashboard ()  {

const [historicoInfo, setHistoricoInfo] = useState<HistoricoDoCliente[]>([]);
const [notificacao, setNotificacao] = useState<DataNotification[]>([]);
const [category, setCategory] = useState<DataCategory[]>([]);
const [filteredCategoria, setFilteredCategoria] = useState<DataCategory[]>([]);
const [categorySelected, setCategorySelected]  = useState('Todos');

const [ page, setPage] = useState(1);
const [ loadingMore, setLoadingMore] = useState(false);
const [ loadeAll, setLoadeAll]  = useState(false);






const  user = useContext(AuthContext);

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


   useEffect(() => {

    async function getHistorico() {
       
       await api.get(`/wp-json/api/v1/historicos`)
       
       
       .then((res) => {

          

          if(res.data?.historico){
            setCategory(res.data?.historico);
            setFilteredCategoria(res.data?.historico);
            setNotificacao(res.data?.historico);
         
            
            

          }

        
      })
      .catch((error) => {
        console.error(error)
     
      })
    

       }
       
       
       getHistorico();
       
      
},[]);




useEffect(() => {
    
    async function  loadStoragedData(){
    const usersNotifcations = notificacao.filter(notification => 
    notification.notification.includes('true')

    );
    
    const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
  

    if(storagedToken) {
  
 

    api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;


    usersNotifcations.map((HistoricoDoCliente) => {
      
      if(Platform.OS !== 'web'){
      Notifications.scheduleNotificationAsync({ content: {
      title: HistoricoDoCliente.title.substr(0, 50),
      body: `${HistoricoDoCliente.description.substr(0, 60)} 😃`,
      }, trigger: { seconds: 2 } })
      }
     
      
      api.put(`/wp-json/wp/v2/historico/${HistoricoDoCliente.ID}`, {
    
        
        meta: {
          
          "dpg_user_select": HistoricoDoCliente.notificationUsers
            
          ,
          
          "dpg_notification_hidden": "false"
        },
      
  
    })
      
  
      }
  
      
      );

   
    
  }

  

  
  }
  loadStoragedData(); 
    
},[notificacao]);



function handleHistoricoSelect (historico:HistoricoDoCliente){
  
  navigation.navigate('Histórico', {historico});
}



return (
    <View style={styles.container}>

      <View style={styles.header}>
      <Header/>
    
      <Text style={styles.subtitle}>Histórico de interação.</Text>
   
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
      <View style={styles.containerCard}>
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
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal:10,
    margin: 0,
  }
   
})

