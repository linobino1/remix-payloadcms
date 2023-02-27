import type { CollectionConfig } from 'payload/types';
import { staticDir, staticURL } from '.';
import { t } from '../../i18n';

export const Posters: CollectionConfig = {
  slug: 'posters',
  labels: {
    singular: t('Poster'),
    plural: t('Posters'),
  },
  access: {
    read: (): boolean => true, // Everyone can read Media
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  upload: {
    adminThumbnail: 'default',
    staticDir: `${staticDir}/posters`,
    staticURL: `${staticURL}/posters`,
    mimeTypes: [
      'image/jpeg',
      'image/png',
    ],
    imageSizes: [
      {
        name: 'small',
        width: 120,
        height: 180,
      },
      {
        name: 'default',
        width: 260,
        height: 390,
      },
    ],
  },
  fields: [],
};

export default Posters;
