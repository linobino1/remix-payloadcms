import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Languages: CollectionConfig = {
  slug: 'languages',
  labels: {
    singular: t('Language'),
    plural: t('Languages'),
  },
  admin: {
    group: t('Movies'),
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Languages;
