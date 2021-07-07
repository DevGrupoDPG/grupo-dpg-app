import React, {useContext}  from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import {  DrawerActions } from '@react-navigation/native';


import AuthContext  from '../contexts/auth';

import colors from '../styles/colors';
import fonts from '../styles/fonts';


export function Header(){

const navigation = useNavigation();


const  user = useContext(AuthContext);

const userSplit = `${user.userName}`;

const newName = userSplit.split(' ');

  return (
    <View style={styles.containerHeader}>
     <View style={styles.userNameContener}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{newName[0]}</Text>
     </View>
     <MaterialIcons name="menu" size={40}
          color={colors.white}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
   
 </View>
  )
}

const styles = StyleSheet.create({
  containerHeader: {
    flexDirection:'row',
    width:'100%',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:0,
    marginBottom:20
    //marginTop: getStatusBarHeight(),
  },
  config: {
    width: 56,
    height: 56,
    borderRadius:28,
  },
  greeting: {
    fontSize:20,
    color:colors.subtitle,
    fontFamily:fonts.text,
    lineHeight:40,
  },
  userNameContener:{
    flexDirection:'row',
  },
  userName: {
    fontSize:20,
    fontFamily: fonts.heading,
    color: colors.title,
    lineHeight:40,
    marginLeft:5,

  }
})