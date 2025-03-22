import {
    StyleSheet,
    Text,
    View, TextInput,TouchableOpacity,TouchableHighlight
  } from 'react-native';
import {signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import {useState} from 'react'
import GoogleButton from './GoogleButton';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';
import {CustomButton, DualSelector, FormElement} from './CustomElements';











/**
 * Composant représentant une page de connexion.
 * @param {*} param0 
 * @returns {React.JSX.Element} - Le composant Login.
 */
export default function Login( {navigation} ){

    

    const [formData, setFormData] = useState({
        mail:'',
        tel:'',
        mdp:'',
     
       })
/**
 * fonction permettant d'afficher un message d'erreur.
 * @param {*} errorMessage -  message d'erreur. 
 */
       const renderFormError = (errorMessage) =>{

        setTextError(errorMessage)
        setIsErrored(true)
    
      }


       //variable permettatnt de déterminer le moyen de connexion (email ou tel).
       const [inputType, setInputType] = useState('email');
       
       //variable permettant de gérer l'affichage des erreurs
       const [isErrored, setIsErrored] = useState(false);
       const [textError, setTextError] = useState('erreur');

       /**
       * handler des champs de texte
       */
       const handleChangeValue = (value,fieldName) =>{
      
        setFormData({...formData,[fieldName] : value})
      
    }
      /**
       * handler du bouton "Email"
       */
      const handleEmailPress = () => {
        setInputType('email');
        setFormData({...formData,['tel'] : ''})
      };
    
    

      /**
       * handler du bouton "Téléphone"
       */
      const handlePhonePress = () => {
        setInputType('phone');
        setFormData({...formData,['mail'] : ''})
      };

      const{mail,tel,mdp} = formData
/**
 * Fonction qui lance le processus d'authentification
 */
      const login = async () => {

        if( inputType == "email"){

       console.log(formData.mail); 
        try {
        await  signInWithEmailAndPassword(auth, formData.mail, formData.mdp)
        } catch (error) {
            renderFormError("Identifiants incorrects")
            console.error(error)
            
        }
    }

    if( inputType == "phone"){

        console.log(formData.tel); 
         try {
      //     await  signInWithEmailAndPassword(auth, formData.mail, formData.mdp)
         } catch (error) {
             console.error(error)
             renderFormError("Identifiants incorrects")
         }
     }
        
 
    }

   
    

    return(

        <View style={{flex:1,backgroundColor:"white"}}>

            <View  style={{alignSelf:"center",flex:1,justifyContent:"center"}} >
                <Text style={styles.PageTitle}>Connectez-vous</Text>
            </View>

            { isErrored == true &&   <Text style= {styles.erreur}>{textError}</Text> }


            <DualSelector leftTitle="Email" rightTitle="Téléphone" leftHandler={handleEmailPress} rightHandler={handlePhonePress} />

      
            <View style={{margin:"5%"}}>
            {inputType === 'email' && (
                <>
                <FormElement label="Email" value={mail} handleChangeValue={(value) => handleChangeValue(value,'mail')}  placeholder="Entrez votre adresse e-mail"  />
                <FormElement label="Mot de passe" value={mdp} handleChangeValue={(value) => handleChangeValue(value,'mdp')}  placeholder="Entrez votre mot de passe" secureTextEntry={true}  />
                </>
                )}

            {inputType === 'phone' && (
                    <>
                         <FormElement
                             label="Numéro de Téléphone (format international:+...)"
                              value={tel}
                               handleChangeValue={(value) => handleChangeValue(value,'tel')}
                                placeholder="Entrez votre numéro de téléphone"
                                 keyboardType="phone-pad" />
                            </>
                    )}

                <CustomButton title="Connexion" onPress={login} />
                <GoogleButton />

            </View>

            <View style={{alignSelf:"center",flex:1,justifyContent:"center", flexDirection:"row"}}>
                <Text style={{color:"black"}}> Première visite? </Text><Text style={{color: 'blue',textDecorationLine:"underline"}} onPress={() =>  navigation.navigate('SignUp')}>Créer un compte</Text>
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