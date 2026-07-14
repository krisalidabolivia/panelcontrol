import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";


import {
    getFirestore,
    doc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey:
    "AIzaSyAH8dAi9Vfg647KGM_zJmByqOmDUCn-Vtg",

    authDomain:
    "repertorio-krisalida-12a7b.firebaseapp.com",

    projectId:
    "repertorio-krisalida-12a7b",

    storageBucket:
    "repertorio-krisalida-12a7b.firebasestorage.app",

    messagingSenderId:
    "1042934756464",

    appId:
    "1:1042934756464:web:dfc99a83c5a561d5bfb0b5"

};


const app = initializeApp(

    firebaseConfig

);


const db = getFirestore(app);


const documentoRepertorio = doc(

    db,

    "repertorios",

    "krisalida"

);


window.guardarEnFirebase = async function(

    datos

){

    try{

        await setDoc(

            documentoRepertorio,

            {

                contenido:datos,

                ultimaActualizacion:

                    new Date()

                    .toISOString()

            }

        );


        console.log(

            "☁ Repertorio guardado"

        );

    }

    catch(error){

        console.error(

            "Error al guardar:",

            error

        );

    }

};


window.escucharFirebase = function(

    funcion

){

    return onSnapshot(

        documentoRepertorio,

        documento=>{


            if(

                documento.exists()

            ){

                funcion(

                    documento.data()

                    .contenido

                );

            }

            else{

                window.guardarEnFirebase(

                    window.datosRepertorio

                );

            }

        },

        error=>{

            console.error(

                "Error de Firebase:",

                error

            );

        }

    );

};