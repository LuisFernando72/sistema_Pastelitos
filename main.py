from flask import Flask, session, render_template

app = Flask(__name__)


@app.route("/")
def root():
    return render_template("index.html")#RETORNA EL HTML

#BUENOS DIAS, LES SALUDA UN TERRRICOLA, ENVIADO DESDE LA TIERRA
#COMPRAS PAS, DOS TRES CUATRO CINCOCLS

if __name__ == "__main__":
    app.run(debug=True)