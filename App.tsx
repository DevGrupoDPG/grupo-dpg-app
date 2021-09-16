import React from 'react';
import AppLoading from 'expo-app-loading';
import { StyleSheet, StatusBar, Platform} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {AuthProvider }  from './src/contexts/auth';
import Routes from './src/routes';
import {useFonts, Montserrat_400Regular,Montserrat_700Bold} from '@expo-google-fonts/montserrat'
import colors from './src/styles/colors';



export default function App() {


  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_400Regular
  })
  
  if(!fontsLoaded){
    return (
      <AppLoading/>
    );
  }

  return (
    
    <NavigationContainer>
      <StatusBar   backgroundColor={colors.background}/>
    <AuthProvider>
    <Routes />
    </AuthProvider>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
