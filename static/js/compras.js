const modalcarritoform = document.querySelector("#modalcarritoform");
let btncarritoA = document.querySelectorAll("#btncarritoA");
const btn_salirformcarrito = document.querySelector("#btn_salirformcarrito");
const idproducto1 = document.querySelector("#idproducto1");
const cproducto = document.querySelector("#cproducto");
const cdescripcion = document.querySelector("#cdescripcion");
const cprecio = document.querySelector("#cprecio");
const ccantidad = document.querySelector("#ccantidad");
const csub = document.querySelector("#csub");
const imgcar = document.querySelector("#imgcar");
const nombreimg = document.querySelector("#nombreimg");
const status33 = document.querySelector("#status");
const btnCambiarCarrito = document.querySelector("#btnCambiarCarrito");
const btnAgregarCarrito = document.querySelector("#btnAgregarCarrito");
const btnAceptarCompra = document.querySelector("#btnAceptarCompra");
const desea = document.querySelector("#desea");

// function validar(entrada) {
//   if(entrada.value.lenght == 0){
//     alert("No logueado")
//   }
// }

for (btn of btncarritoA) {
  btn.addEventListener("click", function (e) {
    if (status33.value == " ") {
      window.location.replace("/loguearse");
    } else {
      btnAgregarCarrito.style.display = "block";
      btnCambiarCarrito.style.display = "none";
      valor = this.value;
      Obtnerproducto(valor);
      modalcarritoform.showModal();
    }
  });
}

btn_salirformcarrito.addEventListener("click", () => {
  modalcarritoform.close();
  LimpiarFormCarrito();
});

function Obtnerproducto(id) {
  axios
    .get("http://127.0.0.1:8000/api/Buscarporidproducto/<id>", {
      params: {
        id: id,
      },
    })
    .then(function (response) {
      Object.entries(response.data).forEach(([key, value]) => {
        idproducto1.value = value["id"];
        cproducto.value = value["producto"];
        cdescripcion.value = value["descripcion"];
        cprecio.value = value["precio"];
        imgcar.src = "static/imgp/" + value["imagen"];
        nombreimg.value = value["imagen"];
      });
    });
}

ccantidad.addEventListener("change", function () {
  let sub = ccantidad.value * cprecio.value;
  csub.value = sub;
});

let dataCarrito = localStorage.getItem("dataCarrito"); //Obtener datos de localStorage
let operacion = "A"; //"A"=agregar; "E"=edtidar
dataCarrito = JSON.parse(dataCarrito); // Covertir a objeto
if (dataCarrito === null)
  // Si no existe, creamos un array vacio.
  dataCarrito = [];

function AgregarCarrito() {
  // Seleccionamos los datos de los inputs de formulario
  let datos_cliente = JSON.stringify({
    id: idproducto1.value,
    producto: cproducto.value,
    descripcion: cdescripcion.value,
    precio: cprecio.value,
    cantidad: ccantidad.value,
    subtotal: csub.value,
    img: nombreimg.value,
  });

  dataCarrito.push(datos_cliente); // Guardar datos en el array definido globalmente
  localStorage.setItem("dataCarrito", JSON.stringify(dataCarrito));
  ListarProductos();
  ValidarCompra();
  return 1;
}

function ListarProductos() {
  $("#listadoCarrito").html(
    "<thead>" +
      "<tr>" +
      "<th>#</th>" +
      "<th> Producto </th>" +
      "<th> Descripcion </th>" +
      "<th> Precio </th>" +
      "<th> Cantidad </th>" +
      "<th> Subtotal </th>" +
      "<th>Accion </th>" +
      "</tr>" +
      "</thead>" +
      "<tbody>" +
      "</tbody>"
  );

  for (let i in dataCarrito) {
    let d = JSON.parse(dataCarrito[i]);

    $("#listadoCarrito").append(
      "<tr>" +
        "<td style='display:none;'> <input type='hidden' id ='txtsubtotal'   value ='" +
        d.subtotal +
        "'> </td> " +
        "<td style = 'display:none;'>" +
        d.img +
        "</td>" +
        "<td>" +
        i +
        "</td>" +
        "<td>" +
        d.producto +
        "</td>" +
        "<td>" +
        d.descripcion +
        "</td>" +
        "<td>" +
        d.precio +
        "</td>" +
        "<td>" +
        d.cantidad +
        "</td>" +
        "<td>" +
        d.subtotal +
        "</td>" +
        "<td> <button type= 'button' id='" +
        i +
        "'class='btnEliminar2'  value='" +
        i +
        "' ><i class='bx bx-x bx-tada' ></i></button> </td>" +
        "</tr> "
    );
  }
  Eliminar();
}

btnAgregarCarrito.addEventListener("click", () => {
  const agregador = AgregarCarrito();
  if (agregador === 1) {
    modalcarritoform.close();
    mensaje();
  }
});

function Eliminar() {
  let btns_eliminar = document.querySelectorAll(".btnEliminar2");

  for (btn of btns_eliminar) {
    btn.addEventListener("click", function () {
      EliminarPos(this.value); // Eliminamos el elemento llamando la funcion de eliminar
      ListarProductos();
      ValidarCompra();
      mostrartotal();
    });
  }
}

function EliminarPos(e) {
  dataCarrito.splice(e, 1); // Args (posición en el array, numero de items a eliminar)
  localStorage.setItem("dataCarrito", JSON.stringify(dataCarrito));
}

btnCambiarCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  let id = idproducto1.value;
  // Llemanos el formulario con los datos actuales de la vaca a editar
  dataCarrito[id] = JSON.stringify({
    id: idproducto1.value,
    producto: cproducto.value,
    descripcion: cdescripcion.value,
    precio: cprecio.value,
    cantidad: ccantidad.value,
    subtotal: csub.value,
    img: nombreimg.value,
  });
  localStorage.setItem("dataCarrito", JSON.stringify(dataCarrito));
  modalcarritoform.close();
  ListarProductos();
  mostrartotal();
});

// CREANDO LA FACTURA O NOTA DE DEBITO

let Carrito = document.querySelector("#Carrito");
const modalcompra = document.querySelector("#modalcompra");

if (Carrito) {
  Carrito.addEventListener("click", function () {
    modalcompra.showModal();
    ListarProductos();
    mostrartotal();
    cargar();
  });
}

function mensaje() {
  Swal.fire({
    title: "Excelente!!",
    text: "Producto agregador a carrito",
    imageUrl:
      "https://i.seadn.io/gae/yRIG3NidIdQKI_Ur8aKStigc20XykBfQiBy3NDSwJnUg3YSGuTtsW6qCTl6XrGqbxLERTYc7WMZY-Tfsc2IKdL2oIeJeYzjl4-mSrA?auto=format&dpr=1&w=1400&fr=1",
    imageWidth: 380,
    imageHeight: 310,
    imageAlt: "Custom image",
  });
}

function mostrartotal() {
  let uno = document.querySelectorAll("#txtsubtotal");
  let total = 0;

  uno.forEach((item) => {
    if (isNaN(parseFloat(item.value))) {
      total += 0;
    } else {
      total += parseFloat(item.value);
    }
  });

  document.getElementById("total").value = total;
}

const cerrar = document.querySelector("#btn_salircarrito");
if (cerrar) {
  cerrar.addEventListener("click", () => {
    modalcompra.close();
    LimpiarFormCarrito();
  });
}

// function Actualizar(){
$("#listadoCarrito").on("click", "tr td", function (evt) {
  let idprod, img, producto, descripcion, precio, cantidad, subtotal;

  target = $(event.target);
  idprod = target.parent("tr").find("td").eq(2).html();
  img = target.parent("tr").find("td").eq(1).html();
  producto = target.parent("tr").find("td").eq(3).html();
  descripcion = target.parent("tr").find("td").eq(4).html();
  precio = target.parent("tr").find("td").eq(5).html();
  cantidad = target.parent("tr").find("td").eq(6).html();
  subtotal = target.parent("tr").find("td").eq(7).html();

  let valorestable = {
    idprod,
    img,
    producto,
    descripcion,
    precio,
    cantidad,
    subtotal,
  };

  EnviarValores(valorestable);
});
// }

function EnviarValores(valorestable) {
  modalcarritoform.showModal();
  let data = valorestable;
  imgcar.src = "static/imgp/" + data.img;
  idproducto1.value = data.idprod;
  cproducto.value = data.producto;
  cdescripcion.value = data.descripcion;
  cprecio.value = data.precio;
  ccantidad.value = Number(data.cantidad);
  csub.value = data.subtotal;
  nombreimg.value = data.img;
  btnAgregarCarrito.style.display = "none";
  btnCambiarCarrito.style.display = "block";
  // btnAgregarCliente.style.display = "none";
  // btnEliminarCliente.style.display = "block";
  // btnModificarCliente.style.display = "block";
}

function LimpiarFormCarrito() {
  idproducto1.value = "";
  cproducto.value = "";
  cdescripcion.value = "";
  cprecio.value = "";
  ccantidad.value = 0;
  csub.value = "";
}

ValidarCompra();

function ValidarCompra() {
  if (dataCarrito.length === 0) {
    btnAceptarCompra.toggleAttribute("disabled", true);
  } else {
    btnAceptarCompra.toggleAttribute("disabled", false);
  }
}
const nit = document.querySelector("#nit");
if (desea) {
  desea.addEventListener("change", function (e) {
    e.preventDefault();
    if (desea.value === "si") {
      document.querySelector("#camponit").classList.remove("ocultar");
    } else {
      document.querySelector("#camponit").classList.add("ocultar");
      nit.value = "c/f";
    }
  });
}

const formcompra = document.querySelector("#formcompra");
let comodin = true;

const nopedido = document.querySelector("#nopedido");

function cargar() {
  no();
  traerhoraf();
  Obtenerid();
}

function no() {
  axios
    .get("http://127.0.0.1:8000/api/obtenerNodocumento")
    .then((response) => {
      nopedido.value = response.data.no + 1;
    })
    .catch((e) => {
      console.log(e);
    });
}

const txtcorreo = document.querySelector("#txtcorreo");
const idc = document.querySelector("#idc");
function Obtenerid() {
  axios
    .get("http://127.0.0.1:8000/api/obteneridCliente/<correo>", {
      params: {
        correo: txtcorreo.value,
      },
    })
    .then((response) => {
      idc.value = response.data.id;
    })
    .catch((e) => {
      console.log(e);
    });
}

let traerhoraf = function () {
  let hoy = new Date();
  let fecha =
    hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
  let hora = hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();

  return (fechaYHora = fecha + " " + hora);
};

// SERIE POR DEFECTO ES "A"
//ESTADO PEDIDO = VALIDADO AL INSERTAR
//si tipo pago = 2(contado), tipodocuento = 1

function AlertaAceptarCompra() {
  Swal.fire({
    target: document.querySelector("#modalcompra"),
    title: "¿Desea aceptar el pedido?",
    text: "Se validara la compra primero que todo.",
    icon: "info",
    background: "#ffffff",
    showCancelButton: true,
    confirmButtonColor: "#0072ff",
    cancelButtonColor: "#D2122E",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí, deseo comprar",
  }).then((result) => {
    if (result.value) {
      const nt = nit.value;
      const idCliente = idc.value;
      const nodocumento = nopedido.value;
      const serie = "A";
      const nombreDocumento = tipodocumento.value;
      const fechahora = traerhoraf();
      const estadopedido = "validado";
      const tipodocuento = tipopago.value;
      const pago = tipopago.value;
      generarFactura();

      crearPedido(
        nodocumento,
        serie,
        nombreDocumento,
        fechahora,
        estadopedido,
        idCliente,
        tipodocuento,
        pago
      );
      modalcompra.close();
    }
  });
}

btnAceptarCompra.addEventListener("click", () => {
  //AQUI VA OTRA ALERTA
  AlertaAceptarCompra();

  localStorage.clear();
});

function crearPedido(
  nodocumento,
  serie,
  nombreDocumento,
  fechapedido,
  estado,
  idcliente,
  tipodocumento,
  tipopago
) {
  axios
    .post("http://127.0.0.1:8000/api/crearPedido", {
      id: 0,
      nodocumento: nodocumento.toString(),
      serie: serie,
      nombredocumento: nombreDocumento,
      fechapedido: fechapedido,
      estado: estado,
      idcliente: idcliente,
      tipodocumeto: tipodocumento,
      tipopago: tipopago,
    })
    .then(function (response) {
      if (response.status === 201) {
        axios
          .get("http://127.0.0.1:8000/api/seleccionaridpedido/<fecha>", {
            params: {
              fecha: fechapedido,
            },
          })
          .then((response) => {
            CrearDetallePedido(response.data.id);
            //AQUI VA LA ALERTA
          })
          .catch((e) => {
            console.log(e);
          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function CrearDetallePedido(id) {
  for (let i in dataCarrito) {
    let enviar = JSON.parse(dataCarrito[i]);
    axios
      .post("http://127.0.0.1:8000/api/CrearPedidoDetalle", {
        idpedido: Number(id),
        idproducto: Number(enviar.id),
        cantidad: Number(enviar.cantidad),
        preciounitario: Number(enviar.precio),
      })
      .then(function (response) {})
      .catch(function (error) {
        console.log(error);
      });
  }
}

 
const maintable = document.querySelector("#impreso");
function generarFactura() {
  btnAceptarCompra.style.display = "none";
  html2PDF(maintable, {
    jsPDF: {
      format: "a4",
    },
    imageType: "image/jpeg",
    output: "./pdf/generate.pdf",
  });
}
