//=====================================
// CANCIONES.JS
//=====================================

let indiceEditar = -1;

const TONOS = [
    "DO",
    "DO#",
    "RE",
    "RE#",
    "MI",
    "FA",
    "FA#",
    "SOL",
    "SOL#",
    "LA",
    "LA#",
    "SI",
    "DOm",
    "DO#m",
    "REm",
    "RE#m",
    "MIm",
    "FAm",
    "FA#m",
    "SOLm",
    "SOL#m",
    "LAm",
    "LA#m",
    "SIm"
];

//=====================================
// GRUPOS
//=====================================

let grupos = [

    "General",

    "Mix 1",

    "Mix 2"

];

function siguienteNumero(){

    if(cancionesActuales.length===0)
        return 1;

    let mayor=0;

    cancionesActuales.forEach(c=>{

        if(c.numero>mayor)
            mayor=c.numero;

    });

    return mayor+1;

}

//=====================================

function abrirEditor(indice = -1){

    indiceEditar = indice;

    let c = {

        numero:siguienteNumero(),
        nombre:"",
        tono:"DO",
        artista:"",
        letra:"",
        observaciones:""

    };

    if(indice!=-1){

        c = cancionesActuales[indice];

    }

    const tonos = TONOS.map(t=>`

        <option
            value="${t}"
            ${t==c.tono?"selected":""}>

            ${t}

        </option>

    `).join("");

    const gruposHTML = grupos.map(g=>`

        <option
            value="${g}"
            ${g==(c.grupo || "General")?"selected":""}>

            ${g}

        </option>

    `).join("");

    document.body.insertAdjacentHTML("beforeend",`

<div class="modal" id="modalEditor">

<div class="modal-contenido">

<h2>

${indice==-1?"Nueva Canción":"Editar Canción"}

</h2>

<div class="campo">

<label>Número</label>

<input id="numero" type="number" value="${c.numero}">

</div>

<div class="campo">

<label>Nombre</label>

<input id="nombre" value="${c.nombre}">

</div>

<div class="campo">

<label>Tono</label>

<select id="tono">

${tonos}

</select>

</div>

<div class="campo">

<label>Artista</label>

<input id="artista" value="${c.artista}">

</div>

<div class="campo">

<label>Letra</label>

<textarea id="letra">${c.letra}</textarea>

</div>

<div class="campo">

<label>Observaciones</label>

<textarea id="observaciones">${c.observaciones}</textarea>

</div>

<div class="botones">

<button
class="cancelar"
onclick="cerrarEditor()">

Cancelar

</button>

<button
class="guardar"
onclick="guardarCancion()">

Guardar

</button>

</div>

</div>

</div>

    `);

}

//=====================================

function cerrarEditor(){

    document.getElementById("modalEditor").remove();

}

//=====================================

function guardarCancion(){

    const nueva={

        numero:Number(document.getElementById("numero").value),

        nombre:document.getElementById("nombre").value.trim(),

        tono:document.getElementById("tono").value,

        artista:document.getElementById("artista").value.trim(),

        letra:document.getElementById("letra").value,

        observaciones:document.getElementById("observaciones").value

    };

    if(isNaN(nueva.numero) || nueva.numero<=0){

        alert("Ingrese un número válido.");

        return;

    }

    const repetido = cancionesActuales.some((c,index)=>{

        return c.numero===nueva.numero && index!==indiceEditar;

    });

    if(repetido){

        alert("Ya existe una canción con ese número.");

        return;

    }

    if(nueva.nombre==""){

        alert("Ingrese el nombre");

        return;

    }

    if(indiceEditar==-1){

        cancionesActuales.push(nueva);

    }else{

        cancionesActuales[indiceEditar]=nueva;

    }

    cancionesActuales.sort((a,b)=>a.numero-b.numero);

    guardarStorage();

    renderTabla(cancionesActuales);

    cerrarEditor();

}

//=====================================

function eliminarCancion(indice){

    if(!confirm("¿Eliminar esta canción?"))
        return;

    cancionesActuales.splice(indice,1);

    guardarStorage();

    renderTabla(cancionesActuales);

}

//==============================
// DRAG & DROP
//==============================

let origen=null;

function drag(e){

    origen=Number(e.currentTarget.dataset.index);

}

function allowDrop(e){

    e.preventDefault();

}

function drop(e){

    e.preventDefault();

    const destino=Number(e.currentTarget.dataset.index);

    if(origen===destino)
        return;

    const mover=cancionesActuales.splice(origen,1)[0];

    cancionesActuales.splice(destino,0,mover);

    renumerarCanciones();

}

function renumerarCanciones(){

    cancionesActuales.forEach((c,i)=>{

        c.numero=i+1;

    });

    guardarStorage();

    renderTabla(cancionesActuales);

}

//=====================================
// SETLIST
//=====================================

let setlist=[];

function agregarSetlist(indice){

    setlist.push({

        ...cancionesActuales[indice]

    });

    renderSetlist();

}

function renderSetlist(){

    const lista=document.getElementById("listaSetlist");

    if(setlist.length===0){

        lista.innerHTML=`

            <p class="vacio">

                No hay canciones.

            </p>

        `;

        return;

    }

    lista.innerHTML=setlist.map((c,i)=>`

        <div class="itemSet">

            <div>

                <div class="numeroSet">

                    ${i+1}

                </div>

            </div>

            <div style="flex:1;padding-left:15px;">

                <strong>${c.nombre}</strong>

                <br>

                <small>${c.tono}</small>

            </div>

        </div>

    `).join("");

}

document.getElementById("btnLimpiarSet").onclick=()=>{

    setlist=[];

    renderSetlist();

}