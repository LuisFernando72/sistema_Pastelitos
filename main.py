from flask import Flask, session, render_template, request, redirect
from model.Productos import Productos
from datetime import datetime
from model.Views import Views
from model.Menu import Menu
from model.Perfil import Perfil
from model.Clientes import clientes
import requests

import json
app = Flask(__name__, template_folder="templates")
app.secret_key = "anystringhere"
per = Perfil()


@app.route("/")
def root():
    ll = session.get("rol")
    RenderMenu = ""
    print(ll)

    if not 'rol' in session:
        RenderMenu = "<a id=\"Catalogos\"> <i class=\"bx bx-menu\"></i> Nuestros Catalogos</a>\
                <a href=\"/\"> <i class=\"bx bx-home\"></i> Inicio</a>\
          <a href=\"/loguearse\"> <i class=\"bx bx-user\"></i>Autenticarse</a>"
    else:
        RenderMenu = per.menupintar

    v = Views()
    retorno = v.verporCategoria(1)
    retorno2 = v.verporCategoria(2)
    retorno3 = v.verporCategoria(3)

    vistas = {
        "horneado": retorno,
        "frio": retorno2,
        "yogu": retorno3,

    }

    print("liuiss")
    print(vistas)
    print(RenderMenu)
    # print(vistas)

    # RETORNA EL HTML

    # RETORNA EL HTML
    return render_template("inicio.html",  ver=vistas, ver2=RenderMenu)

# BUENOS DIAS, LES SALUDA UN TERRRICOLA, ENVIADO DESDE LA TIERRA

# html Productos
@app.route("/pastelyogurt")
def verYogurt():
    v = Views()
    RenderMenu = per.menupintar
    retorno = v.verporCategoria(3)
    vistas = {
        "yogu": retorno
    }

    return render_template("yogu.html", ver=vistas, ver2=RenderMenu)


@app.route("/pastelHorneado")
def verHorneado():
    v = Views()
    RenderMenu = per.menupintar
    retorno = v.verporCategoria(1)
    vistas = {
        "horneado": retorno
    }
    return render_template("horneado.html", ver=vistas, ver2=RenderMenu)


@app.route("/pastelFrio")
def verFrio():
    RenderMenu = per.menupintar
    v = Views()
    retorno = v.verporCategoria(2)
    vistas = {
        "frio": retorno
    }
    return render_template("frio.html", ver=vistas, ver2=RenderMenu)

@app.route("/productos")
def productos_render():
    p = Productos()
    retorno = p.VerProductos()
    RenderMenu = per.menupintar

    return render_template("productos.html", tabla=retorno, ver2=RenderMenu)


@app.route("/operacionesProductos/<string:accion>", methods=["POST"])
def crearProducto(accion):
    tiempo = datetime.now()
    horaActual = tiempo.strftime('%Y%H%M%S')
    p = Productos()
    imagendef = request.form["imagendef"]
    idproducto = request.form["idProducto"]
    sabor = request.form["sabor"]
    relleno = request.form["relleno"]
    categoria = request.form["categoria"]
    producto = request.form["txtproducto"]
    idcategoria = request.form["txtcategoria"]
    cantidad = request.form["txtcantidad"]
    imagen = request.files["txtimagen"]
    preciocosto = request.form["txtprecioCosto"]
    idrebaja = request.form["txtrebaja"]
    idsabor = request.form["txtsabor"]
    idrelleno = request.form["txtrelleno"]

    nm = ""
    if imagen.filename != "":
        nm = horaActual+"_" + imagen.filename
        imagen.save("static/imgp/" + nm)
    else:
        nm = imagendef

    p.constructorProductos(idproducto, idcategoria, categoria, producto, "", nm,
                           preciocosto, 0, idrebaja, cantidad, "", idsabor, idrelleno, sabor, relleno)

    if accion == "InsertarProducto":
        retorno = p.CrearProductos()
        return json.dumps(retorno)
    if accion == "ModificarProducto":
        retorno = p.ModificarProductos()
        return json.dumps(retorno)
    if accion == "EliminarProducto":
        retorno = p.EliminarProductos()
        return json.dumps(retorno)


@app.route("/rebajas")
def rebajas():
    return render_template("rebajas.html")

# INICIO AUTENTICACION


@app.route("/loguearse")
def login():
    return render_template("autenticarse.html")


@app.route("/CrearCuenta", methods=["POST"])
def CrearCuenta():

    nombres = request.form["nombres"]
    correo = request.form["correo"]
    apellidos = request.form["apellidos"]
    password = request.form["password"]
    fecha = ""
    idrol = 0

    url = "http://127.0.0.1:8000/api/CrearUsuario"
    response = {}
    parametros = {
        "id": 0,
        "nombres": nombres,
        "correo": correo,
        "apellidos": apellidos,
        "password": str(password),
        "fecha": fecha,
        "idrol": idrol
    }
    x = requests.post(url, data=json.dumps(parametros))
    if x.status_code == 201:
        response = {"estado": 1,
                    "mensaje": "Usuario Creado correctamente, ya puede iniciar sesión"}
    else:
        response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}

    return response


@app.route("/iniciarSesion", methods=["POST"])
def IniciarSesion():
    correo = request.form["correo"]
    password = request.form["password"]

    per.Autenticar(str(correo), str(password))
    response = per.ObtenerDatosMenu()
    print("inicio")
    print(response["estado"])

    if response["estado"] == 1:
        per.ObtenerMenu(str(response["mensaje"]))

    return json.dumps(response)


@app.route("/menu")
def menu():

    RenderMenu = per.menupintar

    return render_template("menu.html", ver2=RenderMenu)


@app.route("/Clientes")
def Clientes():
    RenderMenu = per.menupintar
    c = clientes()
    retorno = c.listarClientes()

    return render_template("clientes.html", ver2=RenderMenu, tabla=retorno)

@app.route("/Pedidos")
def Pedidos():
    RenderMenu = per.menupintar
    correo = session.get("correo")
    url = "http://127.0.0.1:8000/api/vermispedidos/<correo>"

    params = {'correo': correo}
    x = requests.get(url, params=params)
    if x.status_code == 200:
        retorno = x.json()

    return render_template("pedidos.html", ver2=RenderMenu, tabla=retorno)


@app.route("/Entregas")
def Entregas():
    RenderMenu = per.menupintar
    url = "http://127.0.0.1:8000/api/verEntregas"

    x = requests.get(url, )
    if x.status_code == 200:
        retorno = x.json()
    return render_template("entregas.html", ver2=RenderMenu, tabla = retorno)

@app.route("/CerrarSesion")
def cerrar_sesion():
    session.clear()
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
