package com.fourpark.routes

import com.fourpark.models.*
import com.fourpark.services.ParkingService
import io.ktor.http.*
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Route.configureParkingRoutes(parkingService: ParkingService) {
    route("/api") {
        // --- SPOTS ENDPOINTS ---
        get("/spots") {
            val day = call.request.queryParameters["day"]
            val vehicleType = call.request.queryParameters["vehicleType"]
            val spots = parkingService.getAllSpots(day, vehicleType)
            call.respond(ApiResponse(success = true, message = "Spots retrieved", data = spots))
        }

        get("/spots/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest, ApiResponse<ParkingSpot>(false, "Spot ID required")
            )
            val spot = parkingService.getSpotById(id)
            if (spot != null) {
                call.respond(ApiResponse(true, "Spot found", spot))
            } else {
                call.respond(HttpStatusCode.NotFound, ApiResponse<ParkingSpot>(false, "Spot not found"))
            }
        }

        post("/spots") {
            try {
                val req = call.receive<CreateSpotRequest>()
                val newSpot = parkingService.createSpot(req)
                call.respond(HttpStatusCode.Created, ApiResponse(true, "Driveway parking spot listed successfully on 4 PARK!", newSpot))
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, ApiResponse<ParkingSpot>(false, "Invalid request: ${e.message}"))
            }
        }

        get("/spots/{id}/availability") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest, ApiResponse<Boolean>(false, "Spot ID required")
            )
            val date = call.request.queryParameters["date"] ?: "2026-09-21"
            val start = call.request.queryParameters["startTime"] ?: "09:00"
            val end = call.request.queryParameters["endTime"] ?: "21:00"

            val (available, error) = parkingService.checkAvailability(id, date, start, end)
            if (available) {
                call.respond(ApiResponse(true, "Spot is available for reservation", mapOf("available" to true)))
            } else {
                call.respond(HttpStatusCode.Conflict, ApiResponse(false, error ?: "Spot unavailable", mapOf("available" to false, "reason" to error)))
            }
        }

        // --- BOOKINGS ENDPOINTS ---
        get("/bookings") {
            val bookings = parkingService.getAllBookings()
            call.respond(ApiResponse(true, "Bookings retrieved", bookings))
        }

        get("/bookings/{id}") {
            val id = call.parameters["id"] ?: return@get call.respond(
                HttpStatusCode.BadRequest, ApiResponse<Booking>(false, "Booking ID required")
            )
            val booking = parkingService.getBookingById(id)
            if (booking != null) {
                call.respond(ApiResponse(true, "Booking found", booking))
            } else {
                call.respond(HttpStatusCode.NotFound, ApiResponse<Booking>(false, "Booking not found"))
            }
        }

        post("/bookings") {
            try {
                val req = call.receive<BookingRequest>()
                val result = parkingService.createBooking(req)
                result.fold(
                    onSuccess = { booking ->
                        call.respond(HttpStatusCode.Created, ApiResponse(true, "Parking spot successfully booked! Digital Gate Pass generated.", booking))
                    },
                    onFailure = { error ->
                        call.respond(HttpStatusCode.Conflict, ApiResponse<Booking>(false, error.message ?: "Booking failed"))
                    }
                )
            } catch (e: Exception) {
                call.respond(HttpStatusCode.BadRequest, ApiResponse<Booking>(false, "Invalid booking request: ${e.message}"))
            }
        }

        post("/bookings/{id}/checkin") {
            val id = call.parameters["id"] ?: return@post call.respond(
                HttpStatusCode.BadRequest, ApiResponse<Booking>(false, "Booking ID required")
            )
            val updated = parkingService.checkIn(id)
            if (updated != null) {
                call.respond(ApiResponse(true, "Vehicle checked in to driveway porch!", updated))
            } else {
                call.respond(HttpStatusCode.NotFound, ApiResponse<Booking>(false, "Booking not found"))
            }
        }

        post("/bookings/{id}/checkout") {
            val id = call.parameters["id"] ?: return@post call.respond(
                HttpStatusCode.BadRequest, ApiResponse<Booking>(false, "Booking ID required")
            )
            val updated = parkingService.checkOut(id)
            if (updated != null) {
                call.respond(ApiResponse(true, "Vehicle checked out. Spot marked free for host.", updated))
            } else {
                call.respond(HttpStatusCode.NotFound, ApiResponse<Booking>(false, "Booking not found"))
            }
        }

        post("/bookings/{id}/cancel") {
            val id = call.parameters["id"] ?: return@post call.respond(
                HttpStatusCode.BadRequest, ApiResponse<Booking>(false, "Booking ID required")
            )
            val updated = parkingService.cancelBooking(id)
            if (updated != null) {
                call.respond(ApiResponse(true, "Booking cancelled", updated))
            } else {
                call.respond(HttpStatusCode.NotFound, ApiResponse<Booking>(false, "Booking not found"))
            }
        }

        // --- HOST DASHBOARD STATS ---
        get("/host/dashboard") {
            val stats = parkingService.getHostDashboardStats()
            call.respond(ApiResponse(true, "Host statistics retrieved", stats))
        }
    }
}
