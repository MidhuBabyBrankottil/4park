package com.fourpark

import com.fourpark.routes.configureParkingRoutes
import com.fourpark.services.ParkingService
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.http.content.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.callloging.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.json.Json
import org.slf4j.event.Level

fun main() {
    val port = System.getenv("PORT")?.toIntOrNull() ?: 8080
    println("=====================================================")
    println("  🚗 4 PARK - Private Driveway & Parking Rental API   ")
    println("  Running on: http://localhost:$port                 ")
    println("=====================================================")

    embeddedServer(Netty, port = port, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    val parkingService = ParkingService()

    install(ContentNegotiation) {
        json(Json {
            prettyPrint = true
            isLenient = true
            ignoreUnknownKeys = true
        })
    }

    install(CORS) {
        anyHost()
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Patch)
        allowMethod(HttpMethod.Delete)
    }

    install(CallLogging) {
        level = Level.INFO
    }

    routing {
        // API Routes
        configureParkingRoutes(parkingService)

        // Health Check
        get("/health") {
            call.respond(mapOf("status" to "healthy", "service" to "4 PARK Kotlin Engine", "version" to "1.0.0"))
        }

        // Serve frontend static files
        staticResources("/", "static") {
            default("index.html")
        }
    }
}
