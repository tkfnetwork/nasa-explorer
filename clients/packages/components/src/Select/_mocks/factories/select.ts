import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';

import type { SelectItem } from '../../Select.types';

export const selectValueFactory = Factory.Sync.makeFactory<SelectItem>({
  label: Factory.each(() => faker.animal.dog()),
  value: Factory.each(() => faker.string.uuid()),
});
