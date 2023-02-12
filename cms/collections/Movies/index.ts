import type { CollectionConfig } from 'payload/types';
import { t, _t } from '../../i18n';
import { slugField } from '../../util/slugField';

const Movies: CollectionConfig = {
  slug: 'movies',
  labels: {
    singular: t('Movie'),
    plural: t('Movies'),
  },
  admin: {
    group: t('Movies'),
    defaultColumns: ['originalTitle', 'directors', 'publicationDate'],
    useAsTitle: 'originalTitle',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'originalTitle',
      label: t('Original Title'),
      type: 'text',
      required: true,
    },
    slugField('originalTitle'),
    {
      name: 'titleDE',
      label: t('German Title'),
      type: 'text',
      required: true,
    },
    {
      name: 'header',
      label: t('Header Image'),
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: t('AdminExplainHeader'),
      },
    },
    {
      name: 'poster',
      label: t('Poster'),
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: t('AdminExplainPoster'),
      },
    },
    {
      name: 'directors',
      label: t('Director'),
      type: 'relationship',
      relationTo: 'directors',
      hasMany: true,
      required: true,
    },
    {
      name: 'cast',
      label: t('Cast'),
      type: 'relationship',
      relationTo: 'actors',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'country',
      label: t('Country of Production'),
      type: 'relationship',
      relationTo: 'countries',
      hasMany: true,
      required: true,
    },
    {
      name: 'publicationDate',
      label: t('Publication Date'),
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: _t('dateFormatAdmin'),
        },
      },
    },
    {
      name: 'genres',
      label: t('Genre'),
      type: 'relationship',
      relationTo: 'genres',
      hasMany: true,
    },
    {
      name: 'synopsis',
      label: t('Synopsis'),
      type: 'textarea',
      maxLength: 350,
      admin: {
        description: t('AdminExplainSynopsis'),
      },
      required: true,
    },
    {
      name: 'info',
      label: t('More Info'),
      type: 'richText',
      admin: {
        description: t('AdminExplainMoreInfo'),
      },
      required: true,
    },
    // {
    //   name: 'mediaUrl',
    //   type: 'text',
    //   access: {
    //     // create: ({ req: { user } }) => { ... },
    //     read: ({ req: { user } }) => true,
    //     // update: ({ req: { user } }) => { ... },
    //     // delete: ({ req: { user } }) => { ... },
    //     // admin: ({ req: { user } }) => { ... },
    //   },
    // },
  ],
};

export default Movies;
