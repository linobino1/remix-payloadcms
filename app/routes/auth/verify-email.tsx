import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ request, context: { payload }}: LoaderArgs) => {
  const url = new URL(request.url);
  try {
    payload.verifyEmail({
      collection: 'users',
      token: url.searchParams.get('token') ?? '',
    });
  } catch (err) {
    return json({
      success: false,
      message: 'your email address could not be verified',
    });
  }
  
  return json({
    success: true,
    message: 'your email address has been verified!',
  });
}

export default function VerifyEmail() {
  const data = useLoaderData<typeof loader>();

  return (
    <h1>{data.message}</h1>
  )
}