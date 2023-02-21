import type { Media } from "payload/generated-types";


export const mediaUrl = (image: Media): string => (
  `http://localhost:3000/media/${image.filename}`
);
