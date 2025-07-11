import { useTranslation } from '@ne/i18n/react';
import { ErrorComponent } from '../ErrorComponent';

export const NotFoundError = () => {
  const { t } = useTranslation(['common']);

  return (
    <ErrorComponent
      error={new Error(t('common:pageNotFound'))}
      reset={() => window.history.back()}
      resetLabel={t('common:goBack')}
      showMessage
    />
  );
};
