import { UPLOAD_PHOTO, UPDATE_PHOTO, FETCH_PHOTO } from '../actions/types';

export default function(state = '', action) {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return action.payload;
    case UPDATE_PHOTO:
      return action.payload;
    case FETCH_PHOTO:
      return action.payload;
  }
  return state;
}
