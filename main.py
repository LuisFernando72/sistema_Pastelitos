from flask import Flask, session, render_template, request
from model.Productos import Productos
from datetime import datetime
import json
app = Flask(__name__, template_folder="templates")


@app.route("/")
def root():
    return render_template("inicio.html")  # RETORNA EL HTML

# BUENOS DIAS, LES SALUDA UN TERRRICOLA, ENVIADO DESDE LA TIERRA

# html Productos


@app.route("/productos")
def productos_render():
    p = Productos()
    retorno = p.VerProductos()

    return render_template("productos.html", tabla=retorno)

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
    
    return render_template("clientes.html", ver2=RenderMenu, tabla = retorno)


@app.route("/CerrarSesion")
def cerrar_sesion():
    session.clear()
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
