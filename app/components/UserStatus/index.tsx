import React from 'react';
import { Link, useLoaderData } from '@remix-run/react';
import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useTranslation } from 'react-i18next';
import classes from './index.module.css';

export const loader = ({ context: { user }}: LoaderArgs) => {
  return json({
    user,
  });
}
export const UserStatus: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className={classes.userStatus}>
      { user ? (
        <Link to="/auth/me" className={classes.name}>{user.name}</Link>
      ) : (
        <Link to="/auth/signin" className={classes.signIn}>
          {t('Sign In')}
        </Link>
      )}
    </div>
  );
};
