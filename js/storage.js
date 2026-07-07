//=====================================
// STORAGE.JS
//=====================================

function obtenerClave(){

    return "KRISALIDA_" + categoriaActual;

}

//=====================================

function guardarStorage(){

    localStorage.setItem(

        "KRISALIDA_" + categoriaActual,

        JSON.stringify(cancionesActuales)

    );

}

//=====================================

function cargarStorage(categoria){

    const datos = localStorage.getItem("KRISALIDA_" + categoria);

    if(datos){

        return JSON.parse(datos);

    }

    return null;

}

//=====================================

function limpiarStorage(){

    localStorage.removeItem(

        obtenerClave()

    );

}