import imageCompression from "browser-image-compression"

export async function processImage(file) {
  const options = {
    maxSizeMB: 1,              // compress to ~1MB
    maxWidthOrHeight: 1200,    // resize
    useWebWorker: true,
    fileType: "image/jpeg",    // force JPEG
    initialQuality: 0.7
  }

  const compressedFile = await imageCompression(file, options)

  return compressedFile
}