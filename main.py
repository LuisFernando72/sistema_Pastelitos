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


if __name__ == "__main__":
    app.run(debug=True)
