import type { CollectionConfig } from 'payload/types';
import { t } from '../i18n';

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: t('Media'),
    plural: t('Media'),
  },
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  upload: {
    adminThumbnail: 'card',
    imageSizes: [
      {
        name: 'card',
        width: 640,
        height: 480,
      },
      {
        name: 'feature',
        width: 1024,
        height: 576,
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      label: 'Alt Text',
      type: 'text',
      required: true,
    },
  ],
};

export default Media;
