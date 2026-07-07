//=========================================
// UI.JS
//=========================================

function renderTabla(canciones){

    const contenedor = document.getElementById("listaCanciones");

    contenedor.innerHTML = `

    <div class="tabla">

        <div class="tabla-info">

            <div>

                <h3>${tituloRepertorio.textContent}</h3>

                <span>${canciones.length} canciones</span>

            </div>

            <div class="tabla-tools">

                <input
                    type="text"
                    placeholder="Buscar próximamente..."
                    disabled
                >

            </div>

        </div>

        <table>

            <thead>

                <tr>

                    <th width="70">#</th>

                    <th>Canción</th>

                    <th width="120">Tono</th>

                    <th width="120">Acciones</th>

                </tr>

            </thead>

            <tbody>

                ${canciones.map((c,i)=>crearFila(c,i)).join("")}

            </tbody>

        </table>

    </div>

    `;

}

//=========================================

function crearFila(c, i){

    return `

    <tr
        class="fila-cancion"
        onclick="abrirEditor(${i})"
        draggable="true"
        data-index="${i}"
        ondragstart="drag(event)"
        ondragover="allowDrop(event)"
        ondrop="drop(event)">

        <td>

            <span class="numero">

                ${String(c.numero).padStart(2,"0")}

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
                onclick="event.stopPropagation(); agregarSetlist(${i})">

                +

            </button>

            <button
                class="eliminar"
                onclick="event.stopPropagation(); eliminarCancion(${i})">

                🗑️

            </button>

        </td>

    </tr>

    `;

}