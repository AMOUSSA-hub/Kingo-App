import { ChangeEvent } from "react";
import { TouchableHighlight } from "react-native";
import { Text, View,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons';


/**
 * Composant représentant un bouton personnalisé.
 * @param {{title: string}} props - texte contenu dans le bouton.
 * @returns {React.JSX.Element} - Le composant CustomButton.
 */
export  function CustomButton(props){

  const styles = StyleSheet.create({

    ButtonText: {
        fontSize : 20,
        color : "black",
        fontWeight:"bold"
        },

    Button : {
        margin:"2%",
        backgroundColor:"#D9D9D9",
        borderRadius:30,
        alignItems:"center",
        padding: "5%"

      },

    })

    

    return(

        <TouchableOpacity onPress={props.onPress}  >
          <View style={styles.Button}>
            <Text style = {styles.ButtonText}>{props.title}</Text>
          </View>        
        </TouchableOpacity>
    )
}

/**
 * @typedef {Object} CustomInputProps - Les propriétés du composant CustomInput.
 * @property {string} value - La valeur du champ de saisie.
 * @property {string} placeholder 
 * @property {ChangeEvent} handleChangeValue 
 */


/**
 * Composant de saisie personnalisée.
 * @param {CustomInputProps} props - Les propriétés du composant CustomInput.
 * @returns {React.JSX.Element} - Le composant CustomInput.
 */
export function CustomInput(props) {

  const styles = StyleSheet.create({

    container_input:{
      backgroundColor:"#D9D9D9",
      margin: "2%",
      paddingHorizontal:"3%",
      borderRadius:3,
      alignItems: "center",
      flexDirection:"row",
      flex: props.flex
     
  },
  
      })
  return (
    <View style={styles.container_input} >
      <TextInput
      editable={props.editable}
        value={props.value}
        onChangeText={(text) => props.handleChangeValue(text)}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        style={{ flex: 1 }}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
      
      />
    </View>
  );
}

/**
 * @typedef {Object} DualSelectorProps - Les propriétés du composant DualSelector.
 * @property {string} leftTitle 
 * @property {string} rightTitle 
 * @property {ChangeEvent} leftHandler
 * @property {ChangeEvent} rightHandler 
 * 
 */

/**
 * Composant proposant 2 choix de sélection.
 * @param {DualSelectorProps} props 
 * @returns {React.JSX.Element} - Le composant DualSelector.
 */
export function DualSelector(props){
  const styles = StyleSheet.create({

    registerChoiceButton:{
       
       backgroundColor:"black",
       justifyContent:"center",
       
       backgroundColor:"#D9D9D9",
       marginHorizontal:"0.5%",
       width:"40%",
       padding:"2%"       
    },
    TextRegisterChoiceButton:{
        color:"black",
        fontSize: 15,
        textAlign:'center'     
    }

}) 

  return(
    <View flexDirection="row" justifyContent="center">
    <TouchableHighlight onPress={props.leftHandler} style={styles.registerChoiceButton}>
      <View alignItems="center" flexDirection="row">
        <FontAwesomeIcon  icon={faEnvelope}  style={{ marginHorizontal: '15%' }} />
        <Text style={styles.TextRegisterChoiceButton}>{props.leftTitle}</Text>
      </View>
    </TouchableHighlight>

    <TouchableHighlight onPress={props.rightHandler} style={styles.registerChoiceButton}>
      <View alignItems="center" flexDirection="row">
        <FontAwesomeIcon  icon={faPhone} style={{ marginHorizontal: '10%' }}/>
        <Text style={styles.TextRegisterChoiceButton}>{props.rightTitle}</Text>
      </View>
    </TouchableHighlight>
  </View>
  )

  
}

/**
 * @typedef {Object} FormElementProps - Les propriétés du composant FormElement.
 * @property {string} label 
 * @property {string} value
 * @property {string} placeholder
 * @property {ChangeEvent} handleChangeValue
 * 
 */

/**
 * Composant représentant un libellé et un champ de texte. 
 * @param {FormElementProps} props 
 * @returns {React.JSX.Element} - Le composant FormElement.
 */

export function FormElement(props){

  const styles = StyleSheet.create({
    TextLabel:{
      color: "black",
      fontWeight:"bold"
  },
      })

  return(
    <View>
      <Text style={styles.TextLabel}>{props.label}</Text>        
              <CustomInput
              editable={props.editable}
                value={props.value}
                handleChangeValue={(v)=> props.handleChangeValue(v)}
                placeholder={props.placeholder}
                keyboardType={props.keyboardType}
                secureTextEntry={props.secureTextEntry} />
    
    </View>
  )
}








