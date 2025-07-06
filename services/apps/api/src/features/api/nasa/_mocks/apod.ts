import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { ApodResponse } from '../types';

export const apodResponseFactory = Factory.Sync.makeFactory<ApodResponse>({
  copyright: faker.lorem.sentence(),
  date: faker.date.recent().toISOString(),
  explanation: faker.lorem.sentence(),
  hdurl: faker.image.url(),
  media_type: 'image',
  service_version: faker.string.numeric(),
  title: faker.internet.username(),
  url: faker.internet.url(),
});
