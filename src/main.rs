use actix_web::{get, web,HttpResponse,http::StatusCode ,App, HttpServer, Responder};
use tera::{Tera,Context};
use actix_web::middleware::Logger;
use rand::prelude::*;
#[get("/")]
async fn homepage(name: web::Path<String>) -> impl Responder {
   format!("Hello {}!", &name) 
}
#[post("/")]
async fn redirectlobby(){

}


#[get("/lobby/{lobby_number}")]
async fn lobby(lobby_number: web::Path<String>) -> impl Responder{

}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG","debug");
    std::env::set_var("RUST_BACKTRACE","1");
    env_logger::init();
    HttpServer::new(|| {
        let logger = Logger::default();
        App::new()
            .wrap(logger);
        App::new().service(greet)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
