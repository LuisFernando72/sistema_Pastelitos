const txtbuscarp = document.querySelector("#txtbuscarp");
const btnbuscarr = document.querySelector("#btnbuscarr");
const modalBuscador = document.querySelector("#modalBuscador");
const btn_salirbuscador = document.querySelector("#btn_salirbuscador");

btnbuscarr.addEventListener("click", () => {
  BuscarProducto();
});

function BuscarProducto() {
  let palabras = txtbuscarp.value;
  axios
    .get("http://127.0.0.1:8000/api/verproductos")
    .then(function (response) {
      let tag = "";
      Object.entries(response.data).forEach(([key, value]) => {
        let posicion = value.descripcion
          .toLowerCase()
          .indexOf(palabras.toLowerCase());
        if (posicion !== -1) {
          console.log("encontrado");
          console.log(value.descripcion);

          tag += `
        
          <div class="swiper-slide box">
            <div class="icons">
              <a href="#">
                <i class="bx bxs-happy-heart-eyes bx-tada"></i
              ></a>
              <a href="#"> <i class="bx bxs-cloud-download"></i></a>
              <a href="#"><i class="bx bxs-share-alt bx-tada"></i></a>
            </div>
            <div class="image">
              <img src="static/imgp/${value.nombreImagen}" alt="" />
            </div>
            <div class="content">
              <div class="precio" style="font-size: 1.2rem">Q.
                ${value.precioCosto}
              </div>
              <div class="price">${value.nombreProducto}</div>
              <div class=""><p>${value.descripcion}</p></div>
              <!-- <a href="#" class="btn">Agregar</a> -->
              <button id="btncarritoA" class="btn" value="${value.id}">
                Agregar
              </button>
            </div>
          </div>`;

          modalBuscador.showModal();
        }
      });

      document.querySelector("#swiperbusqueda").innerHTML = tag;
    })
    .catch((e) => {
      console.log(e);
    });
}

btn_salirbuscador.addEventListener("click", () => {
  modalBuscador.close();
});
