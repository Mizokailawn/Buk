// lib/imageprocessing/uploadImages.js
import { createClient } from "../../supabase/client";

export async function uploadImages(images, submissionId) {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!user) throw new Error("Not authenticated");
  if (!submissionId) throw new Error("Missing upload session");

  const uploadedPaths = [];

  try {
    const uploads = await Promise.all(
      images.map(async (img, index) => {
        const path = `${user.id}/temp/${submissionId}/${index}-${img.id}.jpg`;

        const { error } = await supabase.storage
          .from("vehicle-images")
          .upload(path, img.file, {
            cacheControl: "31536000",
            contentType: "image/jpeg",
            upsert: false,
          });

        if (error) throw error;

        uploadedPaths.push(path);

        const { data } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(path);

        return {
          url: data.publicUrl,
          path,
          order: index,
        };
      }),
    );

    return uploads;
  } catch (error) {
    console.error("Error uploading images: ", error.message);
    if (uploadedPaths.length > 0) {
      await supabase.storage.from("vehicle-images").remove(uploadedPaths);
    }
    throw error;
  }  
}
