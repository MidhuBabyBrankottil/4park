package com.fourpark.models

import kotlinx.serialization.Serializable

@Serializable
enum class BookingStatus {
    CONFIRMED,
    CHECKED_IN,
    COMPLETED,
    CANCELLED
}

@Serializable
data class AvailabilitySchedule(
    val id: String,
    val spotId: String,
    val dayOfWeek: String, // "MONDAY", "TUESDAY", etc.
    val startTime: String, // "09:00"
    val endTime: String,   // "21:00"
    val isRecurring: Boolean = true
)

@Serializable
data class ParkingSpot(
    val id: String,
    val title: String,
    val hostName: String,
    val hostPhone: String,
    val houseNumber: String,
    val area: String,           // e.g. "Anna Nagar", "T. Nagar", "Adyar"
    val city: String = "Chennai",
    val landmark: String,       // e.g. "Near Tower Park Gate 3"
    val societyName: String,
    val address: String,
    val spotType: String,       // "Covered Porch", "Gated Driveway", "Stilt Parking"
    val vehicleTypes: List<String>, // "Car", "Bike"
    val amenities: List<String>,
    val carRate: Double = 35.0,
    val bikeRate: Double = 15.0,
    val accessInstructions: String = "",
    val schedules: List<AvailabilitySchedule> = emptyList(),
    val isActive: Boolean = true,
    val isUserSpot: Boolean = false
)

@Serializable
data class Booking(
    val id: String,
    val spotId: String,
    val spotTitle: String,
    val houseNumber: String,
    val area: String,
    val landmark: String,
    val city: String = "Chennai",
    val renterName: String,
    val renterPhone: String,
    val vehicleNumber: String,  // e.g. "TN-02-CB-4242"
    val vehicleType: String,    // "Car" or "Bike"
    val bookingDate: String,    // Day or YYYY-MM-DD
    val startTime: String,      // "09:00"
    val endTime: String,        // "13:00"
    val totalHours: Double,
    val hourlyRate: Double,
    val totalAmount: Double,
    val status: BookingStatus = BookingStatus.CONFIRMED,
    val gatePassCode: String,
    val createdAt: String
)

@Serializable
data class BookingRequest(
    val spotId: String,
    val renterName: String,
    val renterPhone: String,
    val vehicleNumber: String,
    val vehicleType: String,    // "Car" or "Bike"
    val bookingDate: String,
    val startTime: String,
    val endTime: String
)

@Serializable
data class CreateSpotRequest(
    val title: String,
    val hostName: String,
    val hostPhone: String,
    val houseNumber: String,
    val area: String,           // e.g. "Anna Nagar"
    val landmark: String,       // e.g. "Near Tower Park Gate 3"
    val societyName: String,
    val spotType: String,
    val vehicleTypes: List<String>,
    val amenities: List<String>,
    val carRate: Double = 35.0,
    val bikeRate: Double = 15.0,
    val accessInstructions: String = "",
    val dayOfWeek: String = "MONDAY",
    val startTime: String = "09:00",
    val endTime: String = "21:00"
)

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val message: String,
    val data: T? = null
)
