import { faker } from '@faker-js/faker';

process.env.NASA_API_BASE_URL = faker.internet.url();
process.env.NASA_API_KEY = faker.string.uuid();

jest.mock('@scalar/express-api-reference', () => ({
  apiReference: jest.fn(() => jest.fn()),
}));
