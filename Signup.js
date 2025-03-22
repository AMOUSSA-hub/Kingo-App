import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import { auth } from './firebase';
import { AuthErrorCodes, createUserWithEmailAndPassword, } from 'firebase/auth';
import GoogleButton from './GoogleButton';
import { createUserWithEmail } from './APIUtils';
import { RecaptchaVerifier } from "firebase/auth";
import { createUserWithPhoneNumber } from './phoneAuth';
import {CustomButton, DualSelector, FormElement} from './CustomElements';





/**
 * Composant représentant une page d'inscription.
 * @param {*} param0 
 * @returns {React.JSX.Element} - Le composant SignUp.
 */
export default function SignUp({ navigation }) {






 const [textError, setTextError] = useState('erreur');

 const [isErrored, setIsErrored] = useState(false);

  const [inputType, setInputType] = useState('email');

  const handleEmailPress = () => {
    setInputType('email');
    setFormData({...formData,['tel'] : ''})
  };

  const handlePhonePress = () => {
    setInputType('phone');
    setFormData({...formData,['mail'] : ''})
  };


  const [formData, setFormData] = useState({
   mail:'',
   tel:'',
   mdp:'',
  check_mdp:''

  })

  const{mail,tel,mdp,check_mdp} = formData

  //Mise à jour des champs dans FormData
  
  

function isEmailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


  const handleChangeValue = (value,fieldName) =>{
    
    setFormData({...formData,[fieldName] : value})
  }


  const renderFormError = (errorMessage) =>{

    setTextError(errorMessage)
    setIsErrored(true)

  }

  const isValidForm = () => {

    if(inputType == 'email'){
    for(let i = 0; i< Object.values(formData).length ; i++){
      
       

          if(i !== 1 && Object.values(formData)[i].trim() == ''){
            renderFormError("Veuillez remplir tous les champs")
            return false
          }
      if(!isEmailValid( Object.values(formData)[0])){
        renderFormError("email invalide")
        return false
      }

    if(formData.mdp.length < 6){
      renderFormError("mot de passe trop court")
      return false

    }
    
    if(formData.mdp != formData.check_mdp){
      renderFormError("mots de passe différents")
      return false
    }
      

    }
  }

  if(inputType =='phone'){ 

          if( Object.values(formData)["tel"] == ''){
            renderFormError("Veuillez remplir tous les champs")
           return false
          }
      }

 

    


   return true
  }

  //soummettre le formulaire
  const submitForm = () =>{
  
    if(isValidForm()){
      
      signIn()
    }
  }

  const signIn = async () => {

    if(inputType == 'email'){

      try{
        await  createUserWithEmailAndPassword(auth,formData.mail,formData.check_mdp)
        createUserWithEmail(auth.currentUser.uid,auth.currentUser.email)
      } catch(error){
        console.error(" "+error)

        if( error.code == AuthErrorCodes.EMAIL_EXISTS){
          renderFormError("adresse email déjà utilisée")
        }else{
          renderFormError("Erreur connexion")
        }
        
      }
    }

    if(inputType == 'phone'){


      try{

        
        await  createUserWithPhoneNumber(formData.tel)       
        //createUserWithEmail(auth.currentUser.uid,auth.currentUser.email)
      } catch(error){
        console.error(" "+error)

        if( error.code == AuthErrorCodes.EMAIL_EXISTS){
          renderFormError("adresse email déjà utilisée")
        }else{
          renderFormError("Erreur connexion")
        }
        
      }
    }

  }


  return (
    <View style={{ flex: 1 }}>
      <View style={{ alignSelf: 'center', flex: 1, justifyContent: 'center' }}>
        <Text style={styles.PageTitle}>Inscrivez-vous</Text>
      </View>

      { isErrored == true &&   <Text style= {styles.erreur}>{textError}</Text> }

        <DualSelector leftTitle="Email" rightTitle="Téléphone" leftHandler={handleEmailPress} rightHandler={handlePhonePress} />

      <View style={{ flex: 3, margin: '5%' }}>
        {inputType === 'email' && (
          <>
            <FormElement label="Email" value={mail} handleChangeValue={(value) => handleChangeValue(value,'mail')}  placeholder="Entrez une adresse e-mail"  />
            <FormElement label="Mot de passe (min 6 caractères)" value={mdp} handleChangeValue={(value) => handleChangeValue(value,'mdp')}  placeholder="Entrez un mot de passe" secureTextEntry={true}   />
            <FormElement label="Confirmez votre mot de passe" value={check_mdp} handleChangeValue={(value) => handleChangeValue(value,'check_mdp')}  placeholder="Entrez un mot de passe" secureTextEntry={true}   />

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


        

               

                <CustomButton onPress={submitForm} title="Valider" />

                <GoogleButton/>

                <View style={{alignSelf:"center",flex:1,justifyContent:"center", flexDirection:"row",marginTop:"5%"}}>
                <Text style={{color:"black"}}> Déja Inscrit? </Text><Text style={{color: 'blue',textDecorationLine:"underline"}} onPress={() =>  navigation.navigate('Login')} >Connectez-Vous</Text>
            </View>
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