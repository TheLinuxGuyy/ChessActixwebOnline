from flask import Flask, render_template,request,redirect
import random
import requests
from bs4 import BeautifulSoup
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import websockets
import json
import asyncio
app=Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CURRENT_LOBBIES=dict()
def create_database():
    app.app_context().push()
    db.create_all()

class Lobbies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lobby_number = db.Column(db.String(20), nullable=False)

async def resp(websocket):
    async for message in websocket:
        #if message == "illegal":
        #if message == "legal":
            response=message
    await websocket.send(response)
async def main(lobby_number):
    async with websockets.serve(resp, f"https://127.0.0.1/{lobby_number}", 8765):
        await asyncio.Future()  # run forever


class Chess:
    @app.route("/",methods=["GET","POST"])
    def main():
        if request.method=="POST":
            lobby_number=str(random.randint(0,400))
            lobby_number_db= Lobbies.query.filter_by(lobby_number=lobby_number).first()
            if lobby_number_db:
                while lobby_number_db:
                    lobby_number=str(random.randint(0,400))
                    lobby_number_db= Lobbies.query.filter_by(lobby_number=lobby_number).first()
            new_lobby=Lobbies(lobby_number=lobby_number)
            db.session.add(new_lobby)
            db.session.commit() 
            for lobby in Lobbies.query.all():
                if lobby.lobby_number in CURRENT_LOBBIES.keys():
                    registered_lobby=True
                else:
                    CURRENT_LOBBIES[lobby.lobby_number]=1

            asyncio.run(main(lobby_number))
            redirect(f"/lobby/{lobby_number}")
        return render_template("main.html")
    
    @app.route("/lobby/<string:lobbynumber>")
    def lobby(lobbynumber):
        lobby_exists=Lobbies.query.filter_by(lobby_number=lobbynumber).first()
        if lobby_exists:
            return render_template("index.html",lobbynumber=lobbynumber)
        return "this lobby does not exist"
    


if __name__=="__main__":
    create_database()
    app.run(debug = True)


