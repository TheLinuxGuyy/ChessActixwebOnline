use actix_web::{post,get, web,HttpResponse,http::StatusCode ,App, HttpServer, Responder};
use actix_web::middleware::Logger;
use rand::Rng;
use actix_web::web::Redirect;
#[get("/")]
async fn homepage(name: web::Path<String>) -> impl Responder {
   format!("Hello {}!", &name) 
}
#[post("/")]
async fn redirectlobby(){
    let mut rng = rand::thread_rng();
    let randomnumber: u8 = rng.gen();
    Redirect::to("https://127.0.0.1:8080/lobby/{}",&randomnumber);
}


#[get("/lobby/{lobby_number}")]
async fn lobby(lobby_number: web::Path<String>) -> impl Responder{
    Ok(HttpResponse::build(StatusCode::OK)
        .content_type("text/html; charset=utf-8")
        .body(include_str!("../templates/index.html")))
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
        App::new()
        .service(home)
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
