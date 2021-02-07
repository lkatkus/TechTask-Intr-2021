import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';

import { initialState as initialVideos, reducer as videosReducer } from './videos';

export const initialRootState = {
  videos: initialVideos,
};

const rootReducer = combineReducers({
  videos: videosReducer,
});

export const useSelector = createSelectorHook<typeof initialRootState>();

export default rootReducer;
