import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const ScreeningTypes: CollectionConfig = {
  slug: 'screeningTypes',
  labels: {
    singular: t('Screening Type'),
    plural: t('Screening Types'),
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

export default ScreeningTypes;
