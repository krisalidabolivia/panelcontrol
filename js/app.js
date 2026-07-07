//=========================================
// REPERTORIO KRISÁLIDA
// APP PRINCIPAL
//=========================================

// Contenedores principales
const inicio = document.getElementById("inicio");
const repertorio = document.getElementById("repertorio");

const tituloRepertorio = document.getElementById("tituloRepertorio");
const listaCanciones = document.getElementById("listaCanciones");

// Botones
const btnVolver = document.getElementById("volver");
const btnNueva = document.getElementById("agregarCancion");

const categorias = document.querySelectorAll(".categoria");

// Variables globales
let categoriaActual = "";
let cancionesActuales = [];

//=========================================
// EVENTOS
//=========================================

// Abrir categorías
categorias.forEach(boton=>{

    boton.addEventListener("click",()=>{

        categoriaActual = boton.dataset.cat;

        abrirCategoria(categoriaActual);

        cargarGrupos();

    });

});

// Volver al menú principal
btnVolver.addEventListener("click",()=>{

    document.getElementById("inicio").style.display="block";

    document.getElementById("repertorio").style.display="none";

});

// Nueva canción
btnNueva.addEventListener("click",()=>{

    abrirEditor();

});

//=========================================
// FUNCIONES
//=========================================

function abrirCategoria(nombre){

    // Ocultar menú principal
    document.getElementById("inicio").style.display="none";

    // Mostrar repertorio
    document.getElementById("repertorio").classList.remove("oculto");
    document.getElementById("repertorio").style.display="block";

    categoriaActual=nombre;

    const datosStorage=cargarStorage(nombre);

    if(datosStorage){

        cancionesActuales=datosStorage;

    }else{

        cancionesActuales=cargarRepertorio(nombre);

    }

    cancionesActuales.sort((a,b)=>a.numero-b.numero);

    tituloRepertorio.textContent=obtenerTitulo(nombre);

    renderTabla(cancionesActuales);

}

//=========================================

function obtenerTitulo(nombre){

    switch(nombre){

        case "villera":
            return "🎵 Villera";

        case "con_sabor":
            return "🎺 Cumbia con Sabor";

        case "chicha_surena":
            return "🎸 Chicha Sureña";

        case "folclore":
            return "🪘 Folclore";

        case "clasica":
            return "🎼 Clásica";

        default:
            return "";

    }

}