/**
 * Get the current environments raw environment variables
 * This is abstracted away so as to allow easy swapping out
 * should env vars come from somewhere else e.g. import.meta.env
 */
export const getEnv = () => process.env;
