import requests
import json

class Views():
    def __init__(self) -> None:
          pass
      
    def verporCategoria(self, id):
        url = "http://127.0.0.1:8000/api/Buscarporcategoria/<id>"
        
        params = {'id': str(id)}
        x = requests.get(url, params=params)
        
        return x.json()