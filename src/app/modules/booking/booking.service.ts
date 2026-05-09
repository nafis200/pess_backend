import prisma from "../../../shared/prisma";
import emailSender from "../../utils/emailSender";



const ADMIN_EMAIL = "nafisahamed14@gmail.com";

const meetLinks = [
  "https://meet.google.com/qiy-ouzj-fhd",
  "https://meet.google.com/rnk-hypm-mhb",
  "https://meet.google.com/hdp-qzpz-uqz",
];


const getMeetLink = () => {
  return meetLinks[Math.floor(Math.random() * meetLinks.length)];
};


const checkConflict = async (start: Date, end: Date) => {
  return prisma.booking.findFirst({
    where: {
      status: { in: ["PENDING", "APPROVED"] },
      OR: [
        {
          slotStart: { lt: end },
          slotEnd: { gt: start },
        },
      ],
    },
  });
};


const createBooking = async (payload: any) => {
  const conflict = await checkConflict(payload.slotStart, payload.slotEnd);

  if (conflict) throw new Error("Slot already booked");

  const booking = await prisma.booking.create({
    data: {
      userEmail: payload.userEmail,
      userName: payload.userName,
      slotStart: new Date(payload.slotStart),
      slotEnd: new Date(payload.slotEnd),
    },
  });

  await emailSender(
    ADMIN_EMAIL,
    `
      <h2>New Booking Request 📩</h2>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
    `,
    "New Booking Request"
  );

  return booking;
};


const approveBooking = async (id: string) => {
  const meetLink = getMeetLink();

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      status: "APPROVED",
      meetingLink: meetLink,
    },
  });

  /* 📩 EMAIL → USER */
  await emailSender(
    booking.userEmail,
    `
      <h2>Booking Approved 🎉</h2>

      <p>Your meeting is confirmed.</p>

      <p><b>Join Meeting Link:</b></p>
      <a href="${meetLink}" target="_blank">${meetLink}</a>

      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>

      <p>Please join on time ⏰</p>
    `,
    "Booking Approved"
  );

  return booking;
};

/* ---------------- REJECT BOOKING ---------------- */
const rejectBooking = async (id: string) => {
  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: { status: "REJECTED" },
  });

  /* 📩 EMAIL → USER */
  await emailSender(
    booking.userEmail,
    `
      <h3>Booking Rejected ❌</h3>
      <p>Sorry, your booking request was not approved.</p>
    `,
    "Booking Rejected"
  );

  return booking;
};

/* ---------------- RESCHEDULE BOOKING ---------------- */
const rescheduleBooking = async (id: string, payload: any) => {
  const conflict = await checkConflict(payload.slotStart, payload.slotEnd);

  if (conflict) throw new Error("Slot already booked");

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      slotStart: new Date(payload.slotStart),
      slotEnd: new Date(payload.slotEnd),
      status: "RESCHEDULED",
    },
  });

  /* 📩 EMAIL → USER */
  await emailSender(
    booking.userEmail,
    `
      <h2>Meeting Rescheduled 🔁</h2>

      <p>Your meeting time has been updated.</p>

      <p><b>New Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>

      <p><b>Join Link:</b> ${booking.meetingLink || getMeetLink()}</p>
    `,
    "Meeting Rescheduled"
  );

  return booking;
};

/* ---------------- READ ---------------- */
const getAllBookings = async () => prisma.booking.findMany();

const getSingleBooking = async (id: string) =>
  prisma.booking.findUnique({ where: { id: Number(id) } });

/* ---------------- DELETE ---------------- */
const deleteBooking = async (id: string) =>
  prisma.booking.delete({ where: { id: Number(id) } });

export const BookingService = {
  createBooking,
  approveBooking,
  rejectBooking,
  rescheduleBooking,
  getAllBookings,
  getSingleBooking,
  deleteBooking,
};