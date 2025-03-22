

const URL_API= "http://dwarves.iut-fbleau.fr/~amoussa/APIKingo/" 
/**
 * Fonction permettant de créer un utilisateur avec une adresse email.
 * @param {string} uid 
 * @param {string} email 
 * @returns
 */
export async function  createUserWithEmail(uid,email){

    try {
        const response = await fetch(URL_API+"User/creer.php",{

            method:'POST',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                uid : uid,
                email : email
    
              }) 
        })

        const responseData = await response.json();
        return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
  }
        
    



} 


/**
 * Fonction permettant d'obtenir les informations d'un utilisateur grâce à son uid.
 * @param {string} uid 
 * @returns 
 */
export async function getUserInfo(uid){
    try {
        const response = await fetch(URL_API+"User/lire_un.php?uid="+uid)

        const responseData = await response.json()
        
        return responseData;
  } catch (error) {
    console.error(error);
    throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
  }
       


}
/**
 * Fonction permettant de récupérer tous les avis d'un utilisateur.
 * @param {string} uid 
 * @returns 
 */
export async function getUserRates(uid){
  try {
      const response = await fetch(URL_API+"Rate/lire_par_User.php?idUser="+ uid)
      if(response.headers.map["content-length"] != 0){
        const responseData = await response.json()
      
        return responseData;
      }else{return false}
      
      
} catch (error) {
  console.error(error);
  throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}
     


}

/**
 * Fonction permettant de récupérer les 5 meilleurs Deals de l'application.
 * @returns 
 */
export async function getBestDeal(){

  try {
    const response = await fetch(URL_API+"Deal/lireBest.php")
    
    if(response.headers.map["content-length"] != 0){
      
      const responseData = await response.json()
    
      return responseData;
    }else{return false}
    
    
} catch (error) {
console.error(error);
throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}
}

/**
 * Fonction  permettant de rechercher un deal en fonction de son titre
 * @returns 
 */
export async function searching(keyword){

  try {
    const response = await fetch(URL_API+"Deal/search.php?value="+keyword)
    
    if(response.headers.map["content-length"] != 0){
      
      const responseData = await response.json()
    
      return responseData;
    }else{return false}
    
    
} catch (error) {
console.error(error);
throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}

}


export async function getRatesFromDeal(idDeal){
  try {
      const response = await fetch(URL_API+"Rate/lire_par_Deal.php?idDeal="+idDeal)
      
      if(response.headers.map["content-length"] != 0){
      const responseData = await response.json()
      return responseData
    }else{return false}


} catch (error) {
  console.error(error);
  throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}

}


export async function  createRate(uid,idDeal,rate,comment){

  try {
      const response = await fetch(URL_API+"Rate/creer.php",{

          method:'POST',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idUser : uid,
              idDeal: idDeal,
              rate: rate,
              comment: comment
  
            }) 
      })

      const responseData = await response.json();
      return true;
} catch (error) {
  console.error(error);
  throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}

} 


export async function  EditProfile(uid,email,username){

  try {
      const response = await fetch(URL_API+"User/modifier.php",{

          method:'PUT',
          headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uid : uid,
              email: email,
              username: username
  
            }) 
      })


      const responseData = await response.json();
      
      return true;
} catch (error) {
  console.error(error);
  throw new Error('Une erreur s\'est produite lors de la communication avec l\'API.');
}

} 




