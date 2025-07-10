/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
import '@tanstack/react-router';

declare module 'astronomia';

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption {
    fullScreen?: boolean;
  }
}
