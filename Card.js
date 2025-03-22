
import { useEffect } from 'react';
import {

    Image,
    StyleSheet,
    Text,
    View,TouchableOpacity
  } from 'react-native';



/**
 * Composant représentant la "miniature" d'un deal 
 * @param {*} props 
 * @returns {React.JSX.Element} - Le composant Card.
 */
export default function Card ( props){

    const {title,type,image,description,MinPrix} = props
    

    useEffect(()=> {

      console.log(props);


    })

  




return(

  <TouchableOpacity onPress={props.onPress} style={{margin:2}}>                
    <Image  source={image} style ={styles.picture}/>   
<View >
<Text style= {{color:"black", fontWeight:"bold"}} >{title}</Text>
<Text style= {{color:"black"}} >{type}</Text>
<Text style= {{color:"black",width:"50%"}} >{description}</Text>
</View>
<Text style={{fontWeight:"bold"}}>À partir de<Text style={{fontSize:20}}> {MinPrix}€</Text> </Text>
</TouchableOpacity>
)

}


const styles = StyleSheet.create({


  
    picture:{
      
      height: "50%",
      width : "50%",  
    
    } 
   
  })