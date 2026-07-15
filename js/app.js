const categorias = [

    {
        id:"villera",
        nombre:"Cumbia Villera",
        icono:"🪗"
    },

    {
        id:"sabor",
        nombre:"Cumbia con Sabor",
        icono:"🎹"
    },

    {
        id:"chicha",
        nombre:"Cumbia Chicha / Sureña",
        icono:"🎸"
    },

    {
        id:"folclore",
        nombre:"Folclore",
        icono:"🥁"
    }

];


let datos = JSON.parse(

    localStorage.getItem(

        "repertorioKrisalida"

    )

) || {};


let categoriaActual = "";

let sectorActual = "";

let cancionEditar = -1;



function guardarDatos(){

    localStorage.setItem(

        "repertorioKrisalida",

        JSON.stringify(datos)

    );


    window.datosRepertorio = datos;


    if(

        window.guardarEnFirebase

    ){

        window.guardarEnFirebase(

            datos

        );

    }

}



function iniciar(){

    categorias.forEach(

        categoria=>{

            if(!datos[categoria.id]){

                datos[categoria.id] = [];

            }

        }

    );

    guardarDatos();

    mostrarCategorias();

}



function mostrarCategorias(){

    const contenedor =

        document.getElementById(

            "contenedorCategorias"

        );


    contenedor.innerHTML = "";


    categorias.forEach(

        categoria=>{


            const sectores =

                datos[categoria.id].length;


            contenedor.innerHTML += `

                <article

                    class="categoria"

                    onclick="

                        abrirCategoria(

                            '${categoria.id}'

                        )

                    "

                >

                    <div class="icono">

                        ${categoria.icono}

                    </div>


                    <h3>

                        ${categoria.nombre}

                    </h3>


                    <p>

                        ${sectores}

                        sectores

                    </p>

                </article>

            `;

        }

    );

}



function abrirCategoria(id){

    categoriaActual = id;


    const categoria =

        categorias.find(

            item=>item.id===id

        );


    document.getElementById(

        "tituloCategoria"

    ).textContent =

        categoria.nombre;


    document.getElementById(

        "vistaCategorias"

    ).classList.add(

        "oculto"

    );


    document.getElementById(

        "vistaRepertorio"

    ).classList.remove(

        "oculto"

    );


    mostrarSectores();

}



function volverCategorias(){

    document.getElementById(

        "vistaRepertorio"

    ).classList.add(

        "oculto"

    );


    document.getElementById(

        "vistaCategorias"

    ).classList.remove(

        "oculto"

    );


    mostrarCategorias();

}



function abrirSector(){

    document.getElementById(

        "nombreSector"

    ).value = "";


    document.getElementById(

        "modalSector"

    ).classList.remove(

        "oculto"

    );

}



function cerrarSector(){

    document.getElementById(

        "modalSector"

    ).classList.add(

        "oculto"

    );

}



function guardarSector(){

    const nombre =

        document.getElementById(

            "nombreSector"

        ).value.trim();


    if(!nombre){

        alert(

            "Escribe el nombre"

        );

        return;

    }


    datos[categoriaActual].push({

        id:Date.now(),

        nombre:nombre,

        canciones:[]

    });


    guardarDatos();

    cerrarSector();

    mostrarSectores();

}



function mostrarSectores(){

    const contenedor =

        document.getElementById(

            "contenedorSectores"

        );


    const sectores =

        datos[categoriaActual];


    if(

        sectores.length===0

    ){

        contenedor.innerHTML = `

            <p>

                Todavía no existen

                sectores.

            </p>

        `;

        return;

    }


    contenedor.innerHTML = "";


    sectores.forEach(

        (sector,indiceSector)=>{


            let cancionesHTML = "";


            sector.canciones.forEach(

                (cancion,indice)=>{


                    cancionesHTML += `

                        <article

                            class="cancion"

                        >


                            <div class="numero">

                                ${

                                    String(

                                        indice+1

                                    ).padStart(

                                        2,

                                        "0"

                                    )

                                }

                            </div>


                            <div class="datos">

                                <h4>

                                    ${cancion.nombre}

                                </h4>


                                <p>

                                    🎤

                                    ${

                                        cancion.autor

                                        ||

                                        "Sin artista"

                                    }

                                    ·

                                    🎼

                                    ${

                                        cancion.tono

                                        ||

                                        "Sin tono"

                                    }

                                </p>

                            </div>


                            <div class="acciones">


                                ${

                                    cancion.youtube

                                    ?

                                    `
                                    <button

                                        class="boton-pequeno boton-orden"

                                        onclick="

                                            subirCancion(

                                                ${indiceSector},

                                                ${indice}

                                            )

                                        "

                                        title="Subir canción"

                                    >

                                        ⬆

                                    </button>


                                    <button

                                        class="boton-pequeno boton-orden"

                                        onclick="

                                            bajarCancion(

                                                ${indiceSector},

                                                ${indice}

                                            )

                                        "

                                        title="Bajar canción"

                                    >

                                        ⬇

                                    </button>
                                    <button

                                        class="boton-pequeno"

                                        onclick="

                                            window.open(

                                                '${cancion.youtube}',

                                                '_blank'

                                            )

                                        "

                                    >

                                        ▶ YouTube

                                    </button>

                                    `

                                    :

                                    ""

                                }


                                ${

                                    cancion.letra

                                    ?

                                    `

                                    <button

                                        class="boton-pequeno"

                                        onclick="

                                            mostrarLetra(

                                                ${indiceSector},

                                                ${indice}

                                            )

                                        "

                                    >

                                        📖 Letra

                                    </button>

                                    `

                                    :

                                    ""

                                }


                                <button

                                    class="boton-pequeno boton-editar"

                                    onclick="

                                        editarCancion(

                                            ${indiceSector},

                                            ${indice}

                                        )

                                    "

                                >

                                    ✏

                                </button>


                                <button

                                    class="boton-pequeno eliminar"

                                    onclick="

                                        eliminarCancion(

                                            ${indiceSector},

                                            ${indice}

                                        )

                                    "

                                >

                                    🗑

                                </button>


                            </div>


                            <div

                                id="letra-${indiceSector}-${indice}"

                                class="letra oculto"

                            >

                                ${cancion.letra}

                            </div>


                        </article>

                    `;

                }

            );


            contenedor.innerHTML += `

                <section class="sector">


                    <div class="sector-cabecera">


                        <h3>

                            SECTOR

                            ${indiceSector+1}

                            —

                            ${sector.nombre}

                        </h3>


                        <div class="acciones">


                            <button

                                class="boton-pequeno solo-admin"

                                onclick="

                                    abrirCancion(

                                        ${indiceSector}

                                    )

                                "

                            >

                                + Canción

                            </button>


                            <button

                                class="boton-pequeno"

                                onclick="

                                    renombrarSector(

                                        ${indiceSector}

                                    )

                                "

                            >

                                ✏ Sector

                            </button>


                            <button

                                class="boton-pequeno eliminar"

                                onclick="

                                    eliminarSector(

                                        ${indiceSector}

                                    )

                                "

                            >

                                🗑

                            </button>


                        </div>


                    </div>


                    <div class="lista-canciones">

                        ${

                            cancionesHTML

                            ||

                            "<p>No existen canciones.</p>"

                        }

                    </div>


                </section>

            `;

        }

    );

}



function abrirCancion(

    indiceSector

){

    sectorActual =

        indiceSector;


    cancionEditar = -1;


    limpiarFormulario();


    document.getElementById(

        "tituloFormulario"

    ).textContent =

        "Nueva canción";


    document.getElementById(

        "modalCancion"

    ).classList.remove(

        "oculto"

    );

}



function cerrarCancion(){

    document.getElementById(

        "modalCancion"

    ).classList.add(

        "oculto"

    );

}



function limpiarFormulario(){

    [

        "nombreCancion",

        "autorCancion",

        "tonoCancion",

        "youtubeCancion",

        "letraCancion",

        "observacionesCancion"

    ]

    .forEach(

        id=>{

            document.getElementById(

                id

            ).value = "";

        }

    );

}



function guardarCancion(){

    const cancion = {

        nombre:

            document.getElementById(

                "nombreCancion"

            ).value.trim(),

        autor:

            document.getElementById(

                "autorCancion"

            ).value.trim(),

        tono:

            document.getElementById(

                "tonoCancion"

            ).value.trim(),

        youtube:

            document.getElementById(

                "youtubeCancion"

            ).value.trim(),

        letra:

            document.getElementById(

                "letraCancion"

            ).value,

        observaciones:

            document.getElementById(

                "observacionesCancion"

            ).value

    };


    if(!cancion.nombre){

        alert(

            "Escribe el nombre"

        );

        return;

    }


    const canciones =

        datos[categoriaActual]

        [sectorActual]

        .canciones;


    if(

        cancionEditar===-1

    ){

        canciones.push(

            cancion

        );

    }

    else{

        canciones[

            cancionEditar

        ] = cancion;

    }


    guardarDatos();

    cerrarCancion();

    mostrarSectores();

}



function editarCancion(

    sector,

    indice

){

    sectorActual = sector;

    cancionEditar = indice;


    const cancion =

        datos[categoriaActual]

        [sector]

        .canciones[indice];


    document.getElementById(

        "nombreCancion"

    ).value = cancion.nombre;


    document.getElementById(

        "autorCancion"

    ).value = cancion.autor;


    document.getElementById(

        "tonoCancion"

    ).value = cancion.tono;


    document.getElementById(

        "youtubeCancion"

    ).value = cancion.youtube;


    document.getElementById(

        "letraCancion"

    ).value = cancion.letra;


    document.getElementById(

        "observacionesCancion"

    ).value =

        cancion.observaciones;


    document.getElementById(

        "tituloFormulario"

    ).textContent =

        "Editar canción";


    document.getElementById(

        "modalCancion"

    ).classList.remove(

        "oculto"

    );

}



function eliminarCancion(

    sector,

    indice

){

    if(

        !confirm(

            "¿Eliminar canción?"

        )

    ){

        return;

    }


    datos[categoriaActual]

    [sector]

    .canciones.splice(

        indice,

        1

    );


    guardarDatos();

    mostrarSectores();

}



function mostrarLetra(

    sector,

    cancion

){

    document.getElementById(

        `letra-${sector}-${cancion}`

    )

    .classList.toggle(

        "oculto"

    );

}



function renombrarSector(

    indice

){

    const sector =

        datos[categoriaActual]

        [indice];


    const nombre = prompt(

        "Nuevo nombre:",

        sector.nombre

    );


    if(

        !nombre

    ){

        return;

    }


    sector.nombre =

        nombre.trim();


    guardarDatos();

    mostrarSectores();

}



function eliminarSector(

    indice

){

    if(

        !confirm(

            "Se eliminará el sector y todas sus canciones"

        )

    ){

        return;

    }


    datos[categoriaActual]

    .splice(

        indice,

        1

    );


    guardarDatos();

    mostrarSectores();

}



window.datosRepertorio = datos;


function conectarFirebase(){

    if(

        !window.escucharFirebase

    ){

        setTimeout(

            conectarFirebase,

            300

        );

        return;

    }


    window.escucharFirebase(

        datosNube=>{

            if(

                datosNube

            ){

                datos = datosNube;


                window.datosRepertorio =

                    datos;


                localStorage.setItem(

                    "repertorioKrisalida",

                    JSON.stringify(datos)

                );


                mostrarCategorias();


                if(

                    categoriaActual

                ){

                    mostrarSectores();

                }

            }

        }

    );

}


iniciar();

conectarFirebase();

/* =================================
   ESTADO REAL DE INTERNET
================================= */

const indicadorConexion = document.getElementById(
    "estadoConexion"
);


function mostrarConectado(){

    indicadorConexion.className =
        "estado-conexion conectado";

    indicadorConexion.textContent =
        "🟢 Conectado — Guardado en la nube";

}


function mostrarSinInternet(){

    indicadorConexion.className =
        "estado-conexion sin-internet";

    indicadorConexion.textContent =
        "🟠 Sin internet — Guardado en este dispositivo";

}


/* COMPROBAR CONEXIÓN REAL */

async function comprobarInternet(){

    if(!navigator.onLine){

        mostrarSinInternet();

        return;

    }


    try{

        await fetch(

            "https://www.gstatic.com/generate_204",

            {

                method:"GET",

                mode:"no-cors",

                cache:"no-store"

            }

        );


        mostrarConectado();

    }

    catch(error){

        mostrarSinInternet();

    }

}


/* CUANDO WINDOWS DETECTA INTERNET */

window.addEventListener(

    "online",

    ()=>{

        comprobarInternet();

        guardarDatos();

    }

);


/* CUANDO WINDOWS DETECTA DESCONEXIÓN */

window.addEventListener(

    "offline",

    ()=>{

        mostrarSinInternet();

    }

);


/* COMPROBAR CADA 3 SEGUNDOS */

setInterval(

    comprobarInternet,

    3000

);


/* COMPROBAR AL ABRIR */

comprobarInternet();

/* =================================
   CREAR REPERTORIO COMPACTO
================================= */

function crearRepertorioExportar(){

    const categoria =

        categorias.find(

            item=>

                item.id===categoriaActual

        );


    const sectores =

        datos[categoriaActual];


    let filas = "";

    let numero = 1;


    sectores.forEach(

        (sector,indiceSector)=>{


            filas += `

                <tr class="exportar-sector">

                    <td colspan="4">

                        SECTOR

                        ${indiceSector+1}

                        —

                        ${sector.nombre}

                    </td>

                </tr>

            `;


            sector.canciones.forEach(

                cancion=>{


                    filas += `

                        <tr>

                            <td class="exportar-numero">

                                ${

                                    String(numero)

                                    .padStart(

                                        2,

                                        "0"

                                    )

                                }

                            </td>


                            <td class="exportar-tema">

                                ${cancion.nombre}

                            </td>


                            <td class="exportar-artista">

                                ${

                                    cancion.autor

                                    ||

                                    "—"

                                }

                            </td>


                            <td class="exportar-tono">

                                ${

                                    cancion.tono

                                    ||

                                    "—"

                                }

                            </td>

                        </tr>

                    `;


                    numero++;

                }

            );

        }

    );


    const contenedor =

        document.getElementById(

            "repertorioExportar"

        );


    contenedor.innerHTML = `

        <div class="exportar-encabezado">

            <h1>

                AGRUPACIÓN KRISÁLIDA

            </h1>


            <h2>

                ${categoria.nombre}

            </h2>

        </div>


        <table class="exportar-tabla">

            <thead>

                <tr>

                    <th>

                        N°

                    </th>

                    <th>

                        TEMA

                    </th>

                    <th>

                        ARTISTA

                    </th>

                    <th>

                        TONO

                    </th>

                </tr>

            </thead>


            <tbody>

                ${filas}

            </tbody>

        </table>

    `;


    return contenedor;

}


/* =================================
   DESCARGAR IMAGEN
================================= */

async function descargarImagen(){

    const repertorio =

        crearRepertorioExportar();


    const canvas =

        await html2canvas(

            repertorio,

            {

                scale:2,

                backgroundColor:

                    "#ffffff"

            }

        );


    const enlace =

        document.createElement(

            "a"

        );


    enlace.download =

        `Repertorio-${categoriaActual}.png`;


    enlace.href =

        canvas.toDataURL(

            "image/png"

        );


    enlace.click();

}


/* =================================
   DESCARGAR PDF
================================= */

async function descargarPDF(){

    const repertorio =

        crearRepertorioExportar();


    const canvas =

        await html2canvas(

            repertorio,

            {

                scale:2,

                backgroundColor:

                    "#ffffff"

            }

        );


    const imagen =

        canvas.toDataURL(

            "image/jpeg",

            .95

        );


    const {

        jsPDF

    } = window.jspdf;


    const pdf =

        new jsPDF(

            {

                orientation:

                    "portrait",

                unit:"mm",

                format:"a4"

            }

        );


    const ancho = 190;


    const alto =

        canvas.height

        *

        ancho

        /

        canvas.width;


    pdf.addImage(

        imagen,

        "JPEG",

        10,

        10,

        ancho,

        alto

    );


    pdf.save(

        `Repertorio-${categoriaActual}.pdf`

    );

}

/* =================================
   CAMBIAR ORDEN DE LAS CANCIONES
================================= */


/* SUBIR CANCIÓN */

function subirCancion(

    indiceSector,

    indiceCancion

){

    const canciones =

        datos[categoriaActual]

        [indiceSector]

        .canciones;


    /* YA ESTÁ EN PRIMER LUGAR */

    if(

        indiceCancion===0

    ){

        return;

    }


    const cancionActual =

        canciones[indiceCancion];


    canciones[indiceCancion] =

        canciones[

            indiceCancion-1

        ];


    canciones[

        indiceCancion-1

    ] = cancionActual;


    guardarDatos();

    mostrarSectores();

}


/* BAJAR CANCIÓN */

function bajarCancion(

    indiceSector,

    indiceCancion

){

    const canciones =

        datos[categoriaActual]

        [indiceSector]

        .canciones;


    /* YA ESTÁ EN ÚLTIMO LUGAR */

    if(

        indiceCancion

        ===

        canciones.length-1

    ){

        return;

    }


    const cancionActual =

        canciones[indiceCancion];


    canciones[indiceCancion] =

        canciones[

            indiceCancion+1

        ];


    canciones[

        indiceCancion+1

    ] = cancionActual;


    guardarDatos();

    mostrarSectores();

}

/* =================================
   ADMINISTRADOR E INVITADO
================================= */

let esAdministrador = false;


window.activarModoAplicacion =

function(

    administrador

){

    esAdministrador =

        administrador;


    document.getElementById(

        "pantallaLogin"

    ).classList.add(

        "oculto"

    );


    document.getElementById(

        "contenidoAplicacion"

    ).classList.remove(

        "oculto"

    );


    aplicarPermisos();

};


/* OCULTAR BOTONES DE EDICIÓN */

function aplicarPermisos(){

    document.body.classList.toggle(

        "modo-invitado",

        !esAdministrador

    );

}


/* RECORDAR MODO INVITADO */

if(

    localStorage.getItem(

        "modoKrisalida"

    )

    ===

    "invitado"

){

    activarModoAplicacion(

        false

    );

}