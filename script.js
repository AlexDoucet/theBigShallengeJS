const { createHash } = require('crypto');


const createChallenge = "https://shallenge.onrender.com/challenges/";
let count = 0
//renverra une chaîne de caractères représentant le hachage en format hexadécimal
function doHash(string){
return createHash('sha256').update(string).digest('hex');
}


fetch(createChallenge, {
    method : "POST",
    headers: {
        "Content-Type": 'application/json'
    }
})
.then(response => response.json()) // traite la réponse en tant que JSON. 
.then(responseData =>{ // Une fois que les données JSON de la réponse ont été extraites, ce bloc de code s'exécute
    let salt = Buffer.from(responseData.salt, 'hex'); // extrait la propriété salt des données JSON et crée un objet Buffer à partir de la valeur de cette propriété. La valeur est supposée être en format hexadécimal, d'où l'utilisation de 'hex' comme deuxième argument de Buffer.from().
    console.log(salt, "salt");
    console.log(responseData.id, "id");

    let abc = "abcdefghijklmnopqrstuvxyz";

for(let i = 0; i < 26; i++){
    
    for(let j = 0; j < 26; j++){
        for(let k = 0; k < 26; k++){
            for(let l = 0; l < 26; l++){
                for(let m = 0; m < 26; m++){
                    for(let n = 0; n < 26; n++){

                        
                        if(doHash(Buffer.concat([salt, Buffer.from(`${abc[i]}${abc[j]}${abc[k]}${abc[l]}${abc[m]}${abc[n]}`,'utf-8')])) === responseData.hash){ // vérifie si le hachage calculé à partir d'une combinaison de salt (sel) et d'une chaîne de caractères correspond au hachage renvoyé dans la propriété hash des données de réponse (responseData).
                            console.log(`${abc[i]}${abc[j]}${abc[k]}${abc[l]}${abc[m]}${abc[n]}`);

                            console.log(i*j*k*l*m*n);
                                fetch(`https://shallenge.onrender.com/challenges/${responseData.id}/answer`,{
                                    method : "POST",
                                    headers : {"Content-Type" : "application/json"},
                                    body : JSON.stringify(`${abc[i]}${abc[j]}${abc[k]}${abc[l]}${abc[m]}${abc[n]}`)
                                    })
                                    .then(res => res.text())
                                    .then(data => console.log(data));
                                    

                                    return console.log('You suceed !!!')
                            }
                    
                    }
                }
            }
        }
    }
}


})