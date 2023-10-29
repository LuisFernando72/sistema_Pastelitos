const $btnSignIn = document.querySelector(".sign-in-btn"),
  $btnSignUp = document.querySelector(".sign-up-btn"),
  $signUp = document.querySelector(".sign-up"),
  $signIn = document.querySelector(".sign-in");

document.addEventListener("click", (e) => {
  if (e.target === $btnSignIn || e.target === $btnSignUp) {
    $signIn.classList.toggle("active");
    $signUp.classList.toggle("active");
  }
});

let frmModPass = $("#frmcrearcuenta");

frmModPass.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: frmModPass.attr("method"),
    url: "/CrearCuenta",
    data: frmModPass.serialize(),
    success: function (response) {
      console.log(response);
      const respuesta = response;

      if (response.estado == 0) {
        Swal.fire({
          title: "Error",
          text: response.mensaje,
          icon: "error",
          confirmButtonColor: "#ff004c",
        }).then(function () {
          window.location.replace("/loguearse");
        });
      } else {
        Swal.fire({
          title: "Excelente!!",
          text: response.mensaje,
          icon: "success",
          confirmButtonColor: "#008d49",
        }).then(function () {
          window.location.replace("/loguearse");
        });
      }
    },
    error: function (error) {
      alert(error);
    },
  });
});

let frminiciarSesion = $("#iniciarSesion");

var dataCliente = localStorage.getItem("dataCliente"); //Obtener datos de localStorage
var operacion = "A"; //"A"=agregar; "E"=edtidar
dataCliente = JSON.parse(dataCliente); // Covertir a objeto
if (dataCliente === null) // Si no existe, creamos un array vacio.
    dataCliente = [];

frminiciarSesion.submit(function (e) {
  e.preventDefault();
  $.ajax({
    type: frminiciarSesion.attr("method"),
    url: "/iniciarSesion",
    data: frminiciarSesion.serialize(),
    success: function (response) {
      console.log(response);
      const respuesta = JSON.parse(response);
      console.log(respuesta.estado);
      
      if (respuesta.estado == 0) {
        Swal.fire({
          title: "Error",
          text: "Las credenciales no son correctas!!",
          icon: "error",
          confirmButtonColor: "#ff004c",
        }).then(function () {
          window.location.replace("/loguearse");
        });
      } else {
        Swal.fire({
          title: "Excelente!!",
          text: "Bienvenido, brooo",
          icon: "success",
          confirmButtonColor: "#008d49",
        }).then(function () {
          window.location.replace("/");
          dataCliente.push(response); // Guardar datos en el array definido globalmente
          localStorage.setItem("dataCliente", JSON.stringify(dataCliente));
        });
      }
    },
    error: function (error) {
      alert(error);
    },
  });
});

