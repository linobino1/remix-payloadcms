import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';
import analogueDigitalTypeField from './fields';

const Formats: CollectionConfig = {
  slug: 'formats',
  labels: {
    singular: t('Film Format'),
    plural: t('Film Formats'),
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
    analogueDigitalTypeField('type'),
    {
      name: 'name',
      label: t('Name'),
      type: 'text',
      required: true,
    },
  ],
};

export default Formats;
