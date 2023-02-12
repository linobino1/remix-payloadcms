import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const Locations: CollectionConfig = {
  slug: 'locations',
  labels: {
    singular: t('Location'),
    plural: t('Locations'),
  },
  admin: {
    group: t('Screenings'),
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
    },
  ],
};

export default Locations;
