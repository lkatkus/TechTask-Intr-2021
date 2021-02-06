import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import pexelsAPI from 'src/api/pexels';

import * as types from './videos.types';

interface GetVideoVars {
  searchTitle: string;
  videosNumber: number;
}

const getVideos = (vars: GetVideoVars): ThunkAction<any, any, unknown, Action<string>> => async (
  dispatch,
) => {
  try {
    dispatch({ type: types.BEFORE_GET_VIDEOS });

    const searchQuery = vars.searchTitle
      .trim()
      .split(/,\s*|\s/)
      .join(',');

    const newVideos = await pexelsAPI.getVideos({
      query: searchQuery,
      numberOfVideos: vars.videosNumber,
    });

    const payload = {
      searchParams: {
        searchTitle: vars.searchTitle,
        videosNumber:
          newVideos.total_results < vars.videosNumber ? newVideos.total_results : vars.videosNumber,
      },
      videos: newVideos,
    };

    dispatch({ type: types.ON_GET_VIDEOS, payload });
  } catch (error) {
    dispatch({
      type: types.AFTER_GET_VIDEOS_ERROR,
      payload: {
        error: error.message,
      },
    });
  }
};

export default {
  getVideos,
};
