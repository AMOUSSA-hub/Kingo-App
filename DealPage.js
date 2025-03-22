import { Text, View,StyleSheet,Image,ScrollView, TextInput,FlatList } from "react-native";
import {CustomButton, CustomInput} from "./CustomElements";
import AdviceCard from "./AdviceCard";
import { useEffect, useState } from "react";
import { Button } from "react-native";
import { createRate, getRatesFromDeal } from "./APIUtils";
import { auth } from "./firebase";

/**
 * Composant représentant une page qui affiche les informations d'un Deal.
 * @param {*} props 
 * @returns {React.JSX.Element} - Le composant Deal.
 */
export default function DealPage(props){

    const {title,description,image,MinPrix,idDeal} =props.route.params

    const[comment,setComment] = useState()

    const[advices,setAdvices]= useState()

    const [currentRate, setRate]= useState()

    const handleChangeComment = (value) =>{
    
        setComment(value)
      }

      const sendComment = async() =>{

        console.log(auth.currentUser.uid+" "+idDeal+" "+currentRate+" "+comment);
        try {
            const data = await createRate(auth.currentUser.uid,idDeal,currentRate,comment);
            
            setComment("")
            console.log(data);
          } catch (error) {
            console.error(error);
          }
          fetchData()


        
        
      }

      const rate= ["1","2","3","4","5"]
      
      const fetchData = async () => {
        try {
          const data = await getRatesFromDeal(idDeal);

          
          setAdvices(data);
  
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {    
        fetchData()
      }, []);

      

    return(



        <View  style={styles.mainView}>
           
        <ScrollView contentContainerStyle={{alignItems: 'center',flex: 1}} horizontal={true} showsHorizontalScrollIndicator={true}>
                <Image source={image} style ={styles.picture} />               
          </ScrollView>

            <View style={{flex : 1}}>
                <Text style={styles.Title}>{title}</Text>
                <Text style={styles.Title}>{description}</Text>
                <Text>À partit de {MinPrix}€  </Text>
            </View>



          
<Text >Commentaires</Text>
            <FlatList style={{flex:2}}
             contentContainerStyle={{ flex:1 }}
                    
                        data={advices?.rate}
                        renderItem={({ item }) => <AdviceCard user={item.username} comment={item.Comment} date={item.created_at} rate={item.Rate}/>}
                        keyExtractor={(item) => item.idRate}
                    />


          <View style= {styles.editCommentSection}  >

                <View flexDirection="row">
                    <Text>Note: </Text>
                    <FlatList style={{flex:1}}
                    horizontal={true}
                        data={rate}
                        renderItem={({ item }) => <Button title={item} onPress={setRate(item)}/>}
                        keyExtractor={(item) => item}
                    />

                </View>


                    <View flexDirection="row">
                    <CustomInput value={comment} flex= {5} multiline handleChangeValue={(v)=> handleChangeComment(v)} placeholder="Ajoutez un commentaire" />
                    <CustomButton title="Poster"   onPress={sendComment} />
                    </View>
                    </View>

        </View>
    )
}


const styles = StyleSheet.create({

    picture:{       
        width: "100%",
        height: "50%",
        resizeMode: "contain",      
    },
    Title:{
        color: "black",
    
    }, 
    mainView:{
        alignItems:"center",
        flex : 1
    },

    editCommentSection:{  
        backgroundColor: "#A2A2A2",
        padding:"5%",
        width:"100%",
        position: 'absolute', bottom: 0, left: 0 
    }

})