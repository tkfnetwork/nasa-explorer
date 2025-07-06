import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker';

import type { NeoObjectBase } from '../..';

export const neoObjectBaseFactory = Factory.Sync.makeFactory<NeoObjectBase>({
  absolute_magnitude_h: faker.number.int(),
  close_approach_data: [],
  estimated_diameter: {
    feet: {
      estimated_diameter_max: faker.number.int(),
      estimated_diameter_min: faker.number.int(),
    },
    kilometers: {
      estimated_diameter_max: faker.number.int(),
      estimated_diameter_min: faker.number.int(),
    },
    meters: {
      estimated_diameter_max: faker.number.int(),
      estimated_diameter_min: faker.number.int(),
    },
    miles: {
      estimated_diameter_max: faker.number.int(),
      estimated_diameter_min: faker.number.int(),
    },
  },
  id: faker.string.alphanumeric(),
  is_potentially_hazardous_asteroid: faker.datatype.boolean(),
  is_sentry_object: faker.datatype.boolean(),
  links: {
    self: faker.internet.url(),
  },
  name: faker.internet.displayName(),
  nasa_jpl_url: faker.internet.url(),
  neo_reference_id: faker.string.alphanumeric(),
});
