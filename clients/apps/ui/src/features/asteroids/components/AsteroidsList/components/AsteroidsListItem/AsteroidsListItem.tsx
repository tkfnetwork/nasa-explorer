import { formatByUnit } from '@/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  cn,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@ne/components';
import { useTranslation } from '@ne/i18n/react';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { PiSealWarningFill } from 'react-icons/pi';
import type { AsteroidsListItemProps } from './AsteroidsListItem.types';
import { labelClasses } from './AsteroidsListItem.styles';
import { useAsteroidsContext } from '../../../AsteroidsPage/AsteroidsPage.context';

export const AsteroidsListItem = ({
  name,
  hazardous,
  date,
  diameter,
  orbiting,
  distance,
  velocity,
  externalUrl,
}: AsteroidsListItemProps) => {
  const { t } = useTranslation(['asteroids', 'common']);

  const { unit } = useAsteroidsContext();

  const distanceFormatter = formatByUnit(unit);
  const speedFormatter = formatByUnit(`${unit}-per-hour`);

  const [diaMin, diaMax] = diameter ?? [];

  const hazardLabel = hazardous ? t('asteroids:hazardous') : null;

  return (
    <Card
      className={cn(
        'brightness-120',
        'hover:brightness-130',
        'transition',
        'duration-200'
      )}
    >
      <CardHeader>
        <CardTitle className={cn('flex', 'justify-between', 'items-center')}>
          {name}
          {hazardLabel ? (
            <Tooltip>
              <TooltipTrigger>
                <PiSealWarningFill
                  aria-label={hazardLabel}
                  className={cn('text-xl', 'text-amber-600')}
                />
              </TooltipTrigger>
              <TooltipContent>{hazardLabel}</TooltipContent>
            </Tooltip>
          ) : null}
        </CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className={cn('flex', 'flex-col', 'gap-2')}>
        <dl>
          <dt className={labelClasses}>{t('asteroids:diameter')}</dt>
          <dd>
            {distanceFormatter(diaMin)}-{distanceFormatter(diaMax)}
          </dd>
        </dl>
        <ul className={cn('flex', 'justify-between', 'flex-wrap')}>
          <li className={cn('flex', 'flex-col')}>
            <span className={labelClasses}>{t('asteroids:orbiting')}</span>
            <span>{orbiting ?? '-'}</span>
          </li>
          <li className={cn('flex', 'flex-col')}>
            <span className={labelClasses}>{t('asteroids:distance')}</span>
            <span>{distanceFormatter(distance)}</span>
          </li>
          <li className={cn('flex', 'flex-col')}>
            <span className={labelClasses}>{t('asteroids:velocity')}</span>
            <span>{speedFormatter(velocity)}</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className={cn('flex', 'justify-end')}>
        {externalUrl ? (
          <a
            target="_blank"
            href={externalUrl}
            className={cn('flex', 'gap-1', 'text-xs')}
          >
            {t('common:learnMore')} <FaExternalLinkAlt />
          </a>
        ) : null}
      </CardFooter>
    </Card>
  );
};
