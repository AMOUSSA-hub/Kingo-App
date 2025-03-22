/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home.js'
import Search from './Search.js'
import Advice from './Advice.js';
import Profile from './Profile.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMagnifyingGlass,faHouse, faUser, faNoteSticky } from '@fortawesome/free-solid-svg-icons';
import Login from './Login.js';
import SignUp from './Signup.js';
import { createStackNavigator } from '@react-navigation/stack';
import { auth } from './firebase.js';
import DealPage from './DealPage.js';
import { StatusBar } from 'react-native';
import Card from './Card.js';
import UserDashBoard from './UserDashboard.js';

const Stack = createStackNavigator();

/**
 * Pile qui stocke les pages servant à l'authentification.
 * @returns {React.JSX.Element} -Le composant AuthStack
 */
function AuthStack() {
  return (
    <Stack.Navigator  screenOptions={{headerShown : false}} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

/**
 * Pile qui stocke les pages servant à consulter un Deal.
 * @returns {React.JSX.Element} -Le composant HomeStack
 */
function HomeStack(){
  return(
  <Stack.Navigator  screenOptions={{headerShown : false}} >
   
        <Tab.Screen   name="Home" component={Home}     />   
        
        
        <Stack.Group  screenOptions={{ presentation: 'modal' }}>
        <Tab.Screen   name="DealPage" component={DealPage}   />
        </Stack.Group>
        
</Stack.Navigator>
  )
}


function SearchStack(){
  return(
  <Stack.Navigator  screenOptions={{headerShown : false}} >
  
      <Tab.Screen   name="Search" component={Search} />
                    
        <Stack.Group  screenOptions={{ presentation: 'modal' }}>
        <Tab.Screen   name="DealPage" component={DealPage}   />
        </Stack.Group>
        
</Stack.Navigator>
  )
}




function ProfileStack(){
  return(
  <Stack.Navigator  screenOptions={{headerShown : false}} >
    
        <Tab.Screen   name="Profile" component={Profile}     />
        
        <Stack.Group  screenOptions={{ presentation: 'modal' }}>
        <Tab.Screen   name="UserDashboard" component={UserDashBoard}   />
        </Stack.Group>
        
</Stack.Navigator>
  )
}



const Tab = createBottomTabNavigator();

/**
 * Pile qui stocke les pages principale de l'application (HOME,SEARCH,AVIS,PROFILE)
 * @returns {React.JSX.Element} -Le composant MyTabs
 */
  function MyTabs() {
  return (
    <Tab.Navigator    screenOptions={{tabBarStyle:{backgroundColor:"#404040"} ,tabBarActiveBackgroundColor:"#8A8686", headerShown : false}}   >
      <Tab.Screen   name="Découvrir" component={HomeStack}  options={{tabBarIcon: () =>{ return   <FontAwesomeIcon icon={faHouse} color='white' />}}}    />
      <Tab.Screen name="Rechercher" component={SearchStack} options={{tabBarIcon: () =>{ return   <FontAwesomeIcon icon={faMagnifyingGlass} color='white'  />}}}  />
      <Tab.Screen name="Avis" component={Advice}   options={{tabBarIcon: () =>{ return   <FontAwesomeIcon icon={faNoteSticky} color='white'  />}}}  />
      <Tab.Screen name="Mon Compte" component={ProfileStack}  options={{tabBarIcon: () =>{ return   <FontAwesomeIcon icon={faUser} color='white' />}}}  />
      
    </Tab.Navigator>
  );
}






 function AuthStage(){

  return(
<NavigationContainer>

        <AuthStack/>
      </NavigationContainer>
  )
}


function BodyApp(){

  return(
    <NavigationContainer>

        <StatusBar/>
    <MyTabs/>
  </NavigationContainer>
  )

}





/**
 *  Element Racine de l'application
 * @returns {React.JSX.Element} - Le composant App
 */
export default function App(){

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <AuthStage/>
    );
  }

  return (
   <BodyApp/>
  );


}




  






