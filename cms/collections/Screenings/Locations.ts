import { slugField } from '../../util/slugField';
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
    useAsTitle: 'name',
    defaultColumns: ['name'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      label: t('Name'),
      localized: true,
      type: 'text',
    },
    slugField('name'),
  ],
};

export default Locations;
