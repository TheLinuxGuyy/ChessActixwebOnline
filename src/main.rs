use actix_web::{get, web,HttpResponse,http::StatusCode ,App, HttpServer, Responder};
use tera::{Tera,Context};
use actix_web::middleware::Logger;
#[get("/")]
async fn greet(name: web::Path<String>) -> impl Responder {
    
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
