"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
// user booking
router.post("/", booking_controller_1.BookingController.createBooking);
// admin actions
router.patch("/approve/:id", booking_controller_1.BookingController.approveBooking);
router.patch("/reject/:id", booking_controller_1.BookingController.rejectBooking);
router.patch("/reschedule/:id", booking_controller_1.BookingController.rescheduleBooking);
// fetch
router.get("/", booking_controller_1.BookingController.getAllBookings);
router.get("/:id", booking_controller_1.BookingController.getSingleBooking);
// delete
router.delete("/:id", booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
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
