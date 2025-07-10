import type { NearEarthObject } from '@/api/generated';
import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

export const neoFactory = Factory.Sync.makeFactory<NearEarthObject>({
  id: Factory.each(() => faker.string.numeric()),
  absolute_magnitude_h: faker.number.int(),
  close_approach_data: [
    {
      close_approach_date: faker.date.past().toISOString(),
      close_approach_date_full: faker.date.past().toISOString(),
      epoch_date_close_approach: faker.date.past().getTime(),
      miss_distance: {
        astronomical: faker.string.numeric(),
        kilometers: faker.string.numeric(),
        lunar: faker.string.numeric(),
        miles: faker.string.numeric(),
      },
      orbiting_body: 'earth',
      relative_velocity: {
        kilometers_per_hour: faker.string.numeric(),
        kilometers_per_second: faker.string.numeric(),
        miles_per_hour: faker.string.numeric(),
      },
    },
  ],
});
