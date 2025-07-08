export const measureElementFirefoxFix = <E extends Element>() =>
  typeof window !== 'undefined' && !navigator.userAgent.includes('Firefox')
    ? (element: E) => element?.getBoundingClientRect().height
    : undefined;
