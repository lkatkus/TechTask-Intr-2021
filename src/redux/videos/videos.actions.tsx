import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { pexelsAPI } from 'src/api/pexels';

import * as types from './videos.types';
import { State } from './videos.interfaces';
import { GetVideoParams } from './videos.interfaces';
import { getSearchQuery } from './videos.utils';

type ThunkResult<R> = ThunkAction<R, State, undefined, Action<types.Actions>>;

const getVideos = (vars: GetVideoParams): ThunkResult<void> => async (dispatch) => {
  try {
    dispatch({ type: types.BEFORE_GET_VIDEOS });

    const newVideos = await pexelsAPI.getVideos({
      query: getSearchQuery(vars.searchTitle),
      numberOfVideos: vars.videosNumber,
    });

    const payload = {
      videos: newVideos.videos,
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
