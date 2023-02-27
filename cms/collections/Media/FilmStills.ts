import type { CollectionConfig } from 'payload/types';
import { staticDir, staticURL } from '.';
import { t } from '../../i18n';

export const FilmStills: CollectionConfig = {
  slug: 'filmStills',
  labels: {
    singular: t('Film Still'),
    plural: t('Film Stills'),
  },
  access: {
    read: (): boolean => true, // Everyone can read Media
  },
  upload: {
    adminThumbnail: 'default',
    staticDir: `${staticDir}/filmstills`,
    staticURL: `${staticURL}/filmstills`,
    imageSizes: [
      {
        name: '320w',
        width: 320,
        height: 160,
      },
      {
        name: '768w',
        width: 768,
        height: 384,
      },
      {
        name: '1024w',
        width: 1024,
        height: 512,
      },
      {
        name: '1920w',
        width: 1920,
        height: 960,
      },
      {
        name: '2560w',
        width: 2560,
        height: 1280,
      },
      {
        name: '380x280',
        width: 380,
        height: 280,
      }
    ],
  },
  fields: [],
};

export default FilmStills;
