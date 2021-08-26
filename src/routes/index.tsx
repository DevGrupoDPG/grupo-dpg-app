import React, { useContext } from 'react';
import AuthContext from '../contexts/auth';
import {View, ActivityIndicator, StyleSheet } from 'react-native';


import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';


const Routes: React.FC = () => {

  const {signed, loading} = useContext (AuthContext);
  
  if (loading) {
    return (
     <View style={styles.content}>
      <ActivityIndicator size='large' color='#aa2734' />  
     </View>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />
};

export default Routes;

const styles = StyleSheet.create ({
  content: {
    flex:1,
    justifyContent:'center', 
    alignItems:'center',
  }
}
  );

