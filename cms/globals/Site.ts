import type { GlobalConfig } from 'payload/types';
import { t } from '../i18n';

export const Site: GlobalConfig = {
  slug: 'site',
  access: {
    read: (): boolean => true,
  },
  admin: {
    group: t('Site'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      label: t('Address'),
      type: 'richText',
    },
    {
      name: 'logo',
      label: t('Logo'),
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Site;
