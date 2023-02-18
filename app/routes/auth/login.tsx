import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs} from "@remix-run/node";
import { json} from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const action = async ({ request, context: { payload, res }}: ActionArgs ) => {
  const form = await request.formData();
  
  try {
    await payload.login({
      collection: 'users',
      data: {
        email: form.get('email') as string,
        password: form.get('password') as string,
      },
      res,
    });
    return redirect('/');
  } catch (err) {
    return json({
      error: 'email/password invalid',
    });
  }
}

export default function Login() {
  const actionData = useActionData<typeof action>();
  return (
    <div>
      <h1>Login</h1>
      <Form method="post">
        { actionData?.error && (
          <p>{actionData.error}</p>
        )}
        <label htmlFor="email">email</label>
        <input type="email" name="email" />

        <label htmlFor="password">password</label>
        <input type="password" name="password" />
        
        <button type="submit">submit</button>
      </Form>
    </div>
  )
}