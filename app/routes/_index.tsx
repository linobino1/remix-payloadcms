import type { MetaFunction } from "@remix-run/node";
import { getPayload } from "payload";
import config from "@payload-config";
import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  const payload = await getPayload({ config });
  await payload.delete({
    collection: "users",
    where: { id: { exists: true } },
  });

  await payload.create({
    collection: "users",
    data: {
      email: `${Math.random().toString().substring(2, 10)}@test.de`,
      password: "123",
    },
  });
  const users = await payload.find({
    collection: "users",
  });
  return {
    users,
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const { users } = useLoaderData<typeof loader>();
  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Welcome to Remix</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
