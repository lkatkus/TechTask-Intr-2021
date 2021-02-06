import * as types from './videos.types';

export const initialState = { isLoading: false, data: null, searchParams: null };

export const reducer = (state = initialState, { type, payload }: any): any => {
  switch (type) {
    case types.BEFORE_GET_VIDEOS:
      return {
        ...state,
        isLoading: true,
      };
    case types.ON_GET_VIDEOS:
      return {
        ...state,
        error: null,
        isLoading: false,
        data: payload.videos,
        searchParams: payload.searchParams,
      };
    case types.AFTER_GET_VIDEOS_ERROR:
      return {
        ...state,
        data: [],
        isLoading: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
