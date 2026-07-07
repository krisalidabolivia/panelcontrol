const btnImagen = document.getElementById("btnImagen");

btnImagen.addEventListener("click", descargarImagen);

function descargarImagen(){

    const tabla = document.querySelector(".tabla");

    html2canvas(tabla,{
        scale:2,
        backgroundColor:"#0B1220"
    }).then(canvas=>{

        const enlace=document.createElement("a");

        enlace.download=`${categoriaActual}.png`;

        enlace.href=canvas.toDataURL("image/png");

        enlace.click();

    });

}