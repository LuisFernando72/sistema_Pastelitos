import requests


class clientes():
    def __init__(self) -> None:
        pass
    
    def constructorCliente(self, id, nombres, apellidos, nit, correo, fecha, tipocliente):
        self.id = id
        self.nombres = nombres
        self.apellidos = apellidos
        self.nit = nit
        self.correo = correo
        self.fecha = fecha
        self.tipocliente = tipocliente
    
    
    def listarClientes(self):
        url = "http://127.0.0.1:8000/api/ListarClientes"
        
        peticion = requests.get(url)
        if peticion.status_code == 200:
            datos = peticion.json()
        
        return datos