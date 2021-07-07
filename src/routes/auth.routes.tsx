import React, { useContext } from 'react';
import SignIn from '../pages/Login';
 import { createStackNavigator } from '@react-navigation/stack';


 const AuthStack = createStackNavigator();

 const AuthRoutes = () => (

   <AuthStack.Navigator>
     <AuthStack.Screen name="Login" component = {SignIn} options={{headerShown:false}}/>
   </AuthStack.Navigator>
 )

 export default AuthRoutes;