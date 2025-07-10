import { useMatches } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Meta = () => {
  const matches = useMatches();

  /**
   * Needed as a stop gap for tanstack start
   *
   * @see https://github.com/TanStack/router/discussions/1056
   */
  useEffect(() => {
    document.title = matches
      .toReversed()
      .map((match) => match?.meta?.find((item) => item?.title)?.title)
      .filter(Boolean)
      .join(' • ');
  }, [matches]);

  return null;
};
