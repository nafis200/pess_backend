import { createClient } from "@supabase/supabase-js";
import config from "../config";

const supabase = createClient(
  config.supabase.url as string,
  config.supabase.key as string
);

export const uploadPdfToSupabase = async (file: any) => {
  if (!file) {
    throw new Error("PDF file missing");
  }

  if (file.mimetype !== "application/pdf") {
    throw new Error("Only PDF allowed");
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("pdfs")
    .upload(fileName, file.data, {
      contentType: "application/pdf",
    });

  if (error) {
    throw new Error(error.message);
  }

  const pdfUrl = `${config.supabase.url}/storage/v1/object/public/pdfs/${fileName}`;

  return pdfUrl;
};