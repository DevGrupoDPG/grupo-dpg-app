import React, {  useEffect, useState, useContext, useRef } from 'react';
import {
  View,
  StyleSheet, 
  Text, 
  StatusBar,  
  Image,
  Platform
} from 'react-native';


import { useNavigation } from '@react-navigation/core';


import {Header} from '../../components/Header'
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import logoDPG from '../../../assets/logoDPGBranco.png';
import { Button }  from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import api from '../../services/api';
import AuthContext  from '../../contexts/auth';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


export default function Simgle () {
 

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [userStor, setUser] = useState<User | null |string>(null);
  const  user = useContext(AuthContext);
  

  const navigation = useNavigation();


function handleHome () {
  navigation.navigate('Home');
}

useEffect(() => {
  registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  // This listener is fired whenever a notification is received while the app is foregrounded
  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });

  return () => {
    Notifications.removeNotificationSubscription(notificationListener.current);
    Notifications.removeNotificationSubscription(responseListener.current);
  };
}, []);



async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice && (Platform.OS !== 'web')) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    //alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

useEffect ( () => {
  if((expoPushToken !== null) && (expoPushToken !== '') && (Platform.OS !== 'web')){
    updateNotification(); 
  }
}, [expoPushToken]);
 

async function  updateNotification(){

  const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
  

  
  setUser(storagedToken);
  

  api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;

       
    api.get(`/wp-json/api/v1/usuario`)
    
    
    .then((res) => {

      if(res.data.tokenNotification !== notification){
        api.put(`/wp-json/api/v1/usuario`, {
          "tokenNotification": expoPushToken,
        
        })
      }

     
   })
   .catch((error) => {
     console.error(error)
  
   });

}

  return (
    <View style={styles.container}>
   
      <Image 
          source={logoDPG}  
          style={styles.image} 
          resizeMode='cover'
        />
 
      <Text style={styles.title}>
      Aqui você acompanha todas as ações do seu site e pode usar o poder dos dados para otimizar as suas estratégias!
      </Text>
      <View style={styles.button}>
      <Button 
      onPress={handleHome}
      title="Próximo"
      />
      </View>
      
  
      
    </View>
  );

}


const styles = StyleSheet.create ({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    paddingHorizontal:20,
    paddingTop: StatusBar.currentHeight || 20,
    paddingBottom: StatusBar.currentHeight || 20,
    backgroundColor:colors.background,
    
  },
  image: {
    width: 150,
    height:50,
    marginBottom:20,
  },
  title:{
    fontSize:20,
    textAlign: 'center',
    fontWeight:'700',
    fontFamily:fonts.heading,
    color:colors.white,

  },
  label:{
    fontWeight:'700',
    fontFamily:fonts.heading,
    fontSize:18,
    marginTop:10,
    marginBottom:0,
  },
 
  button:{
    marginTop:20,
    marginBottom:50,
  }
   
})
