const URL = "http://localhost:8080/PaquetitosRest/webapi/clientes";
const myModal = new bootstrap.Modal(document.getElementById("idModal")); // Para los mensajes de error y avisos
const modalWait = new bootstrap.Modal(document.getElementById("idModalWait")); // Para los mensajes de error y avisos

window.onload = init;

function init() {
  const peticionHTTP = fetch(URL);

  peticionHTTP
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("Return not ok");
    })
    .then((clientes) => {
      let tblBody = document.getElementById("id_tblClientes");
      for (const cliente of clientes) {
        let fila = document.createElement("tr");
        let elemento = document.createElement("td");
        elemento.innerHTML = cliente.idCliente;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = cliente.nombreCliente;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = cliente.direccionCliente;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = cliente.CIF;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = cliente.telefono;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = cliente.email;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML =
          `<button class="btn btn-link" onclick="editarCliente(${cliente.idCliente})"><i class="bi-pencil"></i></button>` +
          `<button style="color:red;" class="btn btn-link"  onclick="borrarCliente(${cliente.idCliente})"><i class="bi-x-circle"></i></button>`;
        fila.appendChild(elemento);

        tblBody.appendChild(fila);
      }

      // Todo ha ido bien hast aquí, habilito el boton de añadir cliente

      document.getElementById("idAddCliente").addEventListener("click", addCliente);
    })
    .catch((error) => {
      muestraMsg("¡Error!", "¡No he podido recuperar el listado de clientes!<br>" + error, false, "error");
    });
}

function editarCliente(idCliente) {
  window.location.href = `editarCliente.html?idCliente=${idCliente}`;
}

function addCliente() {
  window.location.href = "editarCliente.html";
}

function borrarCliente(idCliente) {
  muestraMsg(
    "¡Atención!",
    `¿Estas seguró de querer borrar el cliente ${idCliente}?`,
    true,
    "question",
    "Si",
    "No"
  );
  document.getElementById("idMdlOK").addEventListener("click", () => {
    
    borrarClienteAPI(idCliente);
  });
}

function borrarClienteAPI(idCliente) {
  myModal.hide();
  modalWait.show();
  opciones = {
    method: "DELETE", // Modificamos la BBDD
  };

  fetch(URL + "/" + idCliente, opciones)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else 
      {
        throw new Error(`Fallo al borrar, el servidor responde con ${respuesta.status}-${respuesta.statusText}`);
      }
        
    })
    .then((respuesta) => {
      modalWait.hide();
      muestraMsg(`Cliente ${idCliente} Borrado!`, "Cliente borrado con éxito", false, "success");
      document.getElementById('idMdlClose').addEventListener("click", () => {
        location.reload();
        document.getElementById('idMdlClose').removeEventListener("click");
      })
      
    })
    .catch((error) => {
      modalWait.hide();
      muestraMsg(
        "Cliente NO borrado",
        "¿Es posible que este cliente tenga algún pedido? 🤔<br>" + error,
        false,
        "error"
      );
    });
}

/**
 * Muestra un mensaje en el modal
 */
function muestraMsg(titulo, mensaje, okButton, tipoMsg, okMsg = "OK", closeMsg = "Close") {
  document.getElementById("idMdlOK").innerHTML = okMsg;
  document.getElementById("idMdlClose").innerHTML = closeMsg;

  myModal.hide();
  switch (tipoMsg) {
    case "error":
      {
        titulo = "<i style='color:red ' class='bi bi-exclamation-octagon-fill'></i> " + titulo;
      }
      break;
    case "question":
      {
        titulo = "<i style='color:blue' class='bi bi-question-circle-fill'></i> " + titulo;
      }
      break;
    default:
      {
        titulo = "<i style='color:green' class='bi bi-check-circle-fill'></i> " + titulo;
      }
      break;
  }
  document.getElementById("idMdlTitle").innerHTML = titulo;
  document.getElementById("idMdlMsg").innerHTML = mensaje;
  document.getElementById("idMdlOK").style.display = okButton ? "block" : "none";

  myModal.show();
}
