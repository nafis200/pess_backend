"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const emailSender_1 = __importDefault(require("../../utils/emailSender"));
const ADMIN_EMAIL = "nafisahamed14@gmail.com";
const meetLinks = [
    "https://meet.google.com/qiy-ouzj-fhd",
    "https://meet.google.com/rnk-hypm-mhb",
    "https://meet.google.com/hdp-qzpz-uqz",
];
const getMeetLink = () => {
    return meetLinks[Math.floor(Math.random() * meetLinks.length)];
};
const checkConflict = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.booking.findFirst({
        where: {
            status: { in: ["PENDING", "APPROVED", "RESCHEDULED"] },
            OR: [{ slotStart: { lt: end }, slotEnd: { gt: start } }],
        },
    });
});
const createBooking = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const conflict = yield checkConflict(payload.slotStart, payload.slotEnd);
    if (conflict)
        throw new ApiError_1.default(404, "Slot already booked");
    const booking = yield prisma_1.default.booking.create({
        data: {
            userEmail: payload.userEmail,
            subject: payload.subject,
            description: payload.description,
            slotStart: new Date(payload.slotStart),
            slotEnd: new Date(payload.slotEnd),
        },
    });
    yield (0, emailSender_1.default)(ADMIN_EMAIL, `
      <h2>New Booking Request 📩</h2>
      <p><b>Email:</b> ${booking.userEmail}</p>
      <p><b>Subject:</b> ${booking.subject}</p>
      <p><b>Description:</b> ${booking.description || "No description"}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
    `, "New Booking Request");
    return booking;
});
const approveBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const meetLink = getMeetLink();
    const booking = yield prisma_1.default.booking.update({
        where: { id: Number(id) },
        data: {
            status: "APPROVED",
            meetingLink: meetLink,
        },
    });
    yield (0, emailSender_1.default)(booking.userEmail, `
      <h2>Booking Approved 🎉</h2>
      <p>Your meeting is confirmed.</p>
      <p><b>Join Link:</b> ${meetLink}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
    `, "Booking Approved");
    yield (0, emailSender_1.default)(ADMIN_EMAIL, `
      <h2>Booking Approved ✔</h2>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Meet Link:</b> ${meetLink}</p>
    `, "Booking Approved - Admin");
    return booking;
});
const rejectBooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield prisma_1.default.booking.update({
        where: { id: Number(id) },
        data: { status: "REJECTED" },
    });
    yield (0, emailSender_1.default)(booking.userEmail, `
      <h3>Booking Rejected ❌</h3>
      <p>Sorry, your booking request was not approved.</p>
    `, "Booking Rejected");
    yield (0, emailSender_1.default)(ADMIN_EMAIL, `
      <h3>Booking Rejected ❌</h3>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>Status:</b> REJECTED</p>
    `, "Booking Rejected - Admin");
    return booking;
});
const rescheduleBooking = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const conflict = yield checkConflict(payload.slotStart, payload.slotEnd);
    if (conflict)
        throw new Error("Slot already booked");
    const existing = yield prisma_1.default.booking.findUnique({
        where: { id: Number(id) },
    });
    const meetLink = (existing === null || existing === void 0 ? void 0 : existing.meetingLink) || getMeetLink();
    const booking = yield prisma_1.default.booking.update({
        where: { id: Number(id) },
        data: {
            slotStart: new Date(payload.slotStart),
            slotEnd: new Date(payload.slotEnd),
            status: "RESCHEDULED",
            meetingLink: meetLink,
        },
    });
    yield (0, emailSender_1.default)(booking.userEmail, `
      <h2>Meeting Rescheduled 🔁</h2>
      <p><b>New Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Join Link:</b> ${meetLink}</p>
    `, "Meeting Rescheduled");
    yield (0, emailSender_1.default)(ADMIN_EMAIL, `
      <h2>Meeting Rescheduled 🔁</h2>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>New Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Meet Link:</b> ${meetLink}</p>
    `, "Rescheduled Booking - Admin");
    return booking;
});
const getAllBookings = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, page = "1", limit = "10" } = query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    const where = {};
    if (email) {
        where.userEmail = {
            contains: email,
            mode: 'insensitive'
        };
    }
    const [data, total] = yield Promise.all([
        prisma_1.default.booking.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
        }),
        prisma_1.default.booking.count({ where })
    ]);
    return {
        meta: {
            page: Number(page),
            limit: take,
            total
        },
        data
    };
});
const getSingleBooking = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma_1.default.booking.findMany({
        where: { userEmail: email },
    });
});
const deleteBooking = (id) => __awaiter(void 0, void 0, void 0, function* () { return prisma_1.default.booking.delete({ where: { id: Number(id) } }); });
exports.BookingService = {
    createBooking,
    approveBooking,
    rejectBooking,
    rescheduleBooking,
    getAllBookings,
    getSingleBooking,
    deleteBooking,
};
