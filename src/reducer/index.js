import { combineReducers } from 'redux';
import photoReducer from './photoReducer';
import photoListReducer from './photoListReducer';
export default combineReducers({
  photo: photoReducer,
  photoList: photoListReducer
});
