import type { TooltipProps } from './Tooltip.types';

import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip as BaseTooltip,
} from '@/_shadcn/components/ui/tooltip';

export const Tooltip = ({ children }: TooltipProps) => (
  <TooltipProvider>
    <BaseTooltip>{children}</BaseTooltip>
  </TooltipProvider>
);

export { TooltipContent, TooltipTrigger };
