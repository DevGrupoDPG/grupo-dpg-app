import React, {useState, useContext} from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  StyleSheet,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import AuthContext  from '../contexts/auth';


const  updateBadge  = useContext(AuthContext);

export  function valorBadge(){
  return updateBadge;
}