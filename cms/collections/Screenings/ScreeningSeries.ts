import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const ScreeningSeries: CollectionConfig = {
  slug: 'screeningSeries',
  labels: {
    singular: t('Screening Series'),
    plural: t('Screening Series'),
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

export default ScreeningSeries;
