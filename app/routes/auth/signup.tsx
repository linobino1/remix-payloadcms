import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { RolesEnum } from "cms/collections/Users";

export const action = async ({ request, context: { payload }}: ActionArgs ) => {
  const form = await request.formData();
  
  // create user
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: form.get('email') as string,
        name: form.get('name') as string,
        role: RolesEnum.insider,
        password: form.get('password') as string,
      },
    });
  } catch (err) {
    return json({
      success: false,
      error: 'could not create account, maybe you are already registered?',
    });
  }
  
  return json({
    success: true,
  });
}

export default function SignUp() {
  const data = useActionData<typeof action>();
  return (
    <div>
      <h1>Sign Up</h1>
      { data?.success ? (
        <p>you should receive an email soon</p>
      ) : (
        <>
          { data && ('error' in data) && (
            <p>{data.error as string}</p>
          )}
          <Form method="post">
            <label htmlFor="name">name</label>
            <input type="name" name="name" />

            <label htmlFor="email">email</label>
            <input type="email" name="email" />

            <label htmlFor="password">password</label>
            <input type="password" name="password" />

            <button type="submit">submit</button>
          </Form>
        </>
      )}
    </div>
  );
}