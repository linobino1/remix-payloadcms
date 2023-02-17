import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";

export const loader = ({ context: { user }}: LoaderArgs) => {
  return json({
    user,
  });
}

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const { user } = data;

  return (
    <>
      <div>
        <nav>
          { user ? (
            <>
              {user?.email}<br />
              <Form method="post">
                <button type="submit">log out</button>
              </Form>
            </>
          ) : (
            <Link to="/auth/login">login</Link>
          )}
        </nav>
        <Outlet />
      </div>
    </>
  );
}