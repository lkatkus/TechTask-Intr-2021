import { combineReducers } from 'redux';

import { initialState as initialVideos, reducer as videosReducer } from './videos';

export const initialRootState = {
  videos: initialVideos,
};

const rootReducer = combineReducers({
  videos: videosReducer,
});

export default rootReducer;
