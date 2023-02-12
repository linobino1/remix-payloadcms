import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';
import analogueDigitalTypeField from './fields';

const Carriers: CollectionConfig = {
  slug: 'carriers',
  labels: {
    singular: t('Film Carrier'),
    plural: t('Film Carriers'),
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
      unique: true,
    },
  ],
};

export default Carriers;
