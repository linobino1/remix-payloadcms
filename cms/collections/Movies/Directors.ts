import { slugField } from '../../util/slugField';
import type { CollectionConfig } from 'payload/types';
import { t, _t } from '../../i18n';

const Directors: CollectionConfig = {
  slug: 'directors',
  labels: {
    singular: t('Director'),
    plural: t('Directors'),
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
    },
    slugField('name'),
    {
      name: 'dateOfBirth',
      label: t('Born'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'dateOfDeath',
      label: t('Died'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
  ],
};

export default Directors;
