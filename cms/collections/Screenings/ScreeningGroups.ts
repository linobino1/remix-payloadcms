import { slugField } from '../../util/slugField';
import type { CollectionConfig } from 'payload/types';
import { t } from '../../i18n';

const ScreeningGroups: CollectionConfig = {
  slug: 'screeningGroups',
  labels: {
    singular: t('Group'),
    plural: t('Groups'),
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
      name: 'name',
      label: t('Name'),
      type: 'text',
      localized: true,
      required: true,
    },
    slugField('name'),
  ],
};

export default ScreeningGroups;
