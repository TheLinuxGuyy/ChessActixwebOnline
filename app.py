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
import threading
app=Flask(__name__)
CURRENT_LOBBIES=dict()


@app.route("/main",methods=["GET","POST"])
def main():
    if request.method=="POST":
        return redirect("/")
    return render_template("main.html")
    
    
if __name__=="__main__":
    app.run(debug = True)


