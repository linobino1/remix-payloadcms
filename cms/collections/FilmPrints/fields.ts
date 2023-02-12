import type { Field } from 'payload/types';
import { t } from '../../i18n';

function analogueDigitalTypeField(name: string): Field {
  return {
    name,
    label: t('Type'),
    type: 'radio',
    defaultValue: 'analogue',
    options: [
      {
        label: t('analogue'),
        value: 'analogue',
      },
      {
        label: t('digital'),
        value: 'digital',
      },
    ],
  };
}

export default analogueDigitalTypeField;
