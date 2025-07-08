import { createContext, useContext } from 'react';
import type { AsteroidsPageContextValues } from './AsteroidsPage.types';

export const AsteroidsPageContext = createContext<
  AsteroidsPageContextValues | undefined
>(undefined);

export const AsteroidsPageProvider = AsteroidsPageContext.Provider;

export const useAsteroidsContext = (): AsteroidsPageContextValues => {
  const context = useContext(AsteroidsPageContext);

  if (!context) {
    throw new Error("'AsteroidsPageProvider' missing");
  }

  return context;
};
