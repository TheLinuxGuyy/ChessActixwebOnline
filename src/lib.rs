use wqsm_bindgen::prelude::*;
use tungstenite::{connect, Message};
use url::Url;
use serde_json;

fn listening(){
    // Loop forever, handling parsing each message
    loop {
        let msg = socket.read_message().expect("Error reading message");
        let msg = match msg {
            tungstenite::Message::Text(s) => { s }
            _ => { panic!() }
        };
        let parsed: serde_json::Value = serde_json::from_str(&msg).expect("Can't parse to JSON");
        println!("{:?}", parsed["result"]);
    }
}


#[wasm_bindgen]
pub fn connect(lobby_number:i32,frompos:String,topos: String) {
    let (mut socket, _response) = connect(Url::parse("ws://localhost:8765/{}",lobby_number).unwrap()).expect("Can't connect");    // Write a message containing "Hello, Test!" to the server
    socket.write_message(Message::Text("{0} {1}",frompos,topos.into())).unwrap();
    listening();
}
