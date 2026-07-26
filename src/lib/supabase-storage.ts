import { supabase } from "./supabase";

// ============================================================================
// SUPABASE STORAGE HELPERS
// Manages room images and gallery photos in Supabase Storage
//
// Buckets to create in Supabase Dashboard:
// 1. "room-images" - for room photos (public)
// 2. "gallery" - for gallery photos (public)
// ============================================================================

const ROOM_IMAGES_BUCKET = "room-images";
const GALLERY_BUCKET = "gallery";

// Upload a room image
export async function uploadRoomImage(
  roomType: string,
  file: File,
  fileName?: string
) {
  const name = fileName || `${Date.now()}-${file.name}`;
  const path = `${roomType}/${name}`;

  const { data, error } = await supabase.storage
    .from(ROOM_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from(ROOM_IMAGES_BUCKET)
    .getPublicUrl(data.path);

  return { url: urlData.publicUrl, error: null };
}

// Get all images for a room
export async function getRoomImages(roomType: string) {
  const { data, error } = await supabase.storage
    .from(ROOM_IMAGES_BUCKET)
    .list(roomType, { sortBy: { column: "name", order: "asc" } });

  if (error) return [];

  return data.map((file) => {
    const { data: urlData } = supabase.storage
      .from(ROOM_IMAGES_BUCKET)
      .getPublicUrl(`${roomType}/${file.name}`);
    return {
      name: file.name,
      url: urlData.publicUrl,
      size: file.metadata?.size || 0,
    };
  });
}

// Delete a room image
export async function deleteRoomImage(roomType: string, fileName: string) {
  const { error } = await supabase.storage
    .from(ROOM_IMAGES_BUCKET)
    .remove([`${roomType}/${fileName}`]);

  return { error: error?.message || null };
}

// Upload a gallery image
export async function uploadGalleryImage(file: File, fileName?: string) {
  const name = fileName || `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .upload(name, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return { url: null, error: error.message };
  }

  const { data: urlData } = supabase.storage
    .from(GALLERY_BUCKET)
    .getPublicUrl(data.path);

  return { url: urlData.publicUrl, error: null };
}

// Get all gallery images
export async function getGalleryImages() {
  const { data, error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .list("", { sortBy: { column: "name", order: "asc" } });

  if (error) return [];

  return data
    .filter((file) => !file.name.startsWith("."))
    .map((file) => {
      const { data: urlData } = supabase.storage
        .from(GALLERY_BUCKET)
        .getPublicUrl(file.name);
      return {
        name: file.name,
        url: urlData.publicUrl,
        size: file.metadata?.size || 0,
      };
    });
}

// Delete a gallery image
export async function deleteGalleryImage(fileName: string) {
  const { error } = await supabase.storage
    .from(GALLERY_BUCKET)
    .remove([fileName]);

  return { error: error?.message || null };
}
