import { CONFIG } from "@/utils/config";
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const R2_CLIENT = new S3Client({
  region: "auto",
  endpoint: CONFIG.R2_ENDPOINT,
  credentials: {
    accessKeyId: CONFIG.R2_ACCESS_KEY_ID!,
    secretAccessKey: CONFIG.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadToStorage(
  buffer: Buffer,
  key: string,
  contentType: string,
  bucket: string = "Recordings"
) {
  try {
    await R2_CLIENT.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: contentType,
      })
    );

    return key;
  } catch (error) {
    console.error("Storage upload error:", error);
    throw new Error("Failed to upload file");
  }
}

export async function getFromStorage(
  key: string,
  bucket: string = "Recordings"
) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    const signedUrl = await getSignedUrl(R2_CLIENT, command, {
      expiresIn: 3600,
    });

    return signedUrl;
  } catch (error) {
    console.error("Storage get error:", error);
  }
}
