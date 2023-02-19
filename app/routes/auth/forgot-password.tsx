import { Form, useActionData } from "@remix-run/react";
import type { ActionArgs} from "@remix-run/node";
import { fetch } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action = async ({ request }: ActionArgs ) => {
  const form = await request.formData();
  
  const res = await fetch(`http://localhost:3000/api/users/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: form.get('email'),
    }),
  })
  const data = await res.json();
  if (data) {
    return json({
      success: true,
      message: 'please check your email',
    });
  } else {
    return json({
      success: false,
      message: 'could not reset password, double check email address',
    });
  }
  
  // somehow, local API doesn't work here...
  // try {
  //   const token = await payload.forgotPassword({
  //     collection: 'users',
  //     data: {
  //       email: form.get('email') as string,
  //     },
  //   });
  //   console.log(token);
  //   return json({
  //     success: true,
  //     error: null,
  //   });
  // } catch (err) {
  //   console.log(err)
  //   return json({
  //     success: false,
  //     error: 'email invalid',
  //   });
  // }
}

export default function ForgotPassword() {
  const data = useActionData<typeof action>();
  return (
    <div>
      <h1>Password Reset</h1>
      { data && (
        <p>{data.message}</p>
      )}
      { !data?.success && (
        <Form method="post">
          { data && ('error' in data) && (
            <p>{data.error as string}</p>
          )}
          <label htmlFor="email">email</label>
          <input type="email" name="email" />
          
          <button type="submit">submit</button>
        </Form>
      )}
    </div>
  )
}