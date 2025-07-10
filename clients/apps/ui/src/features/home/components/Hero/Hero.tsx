import { FaCompass } from 'react-icons/fa';
import { useTodaysPictureQuery } from '../../queries';
import { cn } from '@ne/components';
import { layerStyles } from './Hero.styles';
import styles from './Hero.module.css';
import { useToggle } from '@react-hookz/web';

export const Hero = () => {
  const [isLoadingImage, toggleImageLoaded] = useToggle(true);
  const { data, isLoading: isLoadingData } = useTodaysPictureQuery();

  const isLoading = isLoadingData || isLoadingImage;

  return (
    <div
      className={cn(
        'relative',
        'w-[50%]',
        'h-[50%]',
        'aspect-square',
        styles.base
      )}
    >
      <div className={cn('relative', 'flex-1', layerStyles, styles.layer)}>
        {!isLoadingData && data?.data?.small ? (
          <img
            fetchPriority="high"
            alt="Hero"
            className={cn(
              'opacity-0',
              !isLoading && 'opacity-100',
              'transition',
              'object-cover',
              'h-full',
              'w-auto'
            )}
            width="auto"
            height="100%"
            src={data?.data?.small}
            onLoad={() => toggleImageLoaded()}
          />
        ) : null}
        <div
          className={cn(
            'absolute',
            'inset-0',
            'pointer-events-none',
            'flex',
            'items-center',
            'justify-center'
          )}
        >
          <FaCompass className={cn('text-8xl', isLoading && styles.loading)} />
        </div>
      </div>
      <div className={cn(layerStyles, styles.layer)}>
        <span />
      </div>
      <div className={cn(layerStyles, styles.layer)}>
        <span />
      </div>
    </div>
  );
};
