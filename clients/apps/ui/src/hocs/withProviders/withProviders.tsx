import { type ComponentProps, type ComponentType } from 'react';

import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

export const withProviders = <C extends ComponentType<any>>(Component: C) => {
  const queryClient = new QueryClient();
  const persister = createAsyncStoragePersister({
    storage: window.localStorage,
  });

  const DecoratedComponent = (props: ComponentProps<C>) => (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <Component {...props} />
    </PersistQueryClientProvider>
  );

  DecoratedComponent.displayName = `WithProviders(${Component.displayName ?? 'Component'})`;

  return DecoratedComponent;
};
