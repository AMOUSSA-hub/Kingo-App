import {
    StyleSheet,
    Text,
    View, TextInput,TouchableOpacity
  } from 'react-native';


export default function AdviceCard(props){

    const styles = StyleSheet.create({
 
        pdp:{
      
          width: 200,
          height :200,
          borderRadius:100
         
          
        
        },
    
        profilSection:{
        flexDirection:"row"
         
        },
        container :{

            backgroundColor:"#A9E7E8",
            marginVertical:"2%",
            marginHorizontal:"2%"
        }
    })

    return(


        <View style={styles.container} >
            <View style={styles.profilSection}>
            <Text >{props.user} </Text><Text style={{color:"black",fontWeight:"bold",fontSize:15}}>{props.rate}/5</Text>

            </View>
            <Text>{props.comment}</Text>
            <Text>{props.date}</Text>
        </View>


    )
}


