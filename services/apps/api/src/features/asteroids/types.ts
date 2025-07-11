import type z from 'zod';

import type { DataResponse } from '../../types';
import type { NeoObjectBase, NeoOrbitalData } from '../api';
import type { getAllQueryValidation } from './validation';

export type GetAllQuery = z.infer<typeof getAllQueryValidation>;

export type GetAllResponse = DataResponse<
  Record<string, Omit<NeoObjectBase, 'links'>[]>
>;

export type WsPositionsResposne = Record<string, NeoOrbitalData>;
