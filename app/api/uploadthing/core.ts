import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  artworkUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 6 } })
    .middleware(async () => {
      return { uploadedBy: "demo-user" };
    })
    .onUploadComplete(async ({ file, metadata }) => {
      return {
        url: file.url,
        uploadedBy: metadata.uploadedBy,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

