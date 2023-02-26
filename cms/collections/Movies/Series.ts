import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Series: CollectionConfig = {
  slug: 'series',
  labels: {
    singular: t('Film Serie'),
    plural: t('Film Series'),
  },
  admin: {
    group: t('Movies'),
    defaultColumns: ['title'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'movies',
      label: t('Movies'),
      type: 'relationship',
      relationTo: 'movies',
      hasMany: true,
      required: true,
    },
  ],
};

export default Series;
