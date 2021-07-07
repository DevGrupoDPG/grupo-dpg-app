import React, { createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as auth from '../services/auth';
import api from '../services/api';




interface User {
  name: string;
  email: string;
}
interface AuthContextData {
  signed: boolean;
  user: User | null | string | undefined;
  userName: User | null | string | undefined;
  userEmail: User | null | string | undefined;
  loading: boolean;
  signIn(username:any, password:any): Promise<void>;
  signOut(): void,
}



const AuthContext = createContext <AuthContextData>({} as AuthContextData);
export const AuthProvider: React.FC = ({children}) =>  {
 
  const [user, setUser] = useState<User | null |string>(null);
  const [userName, setUserName] = useState<User | null |string>(null);
  const [userEmail, setUserEmail] = useState<User | null |string>(null);

  const [loading, setLoading] = useState(true);

  useEffect (()=>{
    async function  loadStoragedData(){
  
    
    const storagedToken = await  AsyncStorage.getItem('@DPGAuth:token');
    const storagedUser = await  AsyncStorage.getItem('@DPGUser');
    const storagedEmail= await  AsyncStorage.getItem('@DPGEmail');
  
    
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
   
    if(storagedToken && storagedUser && storagedEmail) {
  
      setUser(storagedToken);
      const storagedUser = await  AsyncStorage.getItem('@DPGUser');
      setUserName(storagedUser);
      setUserEmail(storagedEmail);
  
    api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`;
     
     api.post('/wp-json/jwt-auth/v1/token/validate')
       .then((res) => {
         
         setUser(storagedToken);
         setLoading(false);
         
       })
       .catch((error) => {
         console.error(error.status)
      
       })
   
      
    }
    setLoading(false);
    }
    
    loadStoragedData();
   },[]);
   
   

async function signIn (username:any, password:any) {
   
  const response = await auth.signIn(username ,password);
  setUser(response.user.name);
  
  
  

  api.defaults.headers['Authorization'] = `Bearer ${response.token}`;

  
  await AsyncStorage.setItem('@DPGAuth:token', response.token);
  await AsyncStorage.setItem('@DPGUser', response.user.name);
  await AsyncStorage.setItem('@DPGEmail', response.user.email);
  const storagedUser = await  AsyncStorage.getItem('@DPGUser');
  setUserName(storagedUser);
  const storagedEmail= await  AsyncStorage.getItem('@DPGEmail');
  setUserEmail(storagedEmail);
 
}


 


function signOut(){
    AsyncStorage.clear().then(() => {
      setUser(null);
      setUserName(null);
      setUserEmail(null);
     
    })
  }


  return (
    <AuthContext.Provider value={{signed:!!user,user,userName, userEmail, signIn, signOut, loading}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

