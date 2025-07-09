import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const particleFactory = Factory.Sync.makeFactory({
  lat: Factory.each(() => faker.location.latitude()),
  lng: Factory.each(() => faker.location.longitude()),
  alt: Factory.each(() => faker.number.int({ max: 1.5, min: 0.5 })),
  color: Factory.each(() =>
    faker.helpers.arrayElement(['blue', 'green', 'red', 'orange'])
  ),
  size: Factory.each(() => faker.number.int({ max: 15, min: 5 })),
  name: Factory.each(() => faker.internet.username()),
});
