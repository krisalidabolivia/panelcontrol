//=========================================
// REPERTORIOS.JS
//=========================================

// Reemplaza estos datos por los tuyos cuando quieras

const repertorios = {

    villera: [

        {
            numero:1,
            nombre:"Amor de mis amores",
            tono:"SOLm",
            artista:"Los Ángeles Azules",
            letra:"",
            observaciones:""
        },

        {
            numero:2,
            nombre:"Nunca es suficiente",
            tono:"LAm",
            artista:"Los Ángeles Azules",
            letra:"",
            observaciones:""
        }

    ],

    con_sabor: [],

    chicha_surena: [],

    folclore: [],

    clasica: []

};

//=========================================

function cargarRepertorio(nombre){

    return structuredClone(repertorios[nombre]);

}