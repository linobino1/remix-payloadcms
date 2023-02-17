import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { ActionArgs, ActionFunction } from "@remix-run/server-runtime";

export const action: ActionFunction = async ({ context: { res }}: ActionArgs) => {
  res.clearCookie('payload-token');
  return null;
}

export const loader = ({ context: { user, res }}: LoaderArgs) => {
  if (!user) {
    res.redirect('/auth/login');
  }
  return json({
    user,
  });
}

export default function Me() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;

  return user && (
    <>
      <p>Signed in as {user?.name}</p>
      <Form method="post">
        <button type="submit">sign out</button>
      </Form>
    </>
  );
}