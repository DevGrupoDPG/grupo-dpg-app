import React, {useContext}  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Simgle from '../pages/Simgle';
import SimgleHistoric from '../pages/SimgleHistoric';
import SimgleClient from '../pages/SimgleClient';
import SimgleUser from '../pages/SimgleUser';
import ConfigUser from '../pages/ConfigUser';
import Dashboard from '../pages/Dashboard';
import Product from '../pages/Product';
import SingleProduct from '../pages/SingleProduct';
//import TabRoutes from './tab.routes';
import ThankClient from '../pages/ThankClient';
import ThankHistorical from '../pages/ThankHistorical';
import ThankProduct from '../pages/ThankProduct';
import Solicitation from '../pages/Solicitation';
import SolicitationProduct from '../pages/SolicitationProduct';
import AuthContext  from '../contexts/auth';
import {DrawerActions } from '@react-navigation/native';






import colors from '../styles/colors';


const StackRoutes = createStackNavigator();


import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();


function DashboardScreenStack() {
  return (
   
      <StackRoutes.Navigator 
      headerMode='none' 
      screenOptions = {{
        cardStyle:{
            backgroundColor: colors.white
        },
      
      }} 
      >
      <StackRoutes.Screen 
       name="Início" 
       component = {Simgle} 
      /> 
    
     
         <StackRoutes.Screen 
      name="Home"
      component={Dashboard}
    />
        
 
       <StackRoutes.Screen 
        name="Histórico"
        component = {SimgleHistoric}
      /> 
    
     
     <StackRoutes.Screen 
        name="Configuração"
        component = {ConfigUser}
      />
     <StackRoutes.Screen 
        name="Usuário"
        component = {SimgleUser}
      />
        <StackRoutes.Screen 
        name="Cliente"
        component = {SimgleClient}
      />
    
    <StackRoutes.Screen 
      name="Obrigado"
      component={ThankHistorical}
     />
    <StackRoutes.Screen 
          name="Mensagem" 
          component = {Solicitation}
          />
   
   <StackRoutes.Screen 
      name="Produtos"
      component={Product}
     />
       <StackRoutes.Screen 
      name="Produto"
      component={SingleProduct}
     />
     
     <StackRoutes.Screen 
          name="Contratar Produto" 
          component = {SolicitationProduct}
          />
     <StackRoutes.Screen 
      name="Obrigado Produto"
      component={ThankProduct}
     />
   
     
 
  </StackRoutes.Navigator>
  );
}
function ProductScreenStack() {
  return (
   
  <StackRoutes.Navigator 
      headerMode='none' 
      screenOptions = {{
        cardStyle:{
            backgroundColor: colors.white
        },
      
      }} 
      >
        <StackRoutes.Screen 
      name="Produtos"
      component={Product}
     />
       <StackRoutes.Screen 
      name="Produto"
      component={SingleProduct}
     />
     
     <StackRoutes.Screen 
          name="Contratar Produto" 
          component = {SolicitationProduct}
          />
    
         <StackRoutes.Screen 
      name="Home"
      component={Dashboard}
    />
     <StackRoutes.Screen 
      name="Obrigado Produto"
      component={ThankProduct}
     />
    
        
        
      

  </StackRoutes.Navigator>
  );
}


function MensagemScreenStack() {
  return (
   
  <StackRoutes.Navigator 
      headerMode='none' 
      screenOptions = {{
        cardStyle:{
            backgroundColor: colors.white
        },
      
      }} 
      >
      <StackRoutes.Screen 
          name="Mensagem" 
          component = {Solicitation}
          />
  
     
         <StackRoutes.Screen 
      name="Home"
      component={Dashboard}
    />
        
      

  </StackRoutes.Navigator>
  );
}


function ConfigScreenStack() {
  return (
   
  <StackRoutes.Navigator 
      headerMode='none' 
      screenOptions = {{
        cardStyle:{
            backgroundColor: colors.white
        },
      
      }} 
      >
      <StackRoutes.Screen 
        name="Configuração"
        component = {ConfigUser}
      />
   
      <StackRoutes.Screen 
        name="Usuário"
        component = {SimgleUser}
      />
        <StackRoutes.Screen 
        name="Cliente"
        component = {SimgleClient}
      />
      <StackRoutes.Screen 
      name="Dados Atualizados"
      component={ThankClient}
     />
     
  </StackRoutes.Navigator>
  );
  
}


function CustomDrawerContent(props:any) {

  const {signOut } = useContext(AuthContext);

function  handleSignOut(){
   
    signOut();
  
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => {handleSignOut(); props.navigation.dispatch(DrawerActions.closeDrawer()); }} />
    </DrawerContentScrollView>
  );
}
  const AppRoutes  = () => (
  
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
    drawerContentOptions={{
      activeTintColor: colors.colorActive,
      itemStyle: { marginVertical: 5 },
      
    }}
    >
    <Drawer.Screen
      name="Home"
      options={{ drawerLabel: 'Home' }}
      component={DashboardScreenStack}
    />
    <Drawer.Screen
      name="Mensagem"
      options={{ drawerLabel: 'Mensagem' }}
      component={MensagemScreenStack}
    />
     <Drawer.Screen
      name="Produtos"
      options={{ drawerLabel: 'Produtos' }}
      component={ProductScreenStack}
    />
    <Drawer.Screen
      name="Configuração"
      options={{ drawerLabel: 'Configuração' }}
      component={ConfigScreenStack}
    />
   
    
    
  </Drawer.Navigator>
)

export default AppRoutes;