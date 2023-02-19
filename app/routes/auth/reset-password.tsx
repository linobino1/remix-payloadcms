import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

export const action = async ({ request, context: { payload }}: ActionArgs) => {
  const url = new URL(request.url);
  const form = await request.formData();
  try {
    payload.resetPassword({
      collection: 'users',
      overrideAccess: true,
      data: {
        password: form.get('password') as string,
        token: url.searchParams.get('token') ?? '',
      }
    });
  } catch (err) {
    return json({
      success: false,
    });
  }
  
  return json({
    success: true,
  });
}

export default function VerifyEmail() {
  const data = useActionData<typeof action>();

  return data?.success ? (
    <>
      <h1>you have changed your password succesfully!</h1>
      <Link to="/auth/signin">sign in</Link>
    </>
  ) : (
    <Form method="post">
      <label htmlFor="password">your new password</label>
      <input type="password" name="password" />

      <button type="submit">submit</button>
    </Form>
  );
}