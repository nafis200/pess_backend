import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
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
      status: { in: ["PENDING", "APPROVED", "RESCHEDULED"] },
      OR: [{ slotStart: { lt: end }, slotEnd: { gt: start } }],
    },
  });
};

const createBooking = async (payload: any) => {
  const conflict = await checkConflict(payload.slotStart, payload.slotEnd);

  if (conflict) throw new ApiError(404,"Slot already booked");

  const booking = await prisma.booking.create({
    data: {
      userEmail: payload.userEmail,
      subject: payload.subject,
      description: payload.description,
      slotStart: new Date(payload.slotStart),
      slotEnd: new Date(payload.slotEnd),
    },
  });

  await emailSender(
    ADMIN_EMAIL,
    `
      <h2>New Booking Request 📩</h2>
      <p><b>Email:</b> ${booking.userEmail}</p>
      <p><b>Subject:</b> ${booking.subject}</p>
      <p><b>Description:</b> ${booking.description || "No description"}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
    `,
    "New Booking Request",
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

  await emailSender(
    booking.userEmail,
    `
      <h2>Booking Approved 🎉</h2>
      <p>Your meeting is confirmed.</p>
      <p><b>Join Link:</b> ${meetLink}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
    `,
    "Booking Approved",
  );

  await emailSender(
    ADMIN_EMAIL,
    `
      <h2>Booking Approved ✔</h2>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Meet Link:</b> ${meetLink}</p>
    `,
    "Booking Approved - Admin",
  );

  return booking;
};

const rejectBooking = async (id: string) => {
  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: { status: "REJECTED" },
  });

  await emailSender(
    booking.userEmail,
    `
      <h3>Booking Rejected ❌</h3>
      <p>Sorry, your booking request was not approved.</p>
    `,
    "Booking Rejected",
  );

  await emailSender(
    ADMIN_EMAIL,
    `
      <h3>Booking Rejected ❌</h3>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>Status:</b> REJECTED</p>
    `,
    "Booking Rejected - Admin",
  );

  return booking;
};

const rescheduleBooking = async (id: string, payload: any) => {
  const conflict = await checkConflict(payload.slotStart, payload.slotEnd);

  if (conflict) throw new Error("Slot already booked");

  const existing = await prisma.booking.findUnique({
    where: { id: Number(id) },
  });

  const meetLink = existing?.meetingLink || getMeetLink();

  const booking = await prisma.booking.update({
    where: { id: Number(id) },
    data: {
      slotStart: new Date(payload.slotStart),
      slotEnd: new Date(payload.slotEnd),
      status: "RESCHEDULED",
      meetingLink: meetLink,
    },
  });

  await emailSender(
    booking.userEmail,
    `
      <h2>Meeting Rescheduled 🔁</h2>
      <p><b>New Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Join Link:</b> ${meetLink}</p>
    `,
    "Meeting Rescheduled",
  );

  await emailSender(
    ADMIN_EMAIL,
    `
      <h2>Meeting Rescheduled 🔁</h2>
      <p><b>User:</b> ${booking.userEmail}</p>
      <p><b>New Time:</b> ${booking.slotStart} - ${booking.slotEnd}</p>
      <p><b>Meet Link:</b> ${meetLink}</p>
    `,
    "Rescheduled Booking - Admin",
  );

  return booking;
};

const getAllBookings = async (query: { 
  email?: string, 
  page?: string, 
  limit?: string 
}) => {
  const { email, page = "1", limit = "10" } = query;
  
  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

 
  const where: any = {};
  if (email) {
    where.userEmail = {
      contains: email, 
      mode: 'insensitive'
    };
  }

  const [data, total] = await Promise.all([
    prisma.booking.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.booking.count({ where })
  ]);

  return {
    meta: {
      page: Number(page),
      limit: take,
      total
    },
    data
  };
};

const getSingleBooking = async (email: string) =>
  prisma.booking.findMany({
    where: { userEmail: email },
  });

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
