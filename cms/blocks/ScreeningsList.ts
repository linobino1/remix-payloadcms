import { t } from '../i18n';
import type { Block } from "payload/types";

export const ScreeningsList: Block = {
  slug: 'screeningsList',
  fields: [
    {
      name: 'filters',
      label: t('Filters'),
      type: 'group',
      fields: [
        {
          name: 'group',
          label: t('Group'),
          type: 'relationship',
          relationTo: 'screeningGroups',
          required: false,
        },
        {
          name: 'from',
          label: t('From'),
          type: 'date',
          required: false,
        },
        {
          name: 'until',
          label: t('Until'),
          type: 'date',
          required: false,
        },
      ],
    },
  ],
};

export default ScreeningsList;
