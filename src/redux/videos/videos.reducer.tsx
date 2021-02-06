import * as types from './videos.types';
import { Payload, State } from './videos.interfaces';

export const initialState: State = {
  isLoading: false,
  data: null,
  error: null,
};

export const reducer = (
  state = initialState,
  { type, payload }: { type: types.Actions; payload: Payload },
): State => {
  switch (type) {
    case types.BEFORE_GET_VIDEOS:
      return {
        ...state,
        isLoading: true,
      };
    case types.ON_GET_VIDEOS:
      return {
        ...state,
        isLoading: false,
        data: payload.videos,
        error: null,
      };
    case types.AFTER_GET_VIDEOS_ERROR:
      return {
        ...state,
        isLoading: false,
        data: [],
        error: payload.error,
      };
    default:
      return state;
  }
};
