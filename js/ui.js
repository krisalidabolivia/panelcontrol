//=========================================
// UI.JS
//=========================================

function renderTabla(canciones){

    const contenedor = document.getElementById("listaCanciones");

        let html = `

        <div class="tabla">

            <div class="tabla-info">

                <div class="tabla-titulo">

                    <h3>${tituloRepertorio.textContent}</h3>

                    <span>${canciones.length} canciones</span>

                </div>

                <div class="tabla-tools">

                    <input
                        id="buscarCancion"
                        type="text"
                        placeholder="🔍 Buscar canción, artista o tono">

                    <button
                        class="btnGrupo"
                        onclick="nuevoGrupo()">

                        ➕ Grupo

                    </button>

                </div>

            </div>

        `;

    // Obtener grupos únicos
    const grupos = [...new Set(canciones.map(c => c.grupo || "General"))];

    grupos.forEach(grupo=>{

        html += `

        <div class="titulo-grupo">

            ${grupo}

        </div>

        <table>

            <tbody>

                ${canciones
                    .filter(c=>(c.grupo||"General")==grupo)
                    .map((c, i) => crearFila(c, canciones.indexOf(c), i + 1))
                    .join("")}

            </tbody>

        </table>

        `;

    });

    html += `</div>`;

    contenedor.innerHTML = html;

    const buscar = document.getElementById("buscarCancion");

    buscar.addEventListener("input", function(){

        const texto = this.value.toLowerCase();

        document.querySelectorAll(".fila-cancion").forEach(fila=>{

            const contenido = fila.innerText.toLowerCase();

            fila.style.display = contenido.includes(texto)

                ? ""

                : "none";

        });

    });

}
//=========================================

function crearFila(c, indiceReal, numeroGrupo){

    return `

    <tr
        class="fila-cancion"
        onclick="abrirEditor(${indiceReal})"
        draggable="true"
        data-index="${indiceReal}"
        ondragstart="drag(event)"
        ondragover="allowDrop(event)"
        ondrop="drop(event)">

        <td>

            <span class="numero">

                ${String(numeroGrupo).padStart(2,"0")}

            </span>

        </td>

        <td>

            <strong>${c.nombre}</strong>

            <br>

            <span class="artista">

                ${c.artista}

            </span>

        </td>

        <td>

            <span class="tono">

                ${c.tono}

            </span>

        </td>

        <td class="acciones">

            <button
                class="btn-set"
                onclick="event.stopPropagation(); agregarSetlist(${indiceReal})">

                +

            </button>

            <button
                class="eliminar"
                onclick="event.stopPropagation(); eliminarCancion(${indiceReal})">

                🗑️

            </button>

        </td>

    </tr>

    `;

}