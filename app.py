from flask import Flask, render_template,request,redirect
import random
import requests
from bs4 import BeautifulSoup
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import websockets
import json
import asyncio
import time
app=Flask(__name__)
CURRENT_LOBBIES=dict()

async def resp(websocket):
    async for message in websocket:
        #if message == "illegal":
        #if message == "legal":
        response = {
            'result': message
        }
    await websocket.send(json.dumps(response))

async def main(lobby_number):
    async with websockets.serve(resp, "localhost", 5050):
        await asyncio.Future()  # run forever


class Chess:
    @app.route("/main",methods=["GET","POST"])
    def main():
        if request.method=="POST":
            asyncio.run(main())
            redirect("/")
        return render_template("main.html")
    
    
if __name__=="__main__":
    app.run(debug = True)


