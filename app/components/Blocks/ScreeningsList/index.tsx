import { ScreeningsListItem } from '~/components/Blocks/ScreeningsList/item';
import { Link } from '@remix-run/react';
import type { Screening } from 'payload/generated-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './index.module.css';

export type Props = {
  blockType: 'screeningsList'
  blockName?: string
  from?: string
  screenings: Screening[]
}

export const ScreeningsList: React.FC<Props> = ({ screenings }) => {
  const { t } = useTranslation(); 

  return screenings?.length ? (
    <div className={classes.list}>
      {screenings.map((screening) => (
        <Link to={`${screening.slug as string}`} key={screening.id}>
          <ScreeningsListItem screening={screening} />
        </Link>
      ))}
    </div>
  ) : (
    <div className={classes.empty}>{t('No upcoming screenings.')}</div>
  );
};

export default ScreeningsList;