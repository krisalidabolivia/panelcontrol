//=====================================
// GRUPOS
//=====================================

let grupos = ["General"];

function cargarGrupos(){

    const guardados = localStorage.getItem("grupos");

    if(guardados){

        grupos = JSON.parse(guardados);

    }

    actualizarSelect();

}

function guardarGrupos(){

    localStorage.setItem("grupos",JSON.stringify(grupos));

}

function actualizarSelect(){

    const select=document.getElementById("grupoAdmin");

    select.innerHTML="";

    grupos.forEach(g=>{

        select.innerHTML+=`

            <option value="${g}">

                ${g}

            </option>

        `;

    });

}

document
.getElementById("btnNuevoGrupo")
.onclick=()=>{

    const nombre=prompt("Nombre del grupo");

    if(!nombre)
        return;

    if(grupos.includes(nombre)){

        alert("Ya existe.");

        return;

    }

    grupos.push(nombre);

    guardarGrupos();

    actualizarSelect();

};

document
.getElementById("btnRenombrarGrupo")
.onclick=()=>{

    const actual=document.getElementById("grupoAdmin").value;

    const nuevo=prompt("Nuevo nombre",actual);

    if(!nuevo)
        return;

    grupos=grupos.map(g=>g==actual?nuevo:g);

    cancionesActuales.forEach(c=>{

        if(c.grupo==actual)

            c.grupo=nuevo;

    });

    guardarStorage();

    guardarGrupos();

    actualizarSelect();

    renderTabla(cancionesActuales);

};

document
.getElementById("btnEliminarGrupo")
.onclick=()=>{

    const grupo=document.getElementById("grupoAdmin").value;

    if(grupo=="General"){

        alert("No puedes eliminar General.");

        return;

    }

    if(!confirm("Eliminar grupo?"))
        return;

    cancionesActuales.forEach(c=>{

        if(c.grupo==grupo)

            c.grupo="General";

    });

    grupos=grupos.filter(g=>g!=grupo);

    guardarStorage();

    guardarGrupos();

    actualizarSelect();

    renderTabla(cancionesActuales);

};