module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['pnpm prettier', 'pnpm lint'],
  '**/*.{html,json,md,mdx}': ['pnpm prettier'],
  '**/*.{css,scss}': ['pnpm prettier', 'pnpm lint:styles'],
};
