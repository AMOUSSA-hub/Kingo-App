import { useEffect, useState } from "react"
import { View,Text } from "react-native"
import { CustomButton, FormElement } from "./CustomElements"
import { StyleSheet } from "react-native"
import { EditProfile } from "./APIUtils"
import { auth } from "./firebase"

/**
 * Composatn représentant la page de modification du profil utilisateur.
 * @param {*} props 
 * @returns {React.JSX.Element} - Le composant UserDashboard
 */
export default function UserDashBoard(props){


const userInfo =props.route.params.user
const [username,setUsername] = useState(userInfo.username)
const [tel,setTel] = useState(auth.phone)



const handleChangeValue = (v,field) =>{

    if(field == "username"){
        setUsername(v)
    }

    if(field == "tel"){

        setTel(v)
    }
   



}

const SubmitChange = async () =>{

    try {

        await EditProfile(userInfo.uid,userInfo.email,username)
        props.navigation.goBack()
        
    } catch (error) {
        
    }


}

    return(

        <View style={{flex:1, justifyContent: 'center'}}  >
<View alignSelf="center" style={{justifyContent:'center',flex:1}} >
        <Text style={styles.PageTitle}>Mes informations</Text>
      </View>
                <View style={{flex: 2}}>
                <FormElement label="Nom d'utilisateur" value={username} handleChangeValue={(value) => handleChangeValue(value,"username")}   />
                <FormElement label="Numéro de Téléphone (format international:+...)" value={tel} handleChangeValue={(value) => handleChangeValue(value,"tel")} placeholder="Entrez votre numéro de téléphone" keyboardType="phone-pad"  />
                    <FormElement label="Email" value={userInfo.email} handleChangeValue={(value) => null}  editable={false} style={{paddingVertical:5}}  />
                    <CustomButton title="Enregistrer" onPress={SubmitChange}/>
                </View>

              


        </View>

    )

}


const styles = StyleSheet.create({

    PageTitle:{

        color:"black",
        fontWeight:"bold",
        fontSize:25

    },

    erreur:{
      color: "red",
      alignSelf:'center',
      marginBottom:"2%"
    }



}) 