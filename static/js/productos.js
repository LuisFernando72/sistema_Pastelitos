const modalProducto = document.querySelector("#modalProductos");
const AbrirModalProductos = document.querySelector("#AbrirModalProductos");
const btn_cancelarProducto = document.querySelector("#btn_cancelarProducto");

const idProducto = document.querySelector("#idProducto");
const txtproducto = document.querySelector("#txtproducto");
const txtcantidad = document.querySelector("#txtcantidad");
const txtcategoria = document.querySelector("#txtcategoria");
const txtimagen = document.querySelector("#txtimagen");
const txtprecioCosto = document.querySelector("#txtprecioCosto");
const txtrebaja = document.querySelector("#txtrebaja");
const txtsabor = document.querySelector("#txtsabor");
const txtrelleno = document.querySelector("#txtrelleno");

let icon_error2 = document.querySelectorAll("#icoError2");

const error_txtproducto = document.querySelector("#txtproducto-error");
const error_txtcantidad = document.querySelector("#txtcantidad-error");
const error_txtcategoria = document.querySelector("#txtcategoria-error");
const error_txtimagen = document.querySelector("#txtimagen-error");
const error_txtprecioCosto = document.querySelector("#txtprecioCosto-error");
const error_txtrebaja = document.querySelector("#txtrebaja-error");
const error_txtsabor = document.querySelector("#txtsabor-error");
const error_txtrelleno = document.querySelector("#txtrelleno-error");
const sabor = document.querySelector("#sabor");
const relleno = document.querySelector("#relleno");

// BOTONES
const btnAgregarProducto = document.querySelector("#btnAgregarProducto");
const btnEliminarProducto = document.querySelector("#btnEliminarProducto");
const btnModificarProducto = document.querySelector("#btnModificarProducto");
const categoria = document.querySelector("#categoria");

let erroresFormProducto = {
  txtproducto: true,
  txtcantidad: true,
  txtcategoria: true,
  txtimagen: true,
  txtprecioCosto: true,
  txtrebaja: true,
  txtsabor: true,
  txtrelleno: true,
};

const validatefieldWhite2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    error.innerHTML = "*Por favor llenar el campo";
    erroresFormProducto[field_id] = true;
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#FFAB1B";
    error.innerText = "";
    erroresFormProducto[field_id] = false;
  }

  CotrollerProducto();
};

const validatefield2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp(
    "^([A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+(?:[-' ][A-ZÀ-ÅÇ-ÖÙ-Ý][a-zà-åç-öù-ÿ]+)*)$"
  );

  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormProducto[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormProducto[field_id] = true;
    error.innerHTML = "*Inicial Mayúscula, solo se permiten letras";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#FFAB1B";
    erroresFormProducto[field_id] = false;
    error.innerText = "";
  }
  CotrollerProducto();
};

txtproducto.addEventListener("input", (e) =>
  validatefield2(0, error_txtproducto, e)
);

txtproducto.addEventListener("blur", (e) =>
  validatefieldWhite2(0, error_txtproducto, e)
);

txtcategoria.addEventListener("click", (e) =>
  validateSelect2(1, error_txtcategoria, e)
);

txtcategoria.addEventListener("change", (e) =>
  validateSelect2(1, error_txtcategoria, e)
);

txtcantidad.addEventListener("input", (e) =>
  validatefieldWhite2(2, error_txtcantidad, e)
);
const validateSelect2 = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;

  if (fieldValue == -1) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormProducto[field_id] = true;
    error.innerHTML = "*Por favor seleccionar categoria";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#FFAB1B";
    erroresFormProducto[field_id] = false;
    error.innerText = "";
  }
  CotrollerProducto();
};

txtimagen.addEventListener("change", (e) =>
  previsualizar(3, error_txtimagen, e)
);

const previsualizar = (contador, error, e) => {
  const field = e.target;
  const field_id = e.target.id;
  var archivoRuta = e.target.value.toLowerCase();
  var extPermitidas = /(.png|.jpg)$/i;

  if (!extPermitidas.exec(archivoRuta)) {
    field.value = "";
    // return false;
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormProducto[field_id] = true;
    error.innerHTML = "*Solo estan permitidas imagenes .png .jpg";
  } else {
    // VISTA DEL LA IMAGEN
    icon_error2[contador].classList.remove("invalid-background-ico");
    field.style.borderColor = "#FFAB1B";
    erroresFormProducto[field_id] = false;
    error.innerText = "";
    // if (archivoInput.files && archivoInput.files[0]) {

    // }
  }
  CotrollerProducto();
};
const validatefieldNumberFloat = (contador, error, e) => {
  const field = e.target;
  const fieldValue = e.target.value;
  const field_id = e.target.id;
  const regex = new RegExp("[0-9]+([.|,][0-9]+)?");

  if (fieldValue.trim().length === 0) {
    icon_error2[contador].classList.add("invalid-background-ico");
    field.style.borderColor = "#ff004c";
    erroresFormProducto[field_id] = true;
    error.innerHTML = "*Por favor llenar el campo";
  } else if (!regex.test(fieldValue)) {
    icon_error2[contador].classList.add("invalid-background-ico");

    erroresFormProducto[field_id] = true;
    field.style.borderColor = "#ff004c";
    error.innerHTML = "Números enteros y decimales";
  } else {
    icon_error2[contador].classList.remove("invalid-background-ico");

    erroresFormProducto[field_id] = false;
    field.style.borderColor = "#FFAB1B";
    error.innerText = "";
  }
  CotrollerProducto();
};
txtprecioCosto.addEventListener("blur", (e) =>
  validatefieldNumberFloat(4, error_txtprecioCosto, e)
);
txtprecioCosto.addEventListener("input", (e) =>
  validatefieldNumberFloat(4, error_txtprecioCosto, e)
);
txtrebaja.addEventListener("click", (e) =>
  validateSelect2(5, error_txtrebaja, e)
);

txtrebaja.addEventListener("change", (e) =>
  validateSelect2(5, error_txtrebaja, e)
);
txtsabor.addEventListener("click", (e) =>
  validateSelect2(6, error_txtsabor, e)
);

txtsabor.addEventListener("change", (e) =>
  validateSelect2(6, error_txtsabor, e)
);

txtrelleno.addEventListener("click", (e) =>
  validateSelect2(7, error_txtrelleno, e)
);

txtrelleno.addEventListener("change", (e) =>
  validateSelect2(7, error_txtrelleno, e)
);

SelectDynamic(
  txtrebaja,
  "http://127.0.0.1:8000/api/verRebajas",
  "id",
  "descripcion",
  "porcentaje"
);

SelectDynamic2(
  txtcategoria,
  "http://127.0.0.1:8000/api/verCategorias",
  "id",
  "nombreCategoria"
);



SelectDynamic2(
  txtsabor,
  "http://127.0.0.1:8000/api/verSabores",
  "id",
  "nombre_sabor"
);

SelectDynamic2(
  txtrelleno,
  "http://127.0.0.1:8000/api/verRellenos",
  "id",
  "nombre_relleno"
);

function SelectDynamic(input, url, id, valor, valor2) {
  axios.get(url, {}).then(function (response) {
    Object.entries(response.data).forEach(([key, value]) => {
      input.innerHTML +=
        "<option value='" +
        value[id] +
        "'>" +
        value[valor] +
        ", " +
        value[valor2] +
        "</option>";
    });
  });
}

function SelectDynamic2(input, url, id, valor) {
  axios.get(url, {}).then(function (response) {
    Object.entries(response.data).forEach(([key, value]) => {
      input.innerHTML +=
        "<option value='" + value[id] + "'>" + value[valor] + "</option>";
    });
  });
}

txtsabor.addEventListener("change", function () {
  var selectedOption = this.options[txtsabor.selectedIndex];
  sabor.value = selectedOption.text;
});
txtrelleno.addEventListener("change", function () {
  var selectedOption = this.options[txtrelleno.selectedIndex];
  relleno.value = selectedOption.text;
});

txtcategoria.addEventListener("change", function () {
  var selectedOption = this.options[txtcategoria.selectedIndex];
  categoria.value = selectedOption.text;
});

CotrollerProducto = () => {
  if (
    erroresFormProducto.txtproducto ||
    erroresFormProducto.txtcategoria ||
    erroresFormProducto.txtcantidad ||
    erroresFormProducto.txtimagen ||
    erroresFormProducto.txtprecioCosto ||
    erroresFormProducto.txtrebaja ||
    erroresFormProducto.txtsabor ||
    erroresFormProducto.txtrelleno
  ) {
    btnAgregarProducto.toggleAttribute("disabled", true);
  } else {
    btnAgregarProducto.toggleAttribute("disabled", false);
  }
};

AbrirModalProductos.addEventListener("click", (e) => {
  e.preventDefault();
  modalProducto.showModal();
  btnAgregarProducto.style.display = "block";
  btnModificarProducto.style.display = "none";
  btnEliminarProducto.style.display = "none";
});

$("#tblproductos").on("click", "tr td", function (evt) {
  let idproducto,
    nombreProducto,
    idCategoria,
    cantidad,
    imagen,
    precioCosto,
    idrebaja,
    idsabor,
    idrelleno;

  target = $(event.target);
  idproducto = target.parent("tr").find("td").eq(0).html();
  idCategoria = target.parent("tr").find("td").eq(1).html();
  nombreProducto = target.parent("tr").find("td").eq(4).html();
  cantidad = target.parent("tr").find("td").eq(12).html();
  imagen = target.parent("tr").find("td").eq(7).html();
  precioCosto = target.parent("tr").find("td").eq(8).html();
  idrebaja = target.parent("tr").find("td").eq(2).html();
  idsabor = target.parent("tr").find("td").eq(14).html();
  idrelleno = target.parent("tr").find("td").eq(15).html();

  let valorestable = {
    idproducto,
    nombreProducto,
    idCategoria,
    cantidad,
    imagen,
    precioCosto,
    idrebaja,
    idsabor,
    idrelleno,
  };

  AbrirModalmodp(valorestable);
});

function AbrirModalmodp(valorestable) {
  modalProducto.showModal();
  let data = valorestable;
  idProducto.value = data.idproducto;
  txtproducto.value = data.nombreProducto;
  txtcategoria.value = data.idCategoria;
  txtcantidad.value = data.cantidad;
  // txtimagen.setvalue(data.imagen);
  txtprecioCosto.value = data.precioCosto;
  txtrebaja.value = data.idrebaja;
  txtsabor.value = data.idsabor;
  txtrelleno.value = data.idrelleno;
  document.querySelector("#imagendef").value = data.imagen;

  btnAgregarProducto.style.display = "none";
  btnEliminarProducto.style.display = "block";
  btnModificarProducto.style.display = "block";
}

btn_cancelarProducto.addEventListener("click", (e) => {
  e.preventDefault();

  Swal.fire({
    target: document.querySelector("#modalProductos"),
    title: "¿Desea cancelar el registro?",
    text: "Se perderán los datos, si es que ya llenó algunos.",
    icon: "info",
    background: "#ffffff",
    showCancelButton: true,
    confirmButtonColor: "#0072ff",
    cancelButtonColor: "#D2122E",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Sí, deseo salir",
  }).then((result) => {
    if (result.value) {
      modalProducto.close();
      LimpiarColor2();
      LimpiarInputs2();
      ColorIcon2();
    }
  });
});

function LimpiarInputs2() {
  idProducto.value = "";
  txtproducto.value = "";
  txtcategoria.value = -1;
  txtcantidad.value = 0;
  txtprecioCosto.value = 0;
  txtrebaja.value = -1;
  txtsabor.value = -1;
  txtrelleno.value = -1;

  error_txtproducto.innerHTML = "";
  error_txtcantidad.innerHTML = "";
  error_txtcategoria.innerHTML = "";
  error_txtimagen.innerHTML = "";
  error_txtprecioCosto.innerHTML = "";
  error_txtrebaja.innerHTML = "";
  error_txtsabor.innerHTML = "";
  error_txtrelleno.innerHTML = "";
}

function LimpiarColor2() {
  idProducto.style.borderColor = "#b8b8b8";
  txtproducto.style.borderColor = "#b8b8b8";
  txtcategoria.style.borderColor = "#b8b8b8";
  txtcantidad.style.borderColor = "#b8b8b8";
  txtprecioCosto.style.borderColor = "#b8b8b8";
  txtrebaja.style.borderColor = "#b8b8b8";
  txtsabor.style.borderColor = "#b8b8b8";
  txtrelleno.style.borderColor = "#b8b8b8";
}

function ColorIcon2() {
  for (let i = 0; i < icon_error2.length; i++) {
    icon_error2[i].classList.replace(
      "invalid-background-ico",
      "border-colorIcon"
    );
  }
}

let frmc = $("#formP");

let boton = document.getElementsByName("accion1");

for (btn of boton) {
  btn.addEventListener("click", function (e) {
    let valor = this.value;
    console.log(valor);
    Enviarform(valor);
  });
}

function Enviarform(valor) {
  frmc.submit(function (e) {
    e.preventDefault();

    $.ajax({
      type: frmc.attr("method"),
      url: frmc.attr("action") + "/" + valor,
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function (response) {
        const respuesta = JSON.parse(response);
        console.log(respuesta.estado);

        if (respuesta.estado == 0) {
          modalProducto.close();
          Swal.fire({
            title: "Error",
            text: respuesta.mensaje,
            icon: "error",
            confirmButtonColor: "#ff004c",
          }).then(function () {
            window.location.replace("/productos");
          });
        } else {
          modalProducto.close();
          Swal.fire({
            title: "Excelente!!",
            text: respuesta.mensaje,
            icon: "success",
            confirmButtonColor: "#008d49",
          }).then(function () {
            window.location.replace("/productos");
          });
        }
      },
      error: function (error) {
        alert(error);
      },
    });
  });
}

$(document).ready(function () {
  $("#tblproductos").DataTable({
    language: {
      url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
    },
    scrollY: true,
    scrollX: true,
  });
});
