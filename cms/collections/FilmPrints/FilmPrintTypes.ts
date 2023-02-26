import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const FilmPrintTypes: CollectionConfig = {
  slug: 'types',
  labels: {
    singular: t('Filmprint Type'),
    plural: t('Filmprint Types'),
  },
  admin: {
    group: t('Film Prints'),
    defaultColumns: ['name'],
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: t('name'),
      type: 'text',
      localized: true,
      required: true,
      unique: true,
    },
  ],
};

export default FilmPrintTypes;
