import type { CollectionConfig } from 'payload/types';
import { t, _t } from '../../i18n';
import { slugField } from '../../util/slugField';

const Screenings: CollectionConfig = {
  slug: 'screenings',
  labels: {
    singular: t('Screening'),
    plural: t('Screenings'),
  },
  admin: {
    group: t('Screenings'),
    defaultColumns: ['date', 'time', 'title', '_status'],
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'type',
      label: t('Screening Type'),
      type: 'relationship',
      relationTo: 'screeningTypes',
    },
    {
      name: 'location',
      label: t('Location'),
      type: 'relationship',
      relationTo: 'locations',
    },
    {
      name: 'internal',
      label: t('Internal screening'),
      type: 'checkbox',
      defaultValue: () => false,
    },
    {
      name: 'series',
      label: t('Screening Series'),
      type: 'relationship',
      relationTo: 'screeningSeries',
    },
    {
      name: 'filmprint',
      label: t('Film Print'),
      type: 'relationship',
      relationTo: 'filmPrints',
    },
    {
      name: 'title',
      label: t('Title'),
      type: 'text',
    },
    {
      name: 'subtitle',
      label: t('Subtitle'),
      type: 'text',
    },
    slugField('title'),
    {
      name: 'date',
      label: t('Date'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'time',
      label: t('Time'),
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: _t('timeFormatAdmin'),
          timeFormat: _t('timeFormatAdmin'),
        },
      },
    },
    {
      name: 'moderator',
      label: t('Moderator'),
      type: 'text',
      required: false,
    },
    {
      name: 'guest',
      label: t('Guest'),
      type: 'text',
      required: false,
    },
  ],
};

export default Screenings;
