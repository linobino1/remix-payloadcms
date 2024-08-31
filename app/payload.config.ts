import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  collections: [
    {
      slug: "users",
      auth: true,
      fields: [],
    },
    {
      slug: "test",
      fields: [],
    },
  ],
  secret: process.env.PAYLOAD_SECRET ?? "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
