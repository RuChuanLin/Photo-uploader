import {
  UPLOAD_PHOTO,
  UPDATE_PHOTO,
  FETCH_PHOTO,
  UPLOAD_PHOTO_LOCALLY,
  MAKE_THUMBNAIL
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case UPLOAD_PHOTO:
      return action.payload;
    case UPLOAD_PHOTO_LOCALLY:
      return action.payload;
    case UPDATE_PHOTO:
      return action.payload;
    case FETCH_PHOTO:
      return action.payload;
    case MAKE_THUMBNAIL:
      return action.payload;
  }
  return state;
}
