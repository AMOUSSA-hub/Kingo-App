import { Text, View,StyleSheet,Image, TouchableHighlight,TouchableOpacity } from "react-native";
import {signOut} from "firebase/auth";
import { auth } from "./firebase";
import { getUserInfo } from "./APIUtils";
import React, { useEffect,useState} from 'react';
import {CustomButton} from "./CustomElements";
import { useFocusEffect } from "@react-navigation/native";

/**
 * Composant représentant une page de profil utilisateur
 * @returns {React.JSX.Element} - Le Profile.
 */
export default function Profile({navigation}){
  
  const [userInfo,setUserInfo] = useState();


  const fetchData = async () => {
    try {
      const data = await getUserInfo(auth.currentUser.uid);
      setUserInfo(data);

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData()

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


  const disconnect = async () =>{
    try {
      signOut(auth)
    } catch (error) {
      console.error(error)
    }

  }

    return(

    <View style= {{flex : 1,justifyContent:"center"}}>



        <View style = {{alignItems: 'center',justifyContent:"center",flex:4}}>
          <Image style={styles.picture}  source={require('./Image/image_profil.webp')}/>
          <Text style={{color:"black"}}>{userInfo?.username ?? "Chargement..."}</Text>
        </View>

        <View style = {{alignItems: 'center',justifyContent:"center",flex:5}}>

        
        <TouchableHighlight onPress={() => navigation.navigate('UserDashboard',{user:userInfo})}>
          <View style={styles.SettingsButton}>
            <Text style = {styles.ButtonText}>Modifier le profil</Text><Text style = {styles.Arrow}> &gt; </Text>
                      </View>
          
        </TouchableHighlight>

        <TouchableHighlight onPress={() => null}>
          <View style={styles.SettingsButton}>
            <Text style = {styles.ButtonText}>Paramètres</Text><Text style = {styles.Arrow}> &gt; </Text>
          </View>
          
        </TouchableHighlight>

        <TouchableHighlight onPress={() => null}>
          <View style={styles.SettingsButton}>
            <Text style = {styles.ButtonText}>Aides  & Contacts</Text><Text style = {styles.Arrow}> &gt; </Text>
          </View>
          
        </TouchableHighlight>

        </View>

        <View style = {{marginTop: 50, marginHorizontal: 50,flex: 2}}>

        <CustomButton  onPress={disconnect} title="Déconnexion"/>

        </View>
        
    </View>
    
    )
}



const styles = StyleSheet.create({

   
  
    picture:{
  
      width: 200,
      height :200,
      borderRadius:100
     
      
    
    },

    SettingsButton :{
      marginVertical: 20,
      borderBottomWidth : 2,
      borderBottomColor:"black",
      
      flexDirection: "row",

      
      },

    ButtonText: {
      fontSize : 20,
      color : "black",
    
      },
      
      Arrow:{
        fontSize : 20,
      color : "black",
      alignSelf: "flex-end"
      },
    
    
  
  
    
  
  })