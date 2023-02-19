import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import type { ActionArgs, ActionFunction} from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";

/**
 * sign out user
 */
export const action: ActionFunction = async ({ request, context: { payload, res }}: ActionArgs) => {
  const form = await request.formData();

  switch (form.get('_action')) {
    case 'signOut':
      res.clearCookie('payload-token');
      return redirect('/');
      
    case 'deleteAccount':
      try {
        await payload.delete({
          collection: 'users',
          id: form.get('id') as string,
        });
      } catch (err) {
        return json({
          action: form.get('_action'),
          success: false,
          message: 'could not delete your account',
        });
      }
      return json({
          action: form.get('_action'),
          success: true,
          message: 'your account has been deleted',
      });
  }
}

export const loader = ({ context: { user, res }}: LoaderArgs) => {
  if (!user) {
    res.redirect('/auth/signin');
  }
  return json({
    user,
  });
}

export default function Me() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { user } = loaderData;
  
  return (
    <>
      { actionData?.message && (
        <p>{actionData.message as string}</p>
      )}
      { user ? (
        <Form method="post">
          <input type="hidden" name="id" value={user.id} />
          <button type="submit" name="_action" value="signOut">sign out</button>
          <button type="submit" name="_action" value="deleteAccount">delete my account</button>
        </Form>
      ) : (
        <>
          <Link to="/">home</Link>
          <Link to="/auth/signin">sign in</Link>
        </>
      )}
    </>
  )
}
