import type { CollectionConfig } from 'payload/types';
import { t } from '../i18n';

export enum RolesEnum {
  admin = 'admin',
  moderator = 'moderator',
  insider = 'insider',
}

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: t('User'),
    plural: t('Users'),
  },
  auth: {
    cookies: {
      sameSite: 'strict',
      secure: false,
    },
  },
  admin: {
    group: t('Site'),
    useAsTitle: 'name',
    defaultColumns: ['name', 'role'],
  },
  access: {
    read: () => true,
  },
  fields: [
    // Email added by default
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
    },
    {
      name: 'role',
      label: t('Role'),
      type: 'select',
      options: [
        {
          label: t('Admin'),
          value: RolesEnum.admin,
        },
        {
          label: t('Moderator'),
          value: RolesEnum.moderator,
        },
        {
          label: t('Insider'),
          value: RolesEnum.insider,
        },
      ],
    },
  ],
  timestamps: true,
};

export default Users;
