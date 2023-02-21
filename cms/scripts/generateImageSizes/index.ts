import payload from "payload";
import path from "path";
import invariant from "tiny-invariant";

require('dotenv').config();

const regenerateMediaSizes = async () => {
  try {
    invariant(process.env.PAYLOAD_SECRET, "PAYLOAD_SECRET is required");
    invariant(process.env.MONGODB_URI, "MONGODB_URI is required");

    await payload.init({
      secret: process.env.PAYLOAD_SECRET,
      mongoURL: process.env.MONGODB_URI,
      local: true,
    });

    const media = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 300,
    });
    await Promise.all(media.docs.map(async (mediaDoc: any) => {
      try {
        const staticDir = path.resolve(__dirname, '../../../media');

        await payload.update({
          collection: 'media',
          id: mediaDoc.id,
          data: mediaDoc,
          filePath: `${staticDir}/${mediaDoc.filename}`,
          overwriteExistingFiles: true,
        });

        console.log(`Media ${mediaDoc.alt || mediaDoc.id} regenerated successfully`);
      } catch (err) {
        console.error(`Media ${mediaDoc.alt || mediaDoc.id} failed to regenerate`);
        console.error(err);
      }
    }));
  } catch (err) {
    console.log('Unable to find documents with payload');
    console.error(err);
    process.exit(0);
  }

  console.log('Media size regeneration completed!');
  process.exit(0);
};

regenerateMediaSizes();