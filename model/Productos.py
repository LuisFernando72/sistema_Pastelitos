import requests
import json


class Productos():
    def __init__(self) -> None:
        pass

    def VerProductos(self):
        url = "http://127.0.0.1:8000/api/verproductos"

        x = requests.get(url)
        if x.status_code == 200:
            data = x.json()

        return data

    def constructorProductos(self, id, idCategoria, categoria, nombreProducto, descripcion, nombreImagen, precioCosto, precioVenta, idRebajas, cantidad, fecha_creacion, idsabor, idrelleno, sabor, relleno):
        self.id = id
        self.idCategoria = idCategoria
        self.categoria = categoria
        self.nombreProducto = nombreProducto
        self.descripcion = descripcion
        self.nombreImagen = nombreImagen
        self.precioCosto = precioCosto
        self.precioVenta = precioVenta
        self.idRebajas = idRebajas
        self.cantidad = cantidad
        self.fecha_creacion = fecha_creacion
        self.idsabor = idsabor
        self.idrelleno = idrelleno
        self.sabor = sabor
        self.relleno = relleno

    def CrearProductos(self):
        url = 'http://127.0.0.1:8000/api/crearProducto'
        response = {}
        print(self.idCategoria)
        parametros = {
            "id": 0,
            "idCategoria": int(self.idCategoria),
            "categoria": str(self.categoria),
            "nombreProducto": str(self.nombreProducto),
            "descripcion": "f",
            "nombreImagen": str(self.nombreImagen),
            "precioCosto": float(self.precioCosto),
            "precioVenta": 0,
            "idRebajas": int(self.idRebajas),
            "nombre_rebaja": "f",
            "porcentaje_rebaja": "f",
            "fecha_inicio_rebaja": "f",
            "cantidad": int(self.cantidad),
            "fecha_creacion": "f",
            "id_sabor": int(self.idsabor),
            "id_relleno": int(self.idrelleno),
            "sabor": str(self.sabor),
            "relleno": str(self.relleno),
        }

        x = requests.post(url, data=json.dumps(parametros))
        if x.status_code == 201:
            response = {"estado": 1,
                        "mensaje": "Producto agregado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}

        return response

    def ModificarProductos(self):
        url = 'http://127.0.0.1:8000/api/actualizarProducto'
        response = {}
        print(self.idCategoria)
        parametros = {
            "id": int(self.id),
            "idCategoria": int(self.idCategoria),
            "categoria": str(self.categoria),
            "nombreProducto": str(self.nombreProducto),
            "descripcion": "f",
            "nombreImagen": str(self.nombreImagen),
            "precioCosto": float(self.precioCosto),
            "precioVenta": 0,
            "idRebajas": int(self.idRebajas),
            "nombre_rebaja": "f",
            "porcentaje_rebaja": "f",
            "fecha_inicio_rebaja": "f",
            "cantidad": int(self.cantidad),
            "fecha_creacion": "f",
            "id_sabor": int(self.idsabor),
            "id_relleno": int(self.idrelleno),
            "sabor": str(self.sabor),
            "relleno": str(self.relleno),
        }

        x = requests.put(url, data=json.dumps(parametros))
        if x.status_code == 200:
            response = {"estado": 1,
                        "mensaje": "Producto modificado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Porfavor verificar los datos"}

        return response

    def EliminarProductos(self):
        url = 'http://127.0.0.1:8000/api/EliminarProducto'
        response = {}
        print(self.idCategoria)
        parametros = {
            "id": int(self.id),
            "idCategoria": int(self.idCategoria),
            "categoria": str(self.categoria),
            "nombreProducto": str(self.nombreProducto),
            "descripcion": "f",
            "nombreImagen": str(self.nombreImagen),
            "precioCosto": float(self.precioCosto),
            "precioVenta": 0,
            "idRebajas": int(self.idRebajas),
            "nombre_rebaja": "f",
            "porcentaje_rebaja": "f",
            "fecha_inicio_rebaja": "f",
            "cantidad": int(self.cantidad),
            "fecha_creacion": "f",
            "id_sabor": int(self.idsabor),
            "id_relleno": int(self.idrelleno),
            "sabor": str(self.sabor),
            "relleno": str(self.relleno),
        }

        x = requests.delete(url, data=json.dumps(parametros))
        if x.status_code == 200:
            response = {"estado": 1,
                        "mensaje": "Producto eliminado correctamente!!"}
        else:
            response = {"estado": 0, "mensaje": "Uffa pa, eso no se puede eliminar :)"}

        return response
