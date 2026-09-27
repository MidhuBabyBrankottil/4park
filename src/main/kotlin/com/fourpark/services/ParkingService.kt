package com.fourpark.services

import com.fourpark.models.*
import java.time.format.DateTimeFormatter
import java.util.UUID
import java.util.concurrent.ConcurrentHashMap

class ParkingService {
    private val spots = ConcurrentHashMap<String, ParkingSpot>()
    private val bookings = ConcurrentHashMap<String, Booking>()

    init {
        seedInitialData()
    }

    private fun seedInitialData() {
        // User's scenario in Chennai: House #42, 2nd Avenue, Anna Nagar West, Chennai
        // Free every Monday 9:00 AM to 9:00 PM
        val userSpotId = "spot-user-01"
        val userSpot = ParkingSpot(
            id = userSpotId,
            title = "My Home Driveway & Covered Porch",
            hostName = "Vikram Sharma (Homeowner)",
            hostPhone = "+91 98450 12345",
            houseNumber = "House #42, 2nd Avenue",
            area = "Anna Nagar",
            city = "Chennai",
            landmark = "Near Tower Park Gate 3 (Opp Shanthi Colony)",
            societyName = "Anna Nagar West Enclave",
            address = "House #42, 2nd Avenue, Anna Nagar West, Chennai 600040",
            spotType = "Covered Porch",
            vehicleTypes = listOf("Car", "Bike"),
            amenities = listOf("Covered Roof", "Gated Security", "CCTV", "15A EV Socket"),
            carRate = 35.0,
            bikeRate = 15.0,
            accessInstructions = "Enter via Gate 2. Inform security guard you are using 4-PARK pass for House #42.",
            schedules = listOf(
                AvailabilitySchedule(
                    id = "sched-01",
                    spotId = userSpotId,
                    dayOfWeek = "MONDAY",
                    startTime = "09:00",
                    endTime = "21:00",
                    isRecurring = true
                )
            ),
            isUserSpot = true,
            isActive = true
        )
        spots[userSpot.id] = userSpot

        // Spot 2: T. Nagar, Chennai
        val spot2Id = "spot-chennai-02"
        val spot2 = ParkingSpot(
            id = spot2Id,
            title = "Paved Shaded Driveway",
            hostName = "Priya Nambiar",
            hostPhone = "+91 98231 67890",
            houseNumber = "House #18, Venkatnarayana Road",
            area = "T. Nagar",
            city = "Chennai",
            landmark = "Near Panagal Park & Pondy Bazaar",
            societyName = "T. Nagar Residential Colony",
            address = "House #18, Venkatnarayana Road, T. Nagar, Chennai 600017",
            spotType = "Gated Driveway",
            vehicleTypes = listOf("Car", "Bike"),
            amenities = listOf("Tree Shade", "Wide Gate Entry", "CCTV"),
            carRate = 40.0,
            bikeRate = 15.0,
            schedules = listOf(
                AvailabilitySchedule(id = "sched-02", spotId = spot2Id, dayOfWeek = "MONDAY", startTime = "08:30", endTime = "20:30", isRecurring = true)
            ),
            isActive = true
        )
        spots[spot2.id] = spot2

        // Spot 3: Adyar, Chennai
        val spot3Id = "spot-chennai-03"
        val spot3 = ParkingSpot(
            id = spot3Id,
            title = "Ground Floor Stilt Parking",
            hostName = "Arun Roy",
            hostPhone = "+91 97112 34567",
            houseNumber = "Flat G-2, 4th Cross Street",
            area = "Adyar",
            city = "Chennai",
            landmark = "Near Gandhi Nagar & Adyar Ananda Bhavan",
            societyName = "Adyar Lakeview Apartments",
            address = "Flat G-2, 4th Cross Street, Gandhi Nagar, Adyar, Chennai 600020",
            spotType = "Stilt Parking",
            vehicleTypes = listOf("Car", "Bike"),
            amenities = listOf("Stilt Roof", "Security Guard", "CCTV"),
            carRate = 30.0,
            bikeRate = 10.0,
            schedules = listOf(
                AvailabilitySchedule(id = "sched-03", spotId = spot3Id, dayOfWeek = "MONDAY", startTime = "09:00", endTime = "19:00", isRecurring = true)
            ),
            isActive = true
        )
        spots[spot3.id] = spot3

        // Sample upcoming reservation
        val sampleBooking = Booking(
            id = "bk-chn-01",
            spotId = userSpotId,
            spotTitle = userSpot.title,
            houseNumber = userSpot.houseNumber,
            area = userSpot.area,
            landmark = userSpot.landmark,
            city = "Chennai",
            renterName = "Dr. Sameer Sen",
            renterPhone = "+91 98400 99882",
            vehicleNumber = "TN-02-CB-4242",
            vehicleType = "Car",
            bookingDate = "Monday",
            startTime = "10:00",
            endTime = "14:00",
            totalHours = 4.0,
            hourlyRate = 35.0,
            totalAmount = 140.0,
            status = BookingStatus.CONFIRMED,
            gatePassCode = "4PARK-CHN-4201",
            createdAt = "2026-09-17 18:30"
        )
        bookings[sampleBooking.id] = sampleBooking
    }

    fun getAllSpots(dayOfWeek: String? = null, vehicleType: String? = null, query: String? = null): List<ParkingSpot> {
        return spots.values.filter { spot ->
            spot.isActive &&
            (dayOfWeek.isNullOrBlank() || spot.schedules.any { it.dayOfWeek.equals(dayOfWeek, ignoreCase = true) }) &&
            (vehicleType.isNullOrBlank() || spot.vehicleTypes.any { it.equals(vehicleType, ignoreCase = true) }) &&
            (query.isNullOrBlank() || 
                spot.area.contains(query, ignoreCase = true) ||
                spot.landmark.contains(query, ignoreCase = true) ||
                spot.title.contains(query, ignoreCase = true) ||
                spot.societyName.contains(query, ignoreCase = true))
        }
    }

    fun getSpotById(id: String): ParkingSpot? = spots[id]

    fun createSpot(req: CreateSpotRequest): ParkingSpot {
        val spotId = "spot-${UUID.randomUUID().toString().take(8)}"
        val schedule = AvailabilitySchedule(
            id = "sched-${UUID.randomUUID().toString().take(6)}",
            spotId = spotId,
            dayOfWeek = req.dayOfWeek.uppercase(),
            startTime = req.startTime,
            endTime = req.endTime,
            isRecurring = true
        )

        val newSpot = ParkingSpot(
            id = spotId,
            title = req.title,
            hostName = req.hostName,
            hostPhone = req.hostPhone,
            houseNumber = req.houseNumber,
            area = req.area,
            city = "Chennai",
            landmark = req.landmark,
            societyName = req.societyName,
            address = "${req.houseNumber}, ${req.area}, Chennai",
            spotType = req.spotType,
            vehicleTypes = req.vehicleTypes,
            amenities = req.amenities,
            carRate = req.carRate,
            bikeRate = req.bikeRate,
            accessInstructions = req.accessInstructions,
            schedules = listOf(schedule),
            isUserSpot = true,
            isActive = true
        )

        spots[spotId] = newSpot
        return newSpot
    }

    fun createBooking(req: BookingRequest): Result<Booking> {
        val spot = spots[req.spotId] ?: return Result.failure(IllegalArgumentException("Spot not found in Chennai"))

        val rate = if (req.vehicleType.equals("Bike", ignoreCase = true)) spot.bikeRate else spot.carRate

        val startMin = parseTimeToMinutes(req.startTime)
        val endMin = parseTimeToMinutes(req.endTime)
        val hours = Math.max(1.0, ((endMin - startMin) / 60.0))
        val total = Math.round(hours * rate * 100.0) / 100.0

        val passCode = "4PARK-CHN-${(1000..9999).random()}"
        val booking = Booking(
            id = "bk-${UUID.randomUUID().toString().take(8)}",
            spotId = spot.id,
            spotTitle = spot.title,
            houseNumber = spot.houseNumber,
            area = spot.area,
            landmark = spot.landmark,
            city = "Chennai",
            renterName = req.renterName,
            renterPhone = req.renterPhone,
            vehicleNumber = req.vehicleNumber.uppercase(),
            vehicleType = req.vehicleType,
            bookingDate = req.bookingDate,
            startTime = req.startTime,
            endTime = req.endTime,
            totalHours = hours,
            hourlyRate = rate,
            totalAmount = total,
            status = BookingStatus.CONFIRMED,
            gatePassCode = passCode,
            createdAt = java.time.LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))
        )

        bookings[booking.id] = booking
        return Result.success(booking)
    }

    fun getAllBookings(): List<Booking> = bookings.values.sortedByDescending { it.createdAt }

    private fun parseTimeToMinutes(timeStr: String): Int {
        val parts = timeStr.trim().split(":")
        val hours = parts[0].toInt()
        val minutes = if (parts.size > 1) parts[1].toInt() else 0
        return hours * 60 + minutes
    }
}
