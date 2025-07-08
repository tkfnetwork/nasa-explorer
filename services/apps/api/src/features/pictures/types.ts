import type { DataResponse } from '../../types';

export type Image = {
  large: string;
  small: string;
};

export type PicturesTodayResponse = DataResponse<Image>;
