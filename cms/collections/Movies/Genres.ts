import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Genres: CollectionConfig = {
  slug: 'genres',
  labels: {
    singular: t('Genre'),
    plural: t('Genres'),
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

export default Genres;
