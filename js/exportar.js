const btnImagen = document.getElementById("btnImagen");

btnImagen.onclick = exportarImagenCompacta;

function exportarImagenCompacta(){

    const contenedor = document.getElementById("exportarImagen");

    let html = `

    <div class="exportacion">

        <h1>${tituloRepertorio.textContent}</h1>

    `;

    const grupos=[...new Set(cancionesActuales.map(c=>c.grupo||"General"))];

    grupos.forEach(grupo=>{

        html+=`

            <h2>${grupo}</h2>

            <table>

        `;

        cancionesActuales

        .filter(c=>(c.grupo||"General")==grupo)

        .forEach((c,i)=>{

            html+=`

                <tr>

                    <td class="num">

                        ${String(i+1).padStart(2,"0")}

                    </td>

                    <td>

                        ${c.nombre}

                    </td>

                    <td class="tonoExport">

                        ${c.tono}

                    </td>

                </tr>

            `;

        });

        html+=`</table>`;

    });

    html+=`</div>`;

    contenedor.innerHTML=html;

    contenedor.style.display="block";

    html2canvas(contenedor).then(canvas=>{

        const a=document.createElement("a");

        a.download=tituloRepertorio.textContent+".png";

        a.href=canvas.toDataURL();

        a.click();

        contenedor.style.display="none";

    });

}