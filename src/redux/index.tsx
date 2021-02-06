import { combineReducers } from 'redux';

import { initialState as initialVideos, reducer as videosReducer } from './videos';

export const initialRootState = {
  videos: initialVideos,
};

const appReducer = combineReducers({
  videos: videosReducer,
});

export const rootReducer = (state: any, action: any): any => appReducer(state, action);
