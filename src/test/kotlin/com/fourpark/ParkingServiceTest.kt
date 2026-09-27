package com.fourpark

import com.fourpark.models.BookingRequest
import com.fourpark.services.ParkingService
import kotlin.test.Test
import kotlin.test.assertEquals
import kotlin.test.assertFalse
import kotlin.test.assertTrue

class ParkingServiceTest {

    private val service = ParkingService()

    @Test
    fun testUserSpotPreseededCorrectly() {
        val userSpot = service.getSpotById("spot-user-01")
        assertTrue(userSpot != null, "User Villa #42 spot should be pre-seeded")
        assertEquals("Villa #42, Lane 3", userSpot.houseNumber)
        assertEquals(35.0, userSpot.hourlyRate)
        
        val mondaySchedule = userSpot.schedules.find { it.dayOfWeek == "MONDAY" }
        assertTrue(mondaySchedule != null, "Should have a Monday schedule")
        assertEquals("09:00", mondaySchedule.startTime)
        assertEquals("21:00", mondaySchedule.endTime)
    }

    @Test
    fun testAvailabilityWithinOwnerHours() {
        // Requested window: Monday 14:00 to 18:00 (within 09:00 to 21:00)
        val (available, _) = service.checkAvailability("spot-user-01", "2026-09-28", "14:00", "18:00")
        assertTrue(available, "Should be available within Monday 09:00 - 21:00 window")
    }

    @Test
    fun testRejectsOutsideOwnerHours() {
        // Owner vehicle returns at 21:00, renter requesting until 22:00
        val (available, error) = service.checkAvailability("spot-user-01", "2026-09-28", "19:00", "22:00")
        assertFalse(available, "Should reject booking that extends past owner's 21:00 arrival")
        assertTrue(error != null && error.contains("outside owner's free hours"))
    }

    @Test
    fun testRejectsWrongDay() {
        // Spot only listed for Monday, trying to book on Tuesday
        val (available, error) = service.checkAvailability("spot-user-01", "TUESDAY", "10:00", "14:00")
        assertFalse(available, "Should reject reservation on Tuesday when spot is only available Monday")
        assertTrue(error != null && error.contains("Not available on TUESDAY"))
    }

    @Test
    fun testPreventsDoubleBookingCollision() {
        // bk-sample-01 is booked on 2026-09-21 from 10:00 to 13:00
        val (available, error) = service.checkAvailability("spot-user-01", "2026-09-21", "11:00", "14:00")
        assertFalse(available, "Should reject overlapping booking")
        assertTrue(error != null && error.contains("conflicts with an existing neighbor booking"))
    }

    @Test
    fun testSuccessfulBookingCalculatesPricingAndIssuesPass() {
        val req = BookingRequest(
            spotId = "spot-user-01",
            renterName = "Neighbor Amit",
            renterPhone = "+91 99887 76655",
            vehicleNumber = "KA-01-AB-1234",
            vehicleType = "Sedan",
            bookingDate = "2026-09-28",
            startTime = "14:00",
            endTime = "17:00" // 3 hours
        )
        val result = service.createBooking(req)
        assertTrue(result.isSuccess, "Booking should succeed")
        val booking = result.getOrThrow()
        assertEquals(3.0, booking.totalHours)
        assertEquals(105.0, booking.totalAmount) // 3h * ₹35 = ₹105
        assertTrue(booking.gatePassCode.startsWith("4PARK-PASS-"))
    }
}
