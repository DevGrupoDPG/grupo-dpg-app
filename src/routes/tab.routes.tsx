import React from 'react';
import Dashboard from '../pages/Dashboard';
import Solicitation from '../pages/Solicitation';


import Product from '../pages/Product';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import colors from '../styles/colors';


const AppTab = createBottomTabNavigator();




 const TabRoutes  = () => (
   <AppTab.Navigator
      tabBarOptions={{
        activeTintColor:colors.menuButtom,
        inactiveTintColor:colors.highlightColor,
        labelPosition:'below-icon',

        style:{
         paddingBottom:10,
         paddingTop:10,
         height:60,
        }
      }}
      
   >
     
    <AppTab.Screen 
      name="Home" 
      component = {Dashboard} 
      
      options = {{
        tabBarIcon: (({size, color}) => (
          <FontAwesome5
          name="home"
          size={size}
          color={color}
          />
        ))
        
      }
    }
    />
   
<AppTab.Screen 
    name="Suporte" 
      component = {Solicitation}
      options = {{
        tabBarIcon: (({size, color}) => (
          <AntDesign
          name="message1"
          size={20}
          color={color}
          />
        ))
        }
    }
    />
    <AppTab.Screen 
    name="Produtos" 
      component = {Product}
      options = {{
        tabBarIcon: (({size, color}) => (
          <Feather name="shopping-cart" size={size}
          color={color} />
        ))
        }
    }
    />




    </AppTab.Navigator>
 )

 export default TabRoutes;