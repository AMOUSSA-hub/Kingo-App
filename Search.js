import {
    Image,
    StyleSheet,
    TextInput,
    View,
    FlatList,
    Text
  } from 'react-native';

  import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
  import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { searching } from './APIUtils';
import Card from './Card';
import { DealSection } from './Home';



/**
 * Composant représentant une page de recherche.
 * @returns {React.JSX.Element} - Le composant Search. 
 */
export default function Search({navigation}) {

    const image_test = {uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMVASv8iXjrppctIlMsedJ1r5pcq50afXdtQ&usqp=CAU'}

    const [searchString,setSearch] = useState("")
    const[searchResult,setResult] = useState()

    const handleSearch = async (text) =>{
        

         setSearch(text)
        if(text.trim().length !== 0 ){
           
            try {
                const data = await searching(text.trim());
                 setResult(data);
                 console.log(data)
                
                
            } catch (error) {
                
            }
    }else{
        setResult(null)
        //console.log(searchResult)
    }
    

       
    }

    function inspectDeal  (title,description,image,MinPrix) {


        navigation.navigate('DealPage',{title :title,description:description,image:image,MinPrix:MinPrix})
      
    }
    


return(
<View style={styles.mainContainer} >

    <View style = {styles.container_input} >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
    <TextInput
    value={searchString}
     color="black"
     style={{flex: 1}}
     onChangeText={(text) => handleSearch(text)} 
      ></TextInput>
    
    
    </View>

   
<DealSection data={searchResult} navigation={navigation} horizontal/>



    </View>


)


    


}

const styles = StyleSheet.create({

    mainContainer:{
        flex:1

    },

    container_input:{
        backgroundColor:"#D9D9D9",
        margin: "2%",
        paddingHorizontal:"2%",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20,
        alignItems: "center",
        flexDirection:"row",
        
    
        
    },

 


})
