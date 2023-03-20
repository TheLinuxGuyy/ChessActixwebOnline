from flask import Flask, render_template,request,redirect
import random
import requests
from bs4 import BeautifulSoup
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
app=Flask(__name__)
madelobby=False
import asyncio
import websockets
import json
async def echo(websocket):
    async for message in websocket:
        response = {
            'error': None,
            'result': message
        }
        await websocket.send(json.dumps(response))
async def socketserver():
    print("YES YES YES YES YES YES YESY ESYEESYYE WAONDSAUI")
    async with websockets.serve(echo, "localhost", 8765):
        await asyncio.Future()

@app.route("/",methods=["GET","POST"])
def main():
    if request.method=="POST":
        global madelobby
        madelobby = True
        return redirect("/main")
    return render_template("main.html")

@app.route("/main",methods=["GET","POST"])
def chessboard():
    if madelobby:
        return render_template("index.html")
    else:
        return "there are no lobbies at the moment"
    
if __name__=="__main__":
    asyncio.run(socketserver())
    app.run(debug = True)


