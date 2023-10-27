$(document).ready(function () {
    $("#tblClientes").DataTable({
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json",
      },
      scrollY: true,
      scrollX: true,
    });
  });
  
  const tipopago = document.querySelector("#tipopago");
  const tipodocumento = document.querySelector("#tipodocumento");
  
  SelectDynamic2(
    tipopago,
    "http://127.0.0.1:8000/api/Listartipopago ",
    "id",
    "tipopago"
  );
  
  function SelectDynamic2(input, url, id, valor) {
    axios.get(url, {}).then(function (response) {
      Object.entries(response.data).forEach(([key, value]) => {
        input.innerHTML +=
          "<option value='" + value[id] + "'>" + value[valor] + "</option>";
      });
    });
  }
  
  tipopago.addEventListener("change", function () {
    var selectedOption = this.options[tipopago.selectedIndex];
    // sabor.value = selectedOption.text;
    if (this.value == 1) {
      tipodocumento.value = "Nota de credito";
    } else {
      tipodocumento.value = "Factura";
    }
  });