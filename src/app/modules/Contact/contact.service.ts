import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status-codes";

const CONTACT_TYPES = ["phone", "email", "address", "hours"] as const;

interface ContactInfoPayload {
  type: string;
  label?: string;
  value: string;
  order?: number;
}

const validateType = (type: string) => {
  if (!CONTACT_TYPES.includes(type as (typeof CONTACT_TYPES)[number])) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Invalid type. Must be one of: ${CONTACT_TYPES.join(", ")}`,
    );
  }
};

const getAllContactInfo = async () => {
  return await prisma.contactInfo.findMany({
    orderBy: [{ type: "asc" }, { order: "asc" }],
  });
};

const createContactInfo = async (payload: ContactInfoPayload) => {
  validateType(payload.type);

  return await prisma.contactInfo.create({
    data: {
      type: payload.type,
      label: payload.label,
      value: payload.value,
      order: payload.order ?? 0,
    },
  });
};

const updateContactInfo = async (id: number, payload: Partial<ContactInfoPayload>) => {
  const existing = await prisma.contactInfo.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Contact info not found");
  }

  if (payload.type) {
    validateType(payload.type);
  }

  return await prisma.contactInfo.update({
    where: { id },
    data: {
      type: payload.type,
      label: payload.label,
      value: payload.value,
      order: payload.order,
    },
  });
};

const deleteContactInfo = async (id: number) => {
  const existing = await prisma.contactInfo.findUnique({ where: { id } });

  if (!existing) {
    throw new ApiError(httpStatus.NOT_FOUND, "Contact info not found");
  }

  await prisma.contactInfo.delete({ where: { id } });
  return null;
};

export const ContactServices = {
  getAllContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
};