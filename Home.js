
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    FlatList
  } from 'react-native';

import Card from './Card.js'
import { useEffect, useState } from 'react';
import { getBestDeal } from './APIUtils.js';






const image_test = {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVASv8iXjrppctIlMsedJ1r5pcq50afXdtQ&usqp=CAU'}

  


/**
 * Composant représentant la page d'accueil
 * @param {*} param0 
 * @returns {React.JSX.Element} - Le composant Home.
 */
export default function Home( {navigation}){

  const [bestDeal,setDeal] = useState()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBestDeal();
        setDeal(data);
        
        
       
      } catch (error) {
        console.error(error);
      }
    };

  
  fetchData()
 

  //setInterval(() => fetchData(),6000)

  }, []);




 




  function inspectDeal  (navigation,title,description,image,MinPrix,idDeal) {
      navigation.navigate('DealPage',{title :title,description:description,image:image,MinPrix:MinPrix,idDeal:idDeal})
    
  }

    return(


        <View style={{backgroundColor : "#FFFF",flex : 1}}>
    <View style = {styles.bestSection}>
        <Text style = {styles.BestSectionTitle}> Les plus appréciés </Text>
    


<DealSection data={bestDeal} navigation={navigation} horizontal/>



       
        </View>

        

        <View style = {styles.exploreSection}>
        <Text style = {styles.exploreTitle}> Explorer </Text>

          <View flexDirection="row"> 
            <TouchableHighlight onPress={() => null}>
            <View style={styles.button}>
              <Text style = {styles.TextButton}>Hotels</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight onPress={() => null}>
            <View style={styles.button}>
              <Text style = {styles.TextButton}>Loisirs</Text>
            </View>
          </TouchableHighlight>
          </View> 
          
          <TouchableHighlight onPress={() => null} style = {{ alignItems: 'flex-start'}}>
          <View style={styles.button}>
            <Text style = {styles.TextButton}>Restaurants</Text>
          </View>
        </TouchableHighlight>
       
        </View>
      </View>
  
  );


 
}

export function DealSection(props){

  function inspectDeal  (title,description,image,MinPrix,idDeal) {
   props.navigation.navigate('DealPage',{title :title,description:description,image:image,MinPrix:MinPrix,idDeal:idDeal})
  
}
  
  return(
        <FlatList
        contentContainerStyle={{ alignItems: 'center' }}
        horizontal={props.horizontal}
        showsHorizontalScrollIndicator={false}
        data={props.data?.Deal} 
        renderItem={({ item }) => (
            <View>
            <Card
              title={item.Titre}
              type={item.Type}
              description={item.Description}
              MinPrix={item.MinPrix}
              onPress={() => inspectDeal(item.Titre, item.Type, image_test,item.MinPrix,item.idDeal)}
              image={image_test}
            /></View>
      )}
    
      />
  )
}




const styles = StyleSheet.create({

    bestSection:{
      paddingTop:"15%",
      padding: '5%',
      backgroundColor: "#CACACA",
      flex :3
  
    } ,
  
  BestSectionTitle:{
      fontSize :20,
      fontWeight: "bold",
      color : "black",
    },
   
    exploreSection:{
        paddingTop:"5%",
        padding: '5%',
        backgroundColor: "#E5E5E5",
        flex: 1 
      },
      
      exploreTitle:{
        fontSize :40,
      fontWeight: "bold",
      color : "black"
      },
      button :{
        margin:5,
        backgroundColor:"#D9D9D9",
        borderRadius:30,
      },
      TextButton:{
        color: "black",
        margin: "2%"
      } 
  
  })