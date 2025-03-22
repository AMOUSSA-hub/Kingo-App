import {StyleSheet,Text, View, } from 'react-native';
  import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GoogleAuthProvider,getAuth,signInWithRedirect } from "firebase/auth";
import { auth } from './firebase';





 /**
  * Composant représentant un bouton qui permet de se connecter avec un compte Google
  * @param {*} props 
  * @returns {React.JSX.Element} - Le composant GoogleButton.
  */
export default function GoogleButton(props){


    const signInWithGoogle = async() =>{

      const provider = new GoogleAuthProvider();

      auth.languageCode = "it"


      signInWithRedirect(getAuth(), provider);
/*
      GoogleSignin.configure({
        webClientId: '614152835115-geu204kas6dq0ll86lpo5eaacot8n7ae.apps.googleusercontent.com',
      });
      try {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the user's ID token
        const { idToken } = await GoogleSignin.signIn();
    
        // Create a Google credential with the token
        const googleCredential = GoogleAuthProvider.credential(idToken);
        // Sign-in the user with the credential
       await  signInWithCredential(auth,googleCredential);
      } catch (error) {
        console.error(error);
      }*/

      
    }



    return(
        <TouchableOpacity onPress={signInWithGoogle} >
                    <View style={styles.button} flexDirection="row" alignSelf="center">
                        <Text style = {{color:"white",fontSize:15,fontWeight:"bold"}}>Se Connecter avec Google </Text>
                        <FontAwesomeIcon icon={faGoogle} color='white' />
                    </View>
                </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    button:{
        backgroundColor:"black",
        borderRadius:30,
        alignItems:"center",
        padding: "5%",
        marginTop:"5%"
    }

})