export const BEFORE_GET_VIDEOS = 'BEFORE_GET_VIDEOS';
export const ON_GET_VIDEOS = 'ON_GET_VIDEOS';
export const AFTER_GET_VIDEOS_ERROR = 'AFTER_GET_VIDEOS_ERROR';

export type Actions =
  | typeof BEFORE_GET_VIDEOS
  | typeof ON_GET_VIDEOS
  | typeof AFTER_GET_VIDEOS_ERROR;
