import express from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

// user booking
router.post("/", BookingController.createBooking);

// admin actions
router.patch("/approve/:id",auth("ADMIN"), BookingController.approveBooking);
router.patch("/reject/:id",auth("ADMIN"), BookingController.rejectBooking);
router.patch("/reschedule/:id",auth("USER", "ADMIN"),BookingController.rescheduleBooking);

// fetch
router.get("/", BookingController.getAllBookings);
router.get("/:id", BookingController.getSingleBooking);

// delete
router.delete("/:id",auth("USER", "ADMIN"), BookingController.deleteBooking);

export const BookingRoutes = router;


// http://localhost:5000/api/booking/

// {
//   "userEmail": "user@gmail.com",
//   "subject": "Career Guidance Meeting",
//   "description": "I want to discuss freelancing roadmap",
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