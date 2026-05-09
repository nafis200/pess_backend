import express from "express";
import { BookingController } from "./booking.controller";


const router = express.Router();

// user booking
router.post("/", BookingController.createBooking);

// admin actions
router.patch("/approve/:id", BookingController.approveBooking);
router.patch("/reject/:id", BookingController.rejectBooking);
router.patch("/reschedule/:id", BookingController.rescheduleBooking);

// fetch
router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getSingleBooking);

// delete
router.delete("/:id", BookingController.deleteBooking);

export const BookingRoutes = router;


// http://localhost:5000/api/booking/

// {
//   "userEmail": "user@gmail.com",
//   "userName": "Nafis",
//   "slotStart": "2026-05-10T10:00:00.000Z",
//   "slotEnd": "2026-05-10T11:00:00.000Z"
// }


// 📌 GET
// http://localhost:5000/api/booking/



// 📌 GET
// http://localhost:5000/api/booking/:id


// 🧠 4. Approve Booking (Admin)
// 📌 PATCH
// http://localhost:5000/api/booking/approve/:id


// 🧠 5. Reject Booking (Admin)
// 📌 PATCH
// http://localhost:5000/api/booking/reject/:id


// 🧠 6. Reschedule Booking (Admin)
// 📌 PATCH
// http://localhost:5000/api/booking/reschedule/:id
// 📥 Body (JSON)
// {
//   "slotStart": "2026-05-11T10:00:00.000Z",
//   "slotEnd": "2026-05-11T11:00:00.000Z"
// }



// 🧠 7. Delete Booking
// 📌 DELETE
// http://localhost:5000/api/booking/:id
// উদাহরণ:
// http://localhost:5000/api/booking/1