import requests
from flask import session

class Perfil:

    def __init__(self):
        pass

    def Autenticar(self, email, pasw):
        self.email = email
        self.pasw = pasw

    def ObtenerMenu(self, menupintar):
        self.menupintar = menupintar

    def menupintar(self):
        return self.menupintar

    def ObtenerDatosMenu(self):
        url = 'http://127.0.0.1:8000/api/log/<correol><pasw>'
        parametros = {"correol": self.email, "pasw": self.pasw}
        x = requests.get(url, parametros)
        response = {}
        if x.status_code == 200:
            data = x.json()
            session['nombres'] = data["nombres"]
            session['apellidos'] = data["apellidos"]
            session['correo'] = data["correo"]
            session['rol'] = data["idperfil"]
            m = data["pintarMenu"]
            print(m)
            print("ERORRR AQUIIII")
            
            response = {'status': 200, 'estado': 1, 'mensaje': m}
        else:
            response = {'status': 400, 'estado': 0,
                        'mensaje': "Las credenciales no son correctas!!"}
        return response


