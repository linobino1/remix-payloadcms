import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Countries: CollectionConfig = {
  slug: 'countries',
  labels: {
    singular: t('Country'),
    plural: t('Countries'),
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

export default Countries;
