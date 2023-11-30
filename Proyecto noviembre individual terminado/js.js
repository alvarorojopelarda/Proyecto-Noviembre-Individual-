
var sujetos = [];

var sujetos = [
    {   
        
        nombre: "David Choak",
        tipo: "descargado",
        posibleCulpabilidad: "perpetrador",
        dondeVive: "Lake View",
        fechaDescarga: "10/10/2020",
        urlImagen: "https://pbs.twimg.com/media/FaaEBxpUYAAHP9p.jpg",
        comentarios: "Líder de la banda, Cooperó la segunda empresa privada más grande del mundo. Es más que una coincidencia que David y su hermano sean parodias de los multimillonarios de la industria petrolera de la vida real, David y Charles Koch."
    }
];

// Arreglo que almacena información sobre sujetos

  // Carga datos desde el almacenamiento local al arreglo de sujetos
window.onload = function () {
    cargarDatosDesdeLocalStorage();  // Muestra los sujetos en la interfaz
    mostrarSujetos();
    // Agrega un evento al hacer clic en el nombre para abrir el formulario de edición
    document.getElementById("nombre").addEventListener("click", function (event) {
        if (event.target.classList.contains("subject")) {
            var sujeto = sujetos.find(function (s) {
                return s.nombre === event.target.querySelector("p").innerText;
            });

            if (sujeto) {
                abrirFormularioEdicion(sujeto);
            }
        }
    });
       // Agrega eventos relacionados con la edición
    document.getElementById("guardarCambios").addEventListener("click", guardarCambios);
    activarFechaDescarga();
};
// Función que carga datos desde el almacenamiento local
function cargarDatosDesdeLocalStorage() {
    var storedSujetos = localStorage.getItem("sujetos");
    if (storedSujetos) {
        try {
            sujetos = JSON.parse(storedSujetos);
        } catch (error) {
            console.error("Error al analizar los datos del localStorage:", error);
        }
    }
}
// Función que muestra u oculta el formulario de agregar nuevo sujeto
function toggleForm() {
    var form = document.getElementById("addForm");
    form.style.display = form.style.display === "block" || form.style.display === "" ? "none" : "block";
    
    var container = document.getElementById("container");
    container.style.display = form.style.display === "block" ? "none" : "grid";
}

// Función que muestra la imagen de fondo y oculta otros elementos
function mostrarImagenDeFondo() {
    var imagenFondo = document.getElementById("imagenFondo");
    var volverBtn = document.getElementById("volver");
    var addButton = document.getElementById("addButton");
    var tableContainer = document.getElementById("tableContainer");
  
    var container = document.getElementById("container");

    container.style.display = "none";
    tableContainer.style.display = "none";
    imagenFondo.style.display = "block";
    volverBtn.style.display = "block";
    document.body.style.overflow = 'hidden';
    cambiarfondo.style.display = "none";
    addButton.style.display = "none";
}



// Función que vuelve a la vista normal ocultando la imagen de fondo
function volver() {
    var imagenFondo = document.getElementById("imagenFondo");
    var volver = document.getElementById("volver");
    var addButton = document.getElementById("addButton");

    var container = document.getElementById("container");
    var addForm = document.getElementById("addForm");

   
    imagenFondo.style.display = "none";
    volver.style.display = "none";
    document.body.style.overflow = 'auto';
    cambiarfondo.style.display = "block";
    addButton.style.display = "block";
    container.style.display = "grid";
    addForm.style.display = "none";
    mostrarSujetos();
}
// Función que muestra los sujetos en la interfaz

function mostrarSujetos() {
    var container = document.getElementById("container");
    container.innerHTML = "";

    sujetos.forEach(function (sujeto) {
        var subjectDiv = document.createElement("div");
        subjectDiv.classList.add("subject", sujeto.tipo);
        subjectDiv.style.width = "500px";
        subjectDiv.style.margin = "20px";
        subjectDiv.style.textAlign = "center";

        var imagen = document.createElement("img");
        imagen.onerror = function () {
            imagen.src = 'https://cdn-icons-png.flaticon.com/512/16/16363.png';
        };
        imagen.src = sujeto.urlImagen;
        imagen.alt = "Imagen de " + sujeto.nombre;
        imagen.style.maxWidth = "100%";

        var nombreP = document.createElement("p");
        nombreP.style.color = getColorByGuilt(sujeto.posibleCulpabilidad);
        nombreP.innerText = sujeto.nombre;

        

        subjectDiv.appendChild(imagen);
        subjectDiv.appendChild(nombreP);
       

        container.appendChild(subjectDiv);

        var editarButton = document.createElement("button");
        editarButton.innerText = "Ver y Editar";
        editarButton.classList.add("editar-button");
        editarButton.addEventListener("click", function () {
            abrirFormularioEdicion(sujeto);
        });
        subjectDiv.appendChild(editarButton);

       
    });
}

// Función que activa o desactiva la entrada de fecha dependiendo del tipo seleccionado
function activarFechaDescarga() {
    const tipoSelect = document.getElementById('tipo');
    const fechaDescargaInput = document.getElementById('fechaDescarga');
    fechaDescargaInput.disabled = tipoSelect.value !== 'descargado';
    document.getElementById('tipo').addEventListener('change', activarFechaDescarga);
}
// Función que abre el formulario de edición con los datos del sujeto seleccionado
function abrirFormularioEdicion(sujeto) {
    var editForm = document.getElementById("tableContainer");
    var container = document.getElementById("addForm");
    var editarform = document.getElementById("editForm");
    var contenedor = document.getElementById("container");
    var addButton = document.getElementById("addButton");

    
  
   cargarDatosSeleccionados(sujeto);
    addButton.style.display = "none";
    editForm.style.display = "block";
    container.style.display = "none";
    editarform.style.display = "block";
    contenedor.style.display = "none";
}
// Función que carga los datos del sujeto seleccionado en el formulario de edición
function cargarDatosSeleccionados(sujeto) {

    document.getElementById("nombreE").value = sujeto.nombre;
    document.getElementById("tipoE").value = sujeto.tipo;
    document.getElementById("dondeViveE").value = sujeto.dondeVive;
    document.getElementById("fechaDescargaE").value = sujeto.fechaDescarga;
    document.getElementById("posibleCulpabilidadE").value = sujeto.posibleCulpabilidad;
    document.getElementById("urlImagenE").value = sujeto.urlImagen;
    document.getElementById("comentariosE").value = sujeto.comentarios;


}
// Función que guarda los cambios realizados en el formulario de edición
function guardarEditados() {
    var nombre = document.getElementById("nombreE").value;

    if (nombre !== "") {

        var sujeto = sujetos.find(function (s) {
            return s.nombre === nombre;
        });

        if (sujeto) {
            
            sujeto.nombre = document.getElementById("nombreE").value;
            sujeto.tipo = document.getElementById("tipoE").value;
            sujeto.dondeVive = document.getElementById("dondeViveE").value;
            sujeto.fechaDescarga = document.getElementById("fechaDescargaE").value;
            sujeto.posibleCulpabilidad = document.getElementById("posibleCulpabilidadE").value;
            sujeto.urlImagen = document.getElementById("urlImagenE").value;
            sujeto.comentarios = document.getElementById("comentariosE").value;

           
            localStorage.setItem("sujetos", JSON.stringify(sujetos));

 
            mostrarSujetos();
            var addButton = document.getElementById("addButton");
            var editForm = document.getElementById("editForm");
            var container = document.getElementById("container");
            editForm.style.display = "none";
            container.style.display = "grid";
            addButton.style.display = "block";
           
            limpiarFormularioEdicion();
        }
    }
}
// Función que limpia el formulario de edición
function limpiarFormularioEdicion() {

    document.getElementById("nombre").value = "";
    document.getElementById("tipo").value = "descargado";
    document.getElementById("dondeVive").value = "";
    document.getElementById("fechaDescarga").value = "";
    document.getElementById("posibleCulpabilidad").value = "candidato";
    document.getElementById("urlImagen").value = "";
    document.getElementById("comentarios").value = "";
}
// Función que devuelve un color según la culpabilidad del sujeto
function getColorByGuilt(culpabilidad) {
    if (culpabilidad === "perpetrador") {
        return "red";
    } else if (culpabilidad === "colaborador") {
        return "orange";
    } else {
        return "green";
    }
}




// Función que guarda un nuevo sujeto en el arreglo y en el almacenamiento local
function guardarSujeto() {
    var nombre = document.getElementById("nombre").value;
    var tipo = document.getElementById("tipo").value;
    var dondeVive = document.getElementById("dondeVive").value;
    var fechaDescarga = document.getElementById("fechaDescarga").value;
    var posibleCulpabilidad = document.getElementById("posibleCulpabilidad").value;
    var urlImagen = document.getElementById("urlImagen").value;
    var comentarios = document.getElementById("comentarios").value;

    if (nombre === "" || tipo === "" || dondeVive === "" || (tipo === "descargado" && fechaDescarga === "") || posibleCulpabilidad === "") {
        alert("Por favor, complete todos los campos obligatorios.");
    } else {
        var nuevoSujeto = {
            nombre: nombre,
            tipo: tipo,
            dondeVive: dondeVive,
            fechaDescarga: fechaDescarga,
            posibleCulpabilidad: posibleCulpabilidad,
            urlImagen: urlImagen,
            comentarios: comentarios
        };

        sujetos.push(nuevoSujeto);

        localStorage.setItem('sujetos', JSON.stringify(sujetos));

        mostrarSujetos();

       
        document.getElementById("nombre").value = "";
        document.getElementById("tipo").value = "descargado";
        document.getElementById("dondeVive").value = "";
        document.getElementById("fechaDescarga").value = "";
        document.getElementById("posibleCulpabilidad").value = "candidato";
        document.getElementById("urlImagen").value = "";
        document.getElementById("comentarios").value = "";

        toggleForm();
    }
}