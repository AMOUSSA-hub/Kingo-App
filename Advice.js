import { Text, StyleSheet, View } from "react-native";
import React, { useEffect,useState} from 'react';
import { getUserRates } from "./APIUtils";
import { auth } from "./firebase";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import AdviceCard from "./AdviceCard";

export default function Advice(){

  const [userRates,setUserRates] = useState(null);
  const fetchData = async () => {
    try {

      const data = await getUserRates(auth.currentUser.uid);
      
      if(!data) {
        console.log("vide")
      }
      else{
      setUserRates(data);
      console.log(userRates);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
     
      fetchData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const rate= ["1","2","3","4","5"]


    return(

        <View >
        <Text  style = {styles.SubTitle}>Vos derniers avis </Text>
<View style={{justifyContent:"center",}}>

        <FlatList    
                contentContainerStyle={{marginVertical:"10%"}}     
                        data={userRates?.rate}
                        renderItem={({ item }) =><AdviceCard user="Moi"comment={item.Comment} date={item.created_at} rate={item.Rate}/> }
                        keyExtractor={(item) => item.idRate}
                    />


</View>

</View>



    )
}


const styles = StyleSheet.create({

 
    SubTitle:{
      fontSize :20,
      fontWeight: "bold",
      color : "black"
    }
    
  
  })