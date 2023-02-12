import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Rightholders: CollectionConfig = {
  slug: 'rightholders',
  labels: {
    singular: t('Right Holder'),
    plural: t('Right Holders'),
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
      label: t('Name'),
      type: 'text',
      required: true,
      unique: true,
    },
  ],
};

export default Rightholders;
